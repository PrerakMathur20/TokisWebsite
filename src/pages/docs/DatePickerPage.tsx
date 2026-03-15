import React, { useState } from 'react';
import { DatePicker, TimePicker, DateTimePicker, Stack, Alert, Badge } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';

// ─── Props tables ─────────────────────────────────────────────────────────────

const datePickerProps: PropDef[] = [
  { name: 'value',         type: 'string',                      description: 'Controlled value in YYYY-MM-DD format.' },
  { name: 'defaultValue',  type: 'string',                      description: 'Default value for uncontrolled usage (YYYY-MM-DD).' },
  { name: 'onChange',      type: '(value: string | undefined) => void', description: 'Fires with a YYYY-MM-DD string, or undefined when cleared.' },
  { name: 'label',         type: 'string',                      description: 'Visible label above the input.' },
  { name: 'placeholder',   type: 'string',  default: "'Pick a date'", description: 'Placeholder text shown when no date is selected.' },
  { name: 'min',           type: 'string',                      description: 'Minimum selectable date (YYYY-MM-DD). Earlier dates are disabled in the calendar.' },
  { name: 'max',           type: 'string',                      description: 'Maximum selectable date (YYYY-MM-DD). Later dates are disabled.' },
  { name: 'disabled',      type: 'boolean', default: 'false',   description: 'Prevents interaction with the picker.' },
  { name: 'required',      type: 'boolean', default: 'false',   description: 'Adds a required asterisk to the label.' },
  { name: 'error',         type: 'boolean', default: 'false',   description: 'Applies error styling to the trigger.' },
  { name: 'className',     type: 'string',                      description: 'Extra CSS class on the root element.' },
];

const timePickerProps: PropDef[] = [
  { name: 'value',        type: 'string',            description: 'Controlled value in HH:MM format (24-hour).' },
  { name: 'defaultValue', type: 'string',            description: 'Default value for uncontrolled usage.' },
  { name: 'onChange',     type: '(value: string) => void', description: 'Fires with an HH:MM string.' },
  { name: 'label',        type: 'string',            description: 'Visible label above the selects.' },
  { name: 'hourFormat',   type: '12 | 24',           default: '24', description: '12-hour (AM/PM) or 24-hour display.' },
  { name: 'minuteStep',   type: 'number',            default: '1',  description: 'Minute increment step. E.g. 15 shows 0, 15, 30, 45.' },
  { name: 'disabled',     type: 'boolean',           default: 'false', description: 'Disables all select inputs.' },
  { name: 'required',     type: 'boolean',           default: 'false', description: 'Adds required asterisk to label.' },
  { name: 'error',        type: 'boolean',           default: 'false', description: 'Applies error styling.' },
  { name: 'className',    type: 'string',            description: 'Extra CSS class on the root element.' },
];

const dateTimePickerProps: PropDef[] = [
  { name: 'value',         type: 'string',            description: 'Controlled value in YYYY-MM-DDTHH:MM format.' },
  { name: 'defaultValue',  type: 'string',            description: 'Default uncontrolled value (YYYY-MM-DDTHH:MM).' },
  { name: 'onChange',      type: '(value: string | undefined) => void', description: 'Fires with a YYYY-MM-DDTHH:MM string, or undefined when cleared.' },
  { name: 'minuteStep',    type: 'number',            default: '1',  description: 'Minute increment for the TimePicker.' },
  { name: 'hourFormat',    type: '12 | 24',           default: '24', description: '12 or 24 hour time format.' },
  { name: '...DatePickerProps', type: '',             description: 'All DatePicker props (label, min, max, disabled, required, error) are forwarded.' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DatePickerPage() {
  // DatePicker state
  const [dateValue, setDateValue] = useState<string | undefined>('2025-03-15');
  const [dateDisabled, setDateDisabled] = useState(false);
  const [dateError, setDateError] = useState(false);

  // TimePicker state
  const [timeValue, setTimeValue] = useState('14:30');
  const [hourFormat, setHourFormat] = useState<12 | 24>(24);
  const [minuteStep, setMinuteStep] = useState<number>(1);

  // DateTimePicker state
  const [datetimeValue, setDatetimeValue] = useState<string | undefined>('2025-03-15T14:30');

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Forms</p>
        <h1 className="doc-page__title">Date &amp; Time Pickers</h1>
        <p className="doc-page__desc">
          Three composable pickers for date, time, and combined date-time input.
          DatePicker opens a calendar grid; TimePicker uses native selects for hours and
          minutes; DateTimePicker combines both. All support controlled and uncontrolled
          patterns, min/max constraints, and keyboard navigation.
        </p>
      </header>

      {/* DatePicker */}
      <div className="doc-section">
        <h2 className="doc-section__title">DatePicker</h2>
        <p className="doc-section__desc">
          A trigger button that opens a portal-mounted calendar popup.
          Dismisses on outside click, Escape key, or after a date is selected.
        </p>
        <ComponentPreview
          code={`import { DatePicker } from '@tokis/react';

// Controlled
const [value, setValue] = useState<string | undefined>('2025-03-15');

<DatePicker
  label="Appointment date"
  value={value}
  onChange={setValue}
  placeholder="Pick a date"
  disabled={${dateDisabled}}
  error={${dateError}}
/>`}
          controls={
            <>
              <DemoToggle label="Disabled" value={dateDisabled} onChange={setDateDisabled} />
              <DemoToggle label="Error" value={dateError} onChange={setDateError} />
            </>
          }
          leftAlign
        >
          <div style={{ minWidth: 260 }}>
            <DatePicker
              label="Appointment date"
              value={dateValue}
              onChange={setDateValue}
              placeholder="Pick a date"
              disabled={dateDisabled}
              error={dateError}
            />
            {dateValue && (
              <p style={{ marginTop: 'var(--tokis-spacing-2)', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
                Selected: <code className="inline-code">{dateValue}</code>
              </p>
            )}
          </div>
        </ComponentPreview>
      </div>

      {/* Uncontrolled */}
      <div className="doc-section">
        <h2 className="doc-section__title">Uncontrolled DatePicker</h2>
        <p className="doc-section__desc">
          Use <code className="inline-code">defaultValue</code> for uncontrolled mode —
          the component manages its own state internally.
        </p>
        <CodeBlock
          language="tsx"
          code={`// No value/onChange needed — internal state
<DatePicker
  label="Start date"
  defaultValue="2025-01-01"
  onChange={(v) => console.log('changed to', v)}  // optional callback
/>`}
        />
      </div>

      {/* Min/Max */}
      <div className="doc-section">
        <h2 className="doc-section__title">Date Constraints (min / max)</h2>
        <p className="doc-section__desc">
          Disable dates outside a valid range. Out-of-range dates are visually
          dimmed and cannot be selected.
        </p>
        <ComponentPreview
          code={`// Only allow dates in March 2025
<DatePicker
  label="Booking window"
  min="2025-03-01"
  max="2025-03-31"
  placeholder="Mar 2025 only"
/>`}
          leftAlign
        >
          <div style={{ minWidth: 260 }}>
            <DatePicker
              label="Booking window"
              min="2025-03-01"
              max="2025-03-31"
              placeholder="Mar 2025 only"
            />
          </div>
        </ComponentPreview>
      </div>

      {/* TimePicker */}
      <div className="doc-section">
        <h2 className="doc-section__title">TimePicker</h2>
        <p className="doc-section__desc">
          Select hours and minutes via native <code className="inline-code">&lt;select&gt;</code>{' '}
          elements. Supports 12/24-hour format and configurable minute steps.
        </p>
        <ComponentPreview
          code={`import { TimePicker } from '@tokis/react';

<TimePicker
  label="Meeting time"
  value={time}
  onChange={setTime}
  hourFormat={${hourFormat}}
  minuteStep={${minuteStep}}
/>`}
          controls={
            <>
              <DemoControl
                label="Hour format"
                options={['12', '24']}
                value={String(hourFormat)}
                onChange={(v) => setHourFormat(Number(v) as 12 | 24)}
              />
              <DemoControl
                label="Minute step"
                options={['1', '5', '15', '30']}
                value={String(minuteStep)}
                onChange={(v) => setMinuteStep(Number(v))}
              />
            </>
          }
          leftAlign
        >
          <div style={{ minWidth: 200 }}>
            <TimePicker
              label="Meeting time"
              value={timeValue}
              onChange={setTimeValue}
              hourFormat={hourFormat}
              minuteStep={minuteStep}
            />
            <p style={{ marginTop: 'var(--tokis-spacing-2)', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
              Value: <code className="inline-code">{timeValue}</code>
            </p>
          </div>
        </ComponentPreview>
      </div>

      {/* DateTimePicker */}
      <div className="doc-section">
        <h2 className="doc-section__title">DateTimePicker</h2>
        <p className="doc-section__desc">
          Combines DatePicker and TimePicker into a single controlled component.
          Value format: <code className="inline-code">YYYY-MM-DDTHH:MM</code>.
        </p>
        <ComponentPreview
          code={`import { DateTimePicker } from '@tokis/react';

const [value, setValue] = useState<string | undefined>('2025-03-15T14:30');

<DateTimePicker
  label="Event date & time"
  value={value}
  onChange={setValue}
  hourFormat={24}
  minuteStep={15}
/>`}
          leftAlign
        >
          <div style={{ minWidth: 340 }}>
            <DateTimePicker
              label="Event date & time"
              value={datetimeValue}
              onChange={setDatetimeValue}
              hourFormat={24}
              minuteStep={15}
            />
            {datetimeValue && (
              <p style={{ marginTop: 'var(--tokis-spacing-2)', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
                Value: <code className="inline-code">{datetimeValue}</code>
              </p>
            )}
          </div>
        </ComponentPreview>
      </div>

      {/* Form integration */}
      <div className="doc-section">
        <h2 className="doc-section__title">Form Integration</h2>
        <p className="doc-section__desc">
          All pickers work with standard React controlled form patterns.
          Use <code className="inline-code">required</code> and <code className="inline-code">error</code>{' '}
          for validation UI, then handle submission as you normally would.
        </p>
        <CodeBlock
          language="tsx"
          code={`function BookingForm() {
  const [date, setDate] = useState<string | undefined>();
  const [time, setTime] = useState('09:00');
  const [submitted, setSubmitted] = useState(false);

  const dateError = submitted && !date;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!date) return;
    console.log({ date, time });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DatePicker
        label="Date"
        value={date}
        onChange={setDate}
        required
        error={dateError}
        min={new Date().toISOString().split('T')[0]}  // today onwards
      />
      <TimePicker
        label="Time"
        value={time}
        onChange={setTime}
        required
        minuteStep={30}
      />
      <button type="submit">Book appointment</button>
    </form>
  );
}`}
        />
      </div>

      {/* Value formats */}
      <div className="doc-section">
        <h2 className="doc-section__title">Value Formats</h2>
        <Alert variant="info" title="ISO 8601 strings throughout">
          All pickers operate on plain strings — no Date object required.
          This makes them easy to serialize, compare, and store without timezone surprises.
        </Alert>
        <div style={{ marginTop: 'var(--tokis-spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--tokis-spacing-3)' }}>
          {[
            { component: 'DatePicker',     format: 'YYYY-MM-DD',       example: "'2025-03-15'" },
            { component: 'TimePicker',     format: 'HH:MM',            example: "'14:30'" },
            { component: 'DateTimePicker', format: "YYYY-MM-DDTHH:MM", example: "'2025-03-15T14:30'" },
          ].map(({ component, format, example }) => (
            <div
              key={component}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--tokis-spacing-3)',
                padding: 'var(--tokis-spacing-3) var(--tokis-spacing-4)',
                background: 'var(--tokis-color-surface)',
                borderRadius: 'var(--tokis-radius-md)',
                border: '1px solid var(--tokis-color-border)',
              }}
            >
              <Badge variant="primary" style={{ flexShrink: 0 }}>{component}</Badge>
              <code style={{ fontFamily: 'monospace', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>{format}</code>
              <span style={{ marginInlineStart: 'auto', fontFamily: 'monospace', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-primary)' }}>{example}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div className="doc-section">
        <h2 className="doc-section__title">Keyboard Navigation</h2>
        <p className="doc-section__desc">
          When the calendar panel opens, focus moves automatically to the first focusable element
          inside it. When the panel closes — via date selection, Escape, or outside click — focus
          returns to the trigger button.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--tokis-font-size-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--tokis-color-border)' }}>
                <th style={{ textAlign: 'left', padding: 'var(--tokis-spacing-2) var(--tokis-spacing-3)', color: 'var(--tokis-text-secondary)', fontWeight: 'var(--tokis-font-weight-medium)' }}>Key</th>
                <th style={{ textAlign: 'left', padding: 'var(--tokis-spacing-2) var(--tokis-spacing-3)', color: 'var(--tokis-text-secondary)', fontWeight: 'var(--tokis-font-weight-medium)' }}>Behavior</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Enter / Space', 'Open the calendar panel (on trigger); select the focused date (in grid)'],
                ['Arrow keys', 'Move focus between days in the calendar grid'],
                ['Page Up / Page Down', 'Navigate to the previous / next month'],
                ['Ctrl + Page Up / Down', 'Navigate to the previous / next year'],
                ['Home / End', 'Jump to the first / last day of the current week'],
                ['Escape', 'Close the panel and return focus to the trigger'],
                ['Tab', 'Move focus between the prev/next month buttons and the calendar grid'],
              ].map(([key, desc]) => (
                <tr key={key} style={{ borderBottom: '1px solid var(--tokis-color-border)' }}>
                  <td style={{ padding: 'var(--tokis-spacing-2) var(--tokis-spacing-3)' }}>
                    <code className="inline-code">{key}</code>
                  </td>
                  <td style={{ padding: 'var(--tokis-spacing-2) var(--tokis-spacing-3)', color: 'var(--tokis-text-secondary)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="doc-section__desc" style={{ marginTop: 'var(--tokis-spacing-4)' }}>
          <strong>TimePicker</strong> renders native <code className="inline-code">&lt;select&gt;</code> elements
          — keyboard interaction is handled by the browser natively (arrow keys scroll options,
          Enter confirms selection).
        </p>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — DatePicker</h2>
        <PropsTable props={datePickerProps} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props — TimePicker</h2>
        <PropsTable props={timePickerProps} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props — DateTimePicker</h2>
        <PropsTable props={dateTimePickerProps} />
      </div>
    </>
  );
}
