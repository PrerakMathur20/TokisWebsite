import React, { useState } from 'react';
import { DataGrid, Badge, Avatar, Stack, ButtonRoot, ButtonLabel, Alert } from '@tokis/react';
import type { DataGridColumn } from '@tokis/react';
import { ComponentPreview, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';

// ─── Sample data ──────────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive' | 'Pending';
  joined: string;
  score: number;
}

const USERS: User[] = [
  { id: 1, name: 'Jordan Lee',    email: 'jordan@example.com',  role: 'Admin',  status: 'Active',   joined: '2025-01-12', score: 98 },
  { id: 2, name: 'Alex Kim',      email: 'alex@example.com',    role: 'Editor', status: 'Active',   joined: '2025-02-03', score: 84 },
  { id: 3, name: 'Sam Park',      email: 'sam@example.com',     role: 'Viewer', status: 'Pending',  joined: '2025-02-28', score: 61 },
  { id: 4, name: 'Casey Morgan',  email: 'casey@example.com',   role: 'Editor', status: 'Inactive', joined: '2025-03-01', score: 43 },
  { id: 5, name: 'Riley Chen',    email: 'riley@example.com',   role: 'Admin',  status: 'Active',   joined: '2025-03-04', score: 92 },
  { id: 6, name: 'Morgan Silva',  email: 'morgan@example.com',  role: 'Viewer', status: 'Active',   joined: '2025-03-10', score: 77 },
  { id: 7, name: 'Taylor Grant',  email: 'taylor@example.com',  role: 'Editor', status: 'Active',   joined: '2025-03-15', score: 88 },
  { id: 8, name: 'Drew Patel',    email: 'drew@example.com',    role: 'Viewer', status: 'Inactive', joined: '2025-03-18', score: 30 },
  { id: 9, name: 'Quinn Reyes',   email: 'quinn@example.com',   role: 'Admin',  status: 'Active',   joined: '2025-03-20', score: 95 },
  { id: 10, name: 'Avery Brooks', email: 'avery@example.com',   role: 'Editor', status: 'Pending',  joined: '2025-03-22', score: 67 },
  { id: 11, name: 'Robin Hayes',  email: 'robin@example.com',   role: 'Viewer', status: 'Active',   joined: '2025-03-25', score: 55 },
  { id: 12, name: 'Sage Flores',  email: 'sage@example.com',    role: 'Editor', status: 'Active',   joined: '2025-03-28', score: 79 },
];

const statusBadge = (s: string): 'success' | 'warning' | 'default' =>
  s === 'Active' ? 'success' : s === 'Pending' ? 'warning' : 'default';

const roleBadge = (r: string): 'primary' | 'info' | 'default' =>
  r === 'Admin' ? 'primary' : r === 'Editor' ? 'info' : 'default';

// ─── Column definitions ───────────────────────────────────────────────────────

const columns: DataGridColumn[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    filterable: true,
    renderCell: ({ row }) => {
      const u = row as unknown as User;
      return (
        <Stack direction="row" gap={2} align="center">
          <Avatar name={u.name} size="sm" />
          <span style={{ fontWeight: 'var(--tokis-font-weight-medium)' }}>{u.name}</span>
        </Stack>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    filterable: true,
    cellStyle: { color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' },
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 100,
    renderCell: ({ value }) => <Badge variant={roleBadge(value as string)}>{value as string}</Badge>,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: ({ value }) => <Badge variant={statusBadge(value as string)} dot>{value as string}</Badge>,
  },
  {
    field: 'score',
    headerName: 'Score',
    width: 80,
    align: 'end',
    headerAlign: 'end',
    renderCell: ({ value }) => (
      <span style={{ fontWeight: 'var(--tokis-font-weight-semibold)', color: (value as number) >= 80 ? 'var(--tokis-color-success)' : 'inherit' }}>
        {value as number}
      </span>
    ),
  },
  {
    field: 'actions',
    headerName: '',
    width: 100,
    sortable: false,
    renderCell: () => (
      <Stack direction="row" gap={1}>
        <ButtonRoot size="sm" variant="ghost"><ButtonLabel>Edit</ButtonLabel></ButtonRoot>
      </Stack>
    ),
  },
];

// ─── Props tables ─────────────────────────────────────────────────────────────

const gridProps: PropDef[] = [
  { name: 'columns',            type: 'DataGridColumn[]', required: true,   description: 'Column definitions array.' },
  { name: 'rows',               type: 'R[]',              required: true,   description: 'Row data. Each row must contain the fields referenced by columns.' },
  { name: 'rowIdField',         type: 'string',           default: "'id'",  description: 'Field used as the unique row identifier.' },
  { name: 'loading',            type: 'boolean',          default: 'false', description: 'Renders a skeleton loading state over the rows area.' },
  { name: 'emptyText',          type: 'ReactNode',                          description: 'Content shown when rows is empty and not loading.' },
  { name: 'showToolbar',        type: 'boolean',          default: 'false', description: 'Renders the quick-filter search toolbar above the grid.' },
  { name: 'checkboxSelection',  type: 'boolean',          default: 'false', description: 'Adds a checkbox column for multi-row selection.' },
  { name: 'selectionModel',     type: 'RowId[]',                            description: 'Controlled selected row ids.' },
  { name: 'onSelectionChange',  type: '(ids: RowId[]) => void',             description: 'Fires when row selection changes.' },
  { name: 'onRowClick',         type: '(row, event) => void',               description: 'Fires when any row is clicked.' },
  { name: 'sortModel',          type: 'SortModel',                          description: 'Controlled sort state {field, direction}.' },
  { name: 'onSortModelChange',  type: '(model: SortModel) => void',         description: 'Fires when the active sort column or direction changes.' },
  { name: 'filterModel',        type: 'FilterModel',                        description: 'Controlled filter state {quickFilter, columnFilters}.' },
  { name: 'onFilterModelChange',type: '(model: FilterModel) => void',       description: 'Fires when any filter changes.' },
  { name: 'pageSize',           type: 'number',           default: '25',    description: 'Rows per page.' },
  { name: 'pageSizeOptions',    type: 'number[]',         default: '[10,25,50,100]', description: 'Available page-size options in the footer selector.' },
  { name: 'page',               type: 'number',                             description: 'Controlled current page (0-indexed).' },
  { name: 'onPageChange',       type: '(page: number) => void',             description: 'Fires when the page changes.' },
  { name: 'height',             type: 'number | string',  default: "'auto'", description: 'Container height. When set, enables windowed virtual scrolling.' },
  { name: 'rowHeight',          type: 'number',           default: '48',    description: 'Fixed row height in px — required for virtualization.' },
  { name: 'className',          type: 'string',                             description: 'Extra CSS class on the root element.' },
];

const colProps: PropDef[] = [
  { name: 'field',          type: 'string',           required: true,   description: 'Must match a key in the row object. Used for sorting/filtering.' },
  { name: 'headerName',     type: 'string',                             description: 'Column header label. Defaults to field if omitted.' },
  { name: 'width',          type: 'number',                             description: 'Fixed pixel width (mutually exclusive with flex).' },
  { name: 'flex',           type: 'number',                             description: 'Flex grow ratio — distributes remaining width proportionally.' },
  { name: 'sortable',       type: 'boolean',          default: 'true',  description: 'Allow sorting by clicking the column header.' },
  { name: 'filterable',     type: 'boolean',          default: 'false', description: 'Render a per-column text filter input under the header.' },
  { name: 'align',          type: "'start' | 'center' | 'end'", default: "'start'", description: 'Cell content alignment.' },
  { name: 'headerAlign',    type: "'start' | 'center' | 'end'", default: "'start'", description: 'Header content alignment.' },
  { name: 'cellStyle',      type: 'CSSProperties',                      description: 'Inline styles applied to every cell in this column.' },
  { name: 'renderCell',     type: '(params) => ReactNode',               description: 'Custom cell renderer. Receives { value, row, field }.' },
  { name: 'renderHeader',   type: '(col) => ReactNode',                  description: 'Custom header renderer.' },
  { name: 'valueGetter',    type: '(row) => unknown',                    description: 'Derive the sort/filter value from the row when it differs from the raw field value.' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DataGridPage() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [checkboxSelection, setCheckboxSelection] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Data Display</p>
        <h1 className="doc-page__title">DataGrid</h1>
        <p className="doc-page__desc">
          A feature-complete data grid for tabular data. Supports column sorting, quick-filter
          toolbar, per-column text filters, client-side pagination, multi-row selection,
          custom cell renderers, loading skeletons, and windowed virtual scrolling for
          large datasets.
        </p>
      </header>

      {/* Interactive playground */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          padless
          code={`import { DataGrid } from '@tokis/react';
import type { DataGridColumn } from '@tokis/react';

const columns: DataGridColumn<User>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    filterable: true,
    renderCell: ({ row }) => (
      <Stack direction="row" gap={2} align="center">
        <Avatar name={row.name} size="sm" />
        <span>{row.name}</span>
      </Stack>
    ),
  },
  { field: 'email',  headerName: 'Email',  flex: 2, filterable: true },
  { field: 'role',   headerName: 'Role',   width: 100, renderCell: ({ value }) => <Badge>{value}</Badge> },
  { field: 'status', headerName: 'Status', width: 110, renderCell: ({ value }) => <Badge dot>{value}</Badge> },
  { field: 'score',  headerName: 'Score',  width: 80, align: 'end' },
];

<DataGrid
  columns={columns}
  rows={users}
  showToolbar={${showToolbar}}
  checkboxSelection={${checkboxSelection}}
  loading={${loading}}
  pageSize={5}
  pageSizeOptions={[5, 10, 25]}
/>`}
          controls={
            <>
              <DemoToggle label="Toolbar" value={showToolbar} onChange={setShowToolbar} />
              <DemoToggle label="Checkboxes" value={checkboxSelection} onChange={setCheckboxSelection} />
              <DemoToggle label="Loading" value={loading} onChange={setLoading} />
            </>
          }
        >
          <DataGrid
            columns={columns}
            rows={USERS as unknown as Record<string, unknown>[]}
            showToolbar={showToolbar}
            checkboxSelection={checkboxSelection}
            loading={loading}
            pageSize={5}
            pageSizeOptions={[5, 10, 25]}
          />
        </ComponentPreview>
      </div>

      {/* Controlled sort */}
      <div className="doc-section">
        <h2 className="doc-section__title">Controlled Sort</h2>
        <p className="doc-section__desc">
          Manage sort state externally with <code className="inline-code">sortModel</code> +{' '}
          <code className="inline-code">onSortModelChange</code>.
          Click any column header to cycle: ascending → descending → none.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { useState } from 'react';
import { DataGrid } from '@tokis/react';
import type { SortModel } from '@tokis/react';

function ControlledSort() {
  const [sortModel, setSortModel] = useState<SortModel>({ field: 'name', direction: 'asc' });

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      sortModel={sortModel}
      onSortModelChange={setSortModel}
      pageSize={10}
    />
  );
}`}
        />
      </div>

      {/* Controlled filter */}
      <div className="doc-section">
        <h2 className="doc-section__title">Filtering</h2>
        <p className="doc-section__desc">
          Enable the quick-filter toolbar with <code className="inline-code">showToolbar</code>.
          For per-column filters, set <code className="inline-code">filterable: true</code> on individual
          columns — a search input appears beneath each filterable header.
        </p>
        <CodeBlock
          language="tsx"
          code={`// Quick filter — searches across all filterable columns
<DataGrid
  columns={[
    { field: 'name',  headerName: 'Name',  flex: 1, filterable: true },
    { field: 'email', headerName: 'Email', flex: 1, filterable: true },
    { field: 'role',  headerName: 'Role',  width: 100 },  // not filterable
  ]}
  rows={rows}
  showToolbar   // shows the search box above the grid
  pageSize={25}
/>

// Controlled filter model
const [filterModel, setFilterModel] = useState<FilterModel>({
  quickFilter: '',
  columnFilters: { status: 'Active' },
});

<DataGrid
  columns={columns}
  rows={rows}
  filterModel={filterModel}
  onFilterModelChange={setFilterModel}
/>`}
        />
      </div>

      {/* Row selection */}
      <div className="doc-section">
        <h2 className="doc-section__title">Row Selection</h2>
        <p className="doc-section__desc">
          Enable multi-row selection with <code className="inline-code">checkboxSelection</code>.
          Use <code className="inline-code">selectionModel</code> +{' '}
          <code className="inline-code">onSelectionChange</code> for controlled mode.
        </p>
        <CodeBlock
          language="tsx"
          code={`const [selected, setSelected] = useState<RowId[]>([]);

<DataGrid
  columns={columns}
  rows={rows}
  checkboxSelection
  selectionModel={selected}
  onSelectionChange={setSelected}
  pageSize={10}
/>

// selected === [1, 3, 5]  (row ids of checked rows)`}
        />
      </div>

      {/* Custom cell rendering */}
      <div className="doc-section">
        <h2 className="doc-section__title">Custom Cell Rendering</h2>
        <p className="doc-section__desc">
          Use <code className="inline-code">renderCell</code> to display any React content.
          The callback receives <code className="inline-code">{'{ value, row, field }'}</code>.
        </p>
        <CodeBlock
          language="tsx"
          code={`const columns: DataGridColumn<User>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    renderCell: ({ row }) => (
      <Stack direction="row" gap={2} align="center">
        <Avatar name={row.name} size="sm" />
        <span>{row.name}</span>
      </Stack>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: ({ value }) => (
      <Badge variant={value === 'Active' ? 'success' : 'default'} dot>
        {value as string}
      </Badge>
    ),
  },
  {
    field: 'actions',
    headerName: '',
    width: 100,
    sortable: false,   // no sorting for action column
    renderCell: ({ row }) => (
      <ButtonRoot size="sm" variant="ghost" onClick={() => handleEdit(row)}>
        <ButtonLabel>Edit</ButtonLabel>
      </ButtonRoot>
    ),
  },
];`}
        />
      </div>

      {/* Virtualization */}
      <div className="doc-section">
        <h2 className="doc-section__title">Virtualized Scrolling</h2>
        <p className="doc-section__desc">
          Set <code className="inline-code">height</code> to a fixed pixel value to enable
          windowed virtual scrolling. Only visible rows are rendered — memory scales with
          viewport height, not dataset size.
        </p>
        <Alert variant="info" title="Required: fixed rowHeight">
          Virtual scrolling requires a fixed <code>rowHeight</code> (default 48px) so the grid
          can calculate total scroll height without measuring every row.
        </Alert>
        <CodeBlock
          language="tsx"
          code={`// Renders only ~15 rows at a time, even with 100 000 rows
<DataGrid
  columns={columns}
  rows={largeDataset}          // e.g. 100 000 rows
  height={600}                 // enables virtualization
  rowHeight={48}               // must match CSS row height
  pageSize={100}               // pagination still works alongside virtualization
/>`}
        />
      </div>

      {/* Empty & loading states */}
      <div className="doc-section">
        <h2 className="doc-section__title">Empty &amp; Loading States</h2>
        <ComponentPreview
          padless
          code={`// Loading skeleton
<DataGrid columns={columns} rows={[]} loading pageSize={5} />

// Empty state with custom message
<DataGrid
  columns={columns}
  rows={[]}
  emptyText="No users match your filter."
  pageSize={5}
/>`}
        >
          <DataGrid
            columns={columns.slice(0, 3)}
            rows={[]}
            loading={false}
            emptyText="No users match your filter."
            pageSize={5}
          />
        </ComponentPreview>
      </div>

      {/* valueGetter */}
      <div className="doc-section">
        <h2 className="doc-section__title">valueGetter — Custom Sort/Filter Value</h2>
        <p className="doc-section__desc">
          When a column uses <code className="inline-code">renderCell</code> to display derived data,
          use <code className="inline-code">valueGetter</code> to provide the raw value for
          sorting and filtering.
        </p>
        <CodeBlock
          language="tsx"
          code={`// Sort by full name even when renderCell shows "Last, First"
{
  field: 'name',
  headerName: 'Name',
  renderCell: ({ row }) => \`\${row.lastName}, \${row.firstName}\`,
  valueGetter: (row) => \`\${row.firstName} \${row.lastName}\`,  // sort alphabetically by first name
}`}
        />
      </div>

      {/* Props tables */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — DataGrid</h2>
        <PropsTable props={gridProps} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props — DataGridColumn</h2>
        <PropsTable props={colProps} />
      </div>
    </>
  );
}
