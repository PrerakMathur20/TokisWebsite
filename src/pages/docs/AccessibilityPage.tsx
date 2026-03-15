import React from 'react';
import { Alert, Badge, Stack, Card, CardBody } from '@tokis/react';

type AuditStatus = 'pass' | 'partial' | 'pending';

interface ComponentAuditRow {
  component: string;
  keyboard: AuditStatus;
  screenReader: AuditStatus;
  contrast: AuditStatus;
  notes?: string;
}

const auditData: ComponentAuditRow[] = [
  { component: 'Button',          keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Badge',           keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'dotLabel prop required for dot indicators (WCAG 1.1.1)' },
  { component: 'Card',            keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'Defaults to article element; use as prop for list/div contexts' },
  { component: 'Checkbox',        keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Radio',           keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'Context-based — arrow key nav works at any nesting depth' },
  { component: 'TextField',       keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Select',          keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Switch',          keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Slider',          keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'DatePicker',      keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'Full calendar grid navigation; focus moves into panel on open' },
  { component: 'Pagination',      keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'aria-current="page" on active item; active item not disabled' },
  { component: 'Alert',           keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Dialog',          keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'Focus trap, aria-modal, aria-labelledby, aria-describedby' },
  { component: 'Drawer',          keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'Focus trap, aria-modal, aria-labelledby, aria-describedby' },
  { component: 'Popover',         keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'Focus moves into panel on open; returns to trigger on close' },
  { component: 'Tooltip',         keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'HoverCard',       keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'role=tooltip, aria-describedby; opens on focus as well as hover' },
  { component: 'Tabs',            keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Breadcrumbs',     keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Menu',            keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Accordion',       keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'BarChart',        keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'Roving tabindex; Arrow/Home/End keys; role=img + aria-label per bar' },
  { component: 'LineChart',       keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'Roving tabindex; Arrow/Home/End keys; role=img + aria-label per point' },
  { component: 'PieChart',        keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass',    notes: 'Roving tabindex; Arrow/Home/End keys; role=img + aria-label per slice' },
  { component: 'Avatar',          keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Progress',        keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'Snackbar',        keyboard: 'pass',    screenReader: 'pass',    contrast: 'pass' },
  { component: 'DataGrid',        keyboard: 'partial', screenReader: 'partial', contrast: 'pass',    notes: 'Basic keyboard nav present; full ARIA grid pattern in progress' },
];

const statusBadge = (status: AuditStatus) => {
  if (status === 'pass')    return <Badge variant="success">Pass</Badge>;
  if (status === 'partial') return <Badge variant="warning">Partial</Badge>;
  return <Badge variant="default">Pending</Badge>;
};

export function AccessibilityPage() {
  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Getting Started</p>
        <h1 className="doc-page__title">Accessibility</h1>
        <p className="doc-page__desc">
          Tokis targets <strong>WCAG 2.2 Level AA</strong> conformance and follows the
          WAI-ARIA Authoring Practices Guide for component interaction patterns.
          This page documents what is covered, what is still in progress, and how to report issues.
        </p>
      </header>

      <Alert variant="info" title="Conformance target">
        Tokis targets WCAG 2.2 Level AA. It does not claim full conformance — a formal VPAT/ACR
        requires independent third-party testing. The component audit table below reflects the
        current internal assessment.
      </Alert>

      <div className="doc-section" style={{ marginTop: 'var(--tokis-spacing-8)' }}>
        <h2 className="doc-section__title">What We Cover</h2>
        <Stack gap={3}>
          {[
            {
              title: 'Keyboard Navigation',
              desc: 'All interactive components are operable without a pointer. Focus order follows DOM order. Roving tabindex is used for composite widgets (radio groups, charts, tabs). Escape closes overlays.',
              badge: 'WCAG 2.1',
            },
            {
              title: 'Focus Indicators',
              desc: 'Focus rings use --tokis-color-focus-ring, a solid opaque color with ≥3:1 contrast against all theme surfaces (WCAG 1.4.11 Non-Text Contrast). Both light and dark themes provide dedicated focus ring colors.',
              badge: 'WCAG 1.4.11',
            },
            {
              title: 'Color Contrast',
              desc: 'All text meets 4.5:1 for normal text (WCAG 1.4.3). Badge variants use dedicated text color tokens calibrated to ≥4.5:1 on their paired subtle backgrounds. Disabled elements are exempt per WCAG.',
              badge: 'WCAG 1.4.3',
            },
            {
              title: 'Screen Reader Support',
              desc: 'ARIA roles, states, and properties follow WAI-ARIA 1.2 patterns. Dialogs use aria-modal, aria-labelledby, aria-describedby. Live regions announce dynamic updates. Decorative SVGs are aria-hidden.',
              badge: 'WAI-ARIA 1.2',
            },
            {
              title: 'Text Alternatives',
              desc: 'Icon-only buttons require aria-label. Avatar initials use role=img + aria-label. Dot badges expose status via dotLabel prop which renders a screen-reader-only span (WCAG 1.1.1).',
              badge: 'WCAG 1.1.1',
            },
            {
              title: 'Semantic HTML',
              desc: 'Card defaults to article for meaningful landmark structure. Clickable cards use role=button + tabIndex. Lists of cards should use as="li" on Card within a ul.',
              badge: 'Semantics',
            },
          ].map((item) => (
            <Card key={item.title} as="div">
              <CardBody>
                <Stack direction="row" justify="space-between" align="flex-start" gap={4}>
                  <div>
                    <h3 style={{ margin: '0 0 var(--tokis-spacing-1)', fontSize: 'var(--tokis-font-size-md)', fontWeight: 'var(--tokis-font-weight-semibold)', color: 'var(--tokis-text-primary)' }}>
                      {item.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)', lineHeight: 'var(--tokis-line-height-relaxed)' }}>
                      {item.desc}
                    </p>
                  </div>
                  <Badge variant="primary" style={{ flexShrink: 0 }}>{item.badge}</Badge>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Component Audit Status</h2>
        <p className="doc-section__desc">
          Internal review against WCAG 2.2 AA. <Badge variant="success">Pass</Badge> means the criterion
          is met. <Badge variant="warning">Partial</Badge> means work is in progress.
          All statuses reflect self-assessment — not third-party audit.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--tokis-font-size-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--tokis-color-border)' }}>
                {['Component', 'Keyboard', 'Screen Reader', 'Contrast', 'Notes'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: 'var(--tokis-spacing-2) var(--tokis-spacing-3)', color: 'var(--tokis-text-secondary)', fontWeight: 'var(--tokis-font-weight-medium)', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {auditData.map((row) => (
                <tr key={row.component} style={{ borderBottom: '1px solid var(--tokis-color-border)' }}>
                  <td style={{ padding: 'var(--tokis-spacing-2) var(--tokis-spacing-3)', fontWeight: 'var(--tokis-font-weight-medium)' }}>
                    {row.component}
                  </td>
                  <td style={{ padding: 'var(--tokis-spacing-2) var(--tokis-spacing-3)' }}>{statusBadge(row.keyboard)}</td>
                  <td style={{ padding: 'var(--tokis-spacing-2) var(--tokis-spacing-3)' }}>{statusBadge(row.screenReader)}</td>
                  <td style={{ padding: 'var(--tokis-spacing-2) var(--tokis-spacing-3)' }}>{statusBadge(row.contrast)}</td>
                  <td style={{ padding: 'var(--tokis-spacing-2) var(--tokis-spacing-3)', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-xs)' }}>
                    {row.notes ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Known Gaps</h2>
        <Stack gap={2}>
          {[
            { title: 'DataGrid — full ARIA grid pattern', desc: 'Basic keyboard navigation is present. A full implementation of the ARIA grid pattern (row/cell roving tabindex, sort announcements) is planned.' },
            { title: 'Formal VPAT / ACR', desc: 'A Voluntary Product Accessibility Template requires independent third-party testing of all components. This is on the roadmap before v1.0 stable.' },
            { title: 'Reduced motion', desc: 'prefers-reduced-motion media query disables CSS transitions in most components. JavaScript-driven animations (chart entrance, Sparkline) are partially covered.' },
          ].map((gap) => (
            <div key={gap.title} style={{ padding: 'var(--tokis-spacing-3) var(--tokis-spacing-4)', border: '1px solid var(--tokis-color-border)', borderRadius: 'var(--tokis-radius-lg)', borderLeft: '3px solid var(--tokis-color-warning)' }}>
              <div style={{ fontWeight: 'var(--tokis-font-weight-semibold)', fontSize: 'var(--tokis-font-size-sm)', marginBottom: 'var(--tokis-spacing-1)' }}>{gap.title}</div>
              <div style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>{gap.desc}</div>
            </div>
          ))}
        </Stack>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Reporting Issues</h2>
        <p className="doc-section__desc">
          Found an accessibility issue? Please open an issue on GitHub with the label{' '}
          <code className="inline-code">accessibility</code> and include:
        </p>
        <ul style={{ margin: '0 0 var(--tokis-spacing-4)', paddingLeft: 'var(--tokis-spacing-6)', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)', lineHeight: 'var(--tokis-line-height-relaxed)' }}>
          <li>The component name and the WCAG criterion you believe is violated</li>
          <li>The assistive technology and browser you used to test</li>
          <li>Steps to reproduce</li>
        </ul>
      </div>
    </>
  );
}
