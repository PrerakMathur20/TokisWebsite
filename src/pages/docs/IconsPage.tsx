import React from 'react';
import { Stack, Badge, Alert, Tabs, ButtonRoot, ButtonLabel } from '@tokis-ui/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';
import { NavButton } from '../../components/NavButton';

// ─── Inline icon demos (so the page works without @tokis-ui/icons installed) ────
// These mirror what @tokis-ui/icons outputs — use actual package in production.

interface IconDemoProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  'aria-label'?: string;
}

function DemoIcon({ paths, size = 20, color = 'currentColor', strokeWidth = 2, 'aria-label': label }: IconDemoProps & { paths: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={!label ? true : undefined}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      {label && <title>{label}</title>}
      {paths}
    </svg>
  );
}

const BUILT_IN_ICONS: { name: string; paths: React.ReactNode }[] = [
  { name: 'ChevronDownIcon',    paths: <path d="M6 9l6 6 6-6" /> },
  { name: 'ChevronUpIcon',      paths: <path d="M18 15l-6-6-6 6" /> },
  { name: 'ChevronRightIcon',   paths: <path d="M9 18l6-6-6-6" /> },
  { name: 'ChevronLeftIcon',    paths: <path d="M15 18l-6-6 6-6" /> },
  { name: 'ArrowRightIcon',     paths: <><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></> },
  { name: 'ArrowLeftIcon',      paths: <><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></> },
  { name: 'ArrowUpIcon',        paths: <><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></> },
  { name: 'ArrowDownIcon',      paths: <><path d="M12 5v14" /><path d="M19 12l-7 7-7-7" /></> },
  { name: 'ExternalLinkIcon',   paths: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></> },
  { name: 'PlusIcon',           paths: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></> },
  { name: 'MinusIcon',          paths: <line x1="5" y1="12" x2="19" y2="12" /> },
  { name: 'XIcon',              paths: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> },
  { name: 'CheckIcon',          paths: <polyline points="20 6 9 17 4 12" /> },
  { name: 'SearchIcon',         paths: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></> },
  { name: 'CopyIcon',           paths: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></> },
  { name: 'TrashIcon',          paths: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></> },
  { name: 'EditIcon',           paths: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></> },
  { name: 'RefreshIcon',        paths: <><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></> },
  { name: 'FilterIcon',         paths: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /> },
  { name: 'SortAscIcon',        paths: <><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="14" y2="15" /><line x1="3" y1="21" x2="8" y2="21" /><polyline points="15 3 21 9 15 9" /></> },
  { name: 'SortDescIcon',       paths: <><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="14" y2="15" /><line x1="3" y1="21" x2="8" y2="21" /><polyline points="15 17 21 21 15 21" /></> },
  { name: 'InfoIcon',           paths: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></> },
  { name: 'AlertCircleIcon',    paths: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></> },
  { name: 'AlertTriangleIcon',  paths: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></> },
  { name: 'CheckCircleIcon',    paths: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></> },
  { name: 'XCircleIcon',        paths: <><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></> },
  { name: 'LoaderIcon',         paths: <><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /></> },
  { name: 'MenuIcon',           paths: <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></> },
  { name: 'EyeIcon',            paths: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></> },
  { name: 'EyeOffIcon',         paths: <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></> },
  { name: 'CalendarIcon',       paths: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></> },
  { name: 'BellIcon',           paths: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></> },
  { name: 'UserIcon',           paths: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
  { name: 'SettingsIcon',       paths: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></> },
  { name: 'HomeIcon',           paths: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></> },
  { name: 'MoonIcon',           paths: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /> },
  { name: 'SunIcon',            paths: <><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></> },
  { name: 'GripVerticalIcon',   paths: <><circle cx="9" cy="5" r="1" fill="currentColor" stroke="none" /><circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="9" cy="19" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="5" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="19" r="1" fill="currentColor" stroke="none" /></> },
];

const iconProps: PropDef[] = [
  { name: 'size', type: 'number | string', default: '24', description: 'Width and height in px (number) or any CSS length string.' },
  { name: 'color', type: 'string', default: "'currentColor'", description: 'SVG stroke color. Inherits from text color by default.' },
  { name: 'strokeWidth', type: 'number', default: '2', description: 'Stroke weight. GripVerticalIcon uses 1.' },
  { name: 'aria-label', type: 'string', description: 'Accessible label. When provided the icon renders role="img" and a <title> element. Omit for decorative icons (aria-hidden is applied automatically).' },
  { name: 'aria-hidden', type: 'boolean', description: 'Override automatic aria-hidden logic. Decorative icons (no aria-label) are hidden by default.' },
  { name: 'ref', type: 'Ref<SVGSVGElement>', description: 'Forwarded to the root <svg> element.' },
];

export function IconsPage() {
  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Utilities</p>
        <h1 className="doc-page__title">Icons</h1>
        <p className="doc-page__desc">
          <code className="inline-code">@tokis-ui/icons</code> — a tree-shakable SVG icon library
          built on the Lucide icon set (MIT). Every icon is a separate named export with
          a 24×24 viewBox, 2px round-capped strokes, and full ref forwarding.
        </p>
      </header>

      {/* Installation */}
      <div className="doc-section">
        <h2 className="doc-section__title">Installation</h2>
        <p className="doc-section__desc">
          Icons live in a separate package so you only pay for what you import.
        </p>
        <Tabs
          variant="pills"
          tabs={[
            {
              value: 'npm',
              label: 'npm',
              content: (
                <div style={{ marginTop: 'var(--tokis-spacing-3)' }}>
                  <CodeBlock language="bash" code="npm install @tokis-ui/icons" />
                </div>
              ),
            },
            {
              value: 'pnpm',
              label: 'pnpm',
              content: (
                <div style={{ marginTop: 'var(--tokis-spacing-3)' }}>
                  <CodeBlock language="bash" code="pnpm add @tokis-ui/icons" />
                </div>
              ),
            },
            {
              value: 'yarn',
              label: 'yarn',
              content: (
                <div style={{ marginTop: 'var(--tokis-spacing-3)' }}>
                  <CodeBlock language="bash" code="yarn add @tokis-ui/icons" />
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Basic usage */}
      <div className="doc-section">
        <h2 className="doc-section__title">Basic Usage</h2>
        <p className="doc-section__desc">
          Import individual icons. Each import is fully tree-shakable — your bundler strips
          every icon you don't use.
        </p>
        <ComponentPreview
          code={`import { SearchIcon, CheckIcon, TrashIcon } from '@tokis-ui/icons';

// Decorative (inside a labelled button) — aria-hidden applied automatically
<ButtonRoot variant="primary">
  <ButtonIcon>
    <SearchIcon />
  </ButtonIcon>
  <ButtonLabel>Search</ButtonLabel>
</ButtonRoot>

// Standalone meaningful icon — provide aria-label
<SearchIcon aria-label="Search" size={20} />`}
        >
          <Stack direction="row" gap={3} align="center" wrap>
            {[
              { name: 'CheckIcon',    paths: <polyline points="20 6 9 17 4 12" /> },
              { name: 'SearchIcon',   paths: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></> },
              { name: 'TrashIcon',    paths: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></> },
              { name: 'EditIcon',     paths: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></> },
              { name: 'SettingsIcon', paths: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></> },
              { name: 'BellIcon',     paths: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></> },
            ].map(({ name, paths }) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--tokis-spacing-2)', color: 'var(--tokis-text-primary)' }}>
                <DemoIcon paths={paths} size={24} />
                <code style={{ fontSize: '0.65rem', color: 'var(--tokis-text-secondary)' }}>{name}</code>
              </div>
            ))}
          </Stack>
        </ComponentPreview>
      </div>

      {/* Size & Color */}
      <div className="doc-section">
        <h2 className="doc-section__title">Size &amp; Color</h2>
        <p className="doc-section__desc">
          Pass <code className="inline-code">size</code> (number or CSS string) and{' '}
          <code className="inline-code">color</code> to override defaults.
          All icons inherit <code className="inline-code">currentColor</code> by default.
        </p>
        <ComponentPreview
          code={`import { StarIcon } from '@tokis-ui/icons';

// numeric px
<SearchIcon size={16} />
<SearchIcon size={20} />
<SearchIcon size={24} />   {/* default */}
<SearchIcon size={32} />

// CSS string
<SearchIcon size="1.5rem" />

// Custom color
<CheckCircleIcon color="var(--tokis-color-success)" size={24} />
<AlertTriangleIcon color="var(--tokis-color-warning)" size={24} />
<XCircleIcon color="var(--tokis-color-error)" size={24} />`}
        >
          <Stack direction="row" gap={4} align="center" wrap>
            {[16, 20, 24, 32].map((sz) => (
              <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--tokis-spacing-1)', color: 'var(--tokis-text-primary)' }}>
                <DemoIcon paths={<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>} size={sz} />
                <code style={{ fontSize: '0.7rem', color: 'var(--tokis-text-secondary)' }}>{sz}px</code>
              </div>
            ))}
            <div style={{ width: 1, height: 40, background: 'var(--tokis-color-border)' }} />
            <DemoIcon paths={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>} size={24} color="var(--tokis-color-success)" />
            <DemoIcon paths={<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>} size={24} color="var(--tokis-color-warning)" />
            <DemoIcon paths={<><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>} size={24} color="var(--tokis-color-error)" />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Accessibility */}
      <div className="doc-section">
        <h2 className="doc-section__title">Accessibility</h2>
        <p className="doc-section__desc">
          Icons are decorative by default (<code className="inline-code">aria-hidden="true"</code>).
          Add <code className="inline-code">aria-label</code> when the icon conveys meaning on its own.
        </p>
        <ComponentPreview
          code={`// ✅ Decorative — inside a labelled button. No aria-label needed.
<ButtonRoot aria-label="Delete item" variant="ghost">
  <TrashIcon />  {/* aria-hidden automatically */}
</ButtonRoot>

// ✅ Meaningful standalone icon — provide aria-label
<TrashIcon aria-label="Delete" />
// Renders: role="img", <title>Delete</title>

// ❌ Missing label — screen readers skip this entirely
<TrashIcon />  {/* ok if button/link already has a label */}`}
        >
          <Stack direction="row" gap={4} align="center">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <DemoIcon paths={<><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>} size={24} />
              <Badge variant="default">aria-hidden</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <DemoIcon paths={<><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>} size={24} aria-label="Delete" />
              <Badge variant="success">aria-label="Delete"</Badge>
            </div>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Icon grid */}
      <div className="doc-section">
        <h2 className="doc-section__title">Built-in Icon Set</h2>
        <p className="doc-section__desc">
          {BUILT_IN_ICONS.length} icons — all outline style, 24×24 viewBox.
          Paths sourced from <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--tokis-color-primary)' }}>lucide.dev</a> (MIT licence).
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: 'var(--tokis-spacing-2)',
            padding: 'var(--tokis-spacing-4)',
            background: 'var(--tokis-color-surface)',
            borderRadius: 'var(--tokis-radius-lg)',
            border: '1px solid var(--tokis-color-border)',
          }}
        >
          {BUILT_IN_ICONS.map(({ name, paths }) => (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--tokis-spacing-2)',
                padding: 'var(--tokis-spacing-3)',
                borderRadius: 'var(--tokis-radius-md)',
                cursor: 'default',
                color: 'var(--tokis-text-primary)',
              }}
            >
              <DemoIcon paths={paths} size={20} />
              <code style={{ fontSize: '0.6rem', color: 'var(--tokis-text-secondary)', textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-all' }}>
                {name}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* createIcon factory */}
      <div className="doc-section">
        <h2 className="doc-section__title">Custom Icons with <code className="inline-code">createIcon</code></h2>
        <p className="doc-section__desc">
          Wrap any SVG path(s) with <code className="inline-code">createIcon</code> to get a
          fully typed, ref-forwarding, accessible Tokis icon component.
        </p>
        <CodeBlock
          language="tsx"
          filename="src/icons/StarIcon.tsx"
          code={`import { createIcon } from '@tokis-ui/icons';

export const StarIcon = createIcon(
  'StarIcon',             // displayName
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  2,                      // strokeWidth (optional, default 2)
);

// Usage — identical to any built-in icon:
<StarIcon size={20} />
<StarIcon size={24} color="gold" strokeWidth={1.5} />
<StarIcon size={20} aria-label="Starred" />`}
        />
      </div>

      {/* Lucide integration */}
      <div className="doc-section">
        <h2 className="doc-section__title">Lucide React Integration</h2>
        <p className="doc-section__desc">
          Use any <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--tokis-color-primary)' }}>Lucide React</a> icon
          directly — it shares the same props API. Install <code className="inline-code">lucide-react</code> separately.
        </p>
        <CodeBlock
          language="bash"
          code={`npm install lucide-react`}
        />
        <CodeBlock
          language="tsx"
          code={`import { Rocket, Star, Heart } from 'lucide-react';

// Lucide icons accept size, color, strokeWidth, aria-label natively
<Rocket size={24} />
<Star size={20} color="gold" />
<Heart size={24} aria-label="Liked" />`}
        />
        <Alert variant="info" title="Zero adapter needed">
          Lucide React icons and Tokis icons share the same prop surface (<code>size</code>, <code>color</code>,{' '}
          <code>strokeWidth</code>, <code>aria-label</code>). They compose seamlessly with{' '}
          <code>ButtonIcon</code> and any other Tokis component that accepts icon children.
        </Alert>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <p className="doc-section__desc">All props apply to every built-in icon and icons created with <code className="inline-code">createIcon</code>.</p>
        <PropsTable props={iconProps} />
      </div>

      <Stack direction="row" gap={3} style={{ marginTop: 'var(--tokis-spacing-8)' }}>
        <NavButton to="/docs/button" variant="primary">
          <ButtonLabel>Button Component</ButtonLabel>
        </NavButton>
        <NavButton to="/docs/datagrid" variant="ghost">
          <ButtonLabel>DataGrid →</ButtonLabel>
        </NavButton>
      </Stack>
    </>
  );
}
