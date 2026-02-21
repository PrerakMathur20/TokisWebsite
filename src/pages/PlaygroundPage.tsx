import React, { useState } from 'react';
import {
  ButtonRoot, ButtonLabel, ButtonIcon,
  TextField, Textarea,
  Checkbox, RadioGroup, Radio,
  Switch, Select, Slider,
  Badge, Avatar, Chip,
  Alert,
  Progress, Spinner,
  Card, CardHeader, CardBody, CardTitle, CardDescription,
  Tabs,
  Stack,
} from '@synu/react';

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11 12H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7l2 2v7a1 1 0 0 1-1 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M9 12V8H5v4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

type Section = 'buttons' | 'forms' | 'display' | 'feedback';

const sections: { id: Section; label: string }[] = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'forms', label: 'Forms' },
  { id: 'display', label: 'Display' },
  { id: 'feedback', label: 'Feedback' },
];

export function PlaygroundPage() {
  const [section, setSection] = useState<Section>('buttons');

  // Button state
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link'>('primary');
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnFullWidth, setBtnFullWidth] = useState(false);

  // Form state
  const [textValue, setTextValue] = useState('');
  const [selectValue, setSelectValue] = useState('react');
  const [sliderValue, setSliderValue] = useState(50);
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option-a');

  // Display state
  const [avatarSize, setAvatarSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [badgeVariant, setBadgeVariant] = useState<'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'>('primary');
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set(['design']));

  // Feedback state
  const [alertVariant, setAlertVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [progressValue, setProgressValue] = useState(65);

  const toggleChip = (chip: string) => {
    setActiveChips((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) next.delete(chip);
      else next.add(chip);
      return next;
    });
  };

  return (
    <div className="playground">
      <header className="playground__header">
        <h1 className="playground__title">Component Playground</h1>
        <p className="playground__subtitle">
          Live, interactive demos of every Synu component. Tweak props and see changes instantly.
        </p>
      </header>

      <nav className="playground__nav" aria-label="Component sections">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`playground__nav-item${section === s.id ? ' playground__nav-item--active' : ''}`}
            onClick={() => setSection(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className="playground__content">
        {/* ── Buttons ── */}
        {section === 'buttons' && (
          <div className="playground__section">
            <div className="playground__preview">
              <div className="playground__preview-canvas">
                <ButtonRoot
                  variant={btnVariant}
                  size={btnSize}
                  loading={btnLoading}
                  disabled={btnDisabled}
                  fullWidth={btnFullWidth}
                >
                  <ButtonIcon><SaveIcon /></ButtonIcon>
                  <ButtonLabel>Save changes</ButtonLabel>
                </ButtonRoot>
              </div>
            </div>

            <div className="playground__controls">
              <h2 className="playground__controls-title">ButtonRoot</h2>

              <div className="playground__control-group">
                <label className="playground__control-label">Variant</label>
                <div className="playground__control-options">
                  {(['primary', 'secondary', 'ghost', 'outline', 'destructive', 'link'] as const).map((v) => (
                    <button
                      key={v}
                      className={`demo-option${btnVariant === v ? ' demo-option--active' : ''}`}
                      onClick={() => setBtnVariant(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Size</label>
                <div className="playground__control-options">
                  {(['sm', 'md', 'lg', 'xl'] as const).map((v) => (
                    <button
                      key={v}
                      className={`demo-option${btnSize === v ? ' demo-option--active' : ''}`}
                      onClick={() => setBtnSize(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">States</label>
                <Stack gap={2}>
                  <Switch label="Loading" checked={btnLoading} onChange={setBtnLoading} size="sm" />
                  <Switch label="Disabled" checked={btnDisabled} onChange={setBtnDisabled} size="sm" />
                  <Switch label="Full Width" checked={btnFullWidth} onChange={setBtnFullWidth} size="sm" />
                </Stack>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">All Variants</label>
                <Stack gap={2} wrap>
                  {(['primary', 'secondary', 'ghost', 'outline', 'destructive', 'link'] as const).map((v) => (
                    <ButtonRoot key={v} variant={v} size="sm">
                      <ButtonLabel>{v}</ButtonLabel>
                    </ButtonRoot>
                  ))}
                </Stack>
              </div>
            </div>
          </div>
        )}

        {/* ── Forms ── */}
        {section === 'forms' && (
          <div className="playground__section">
            <div className="playground__preview">
              <div className="playground__preview-canvas" style={{ flexDirection: 'column', alignItems: 'stretch', maxWidth: 420 }}>
                <Stack gap={4}>
                  <TextField
                    label="Project name"
                    placeholder="my-awesome-app"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    helperText={textValue.length > 0 ? `${textValue.length} characters` : 'Give your project a unique name.'}
                  />
                  <Select
                    label="Framework"
                    value={selectValue}
                    onChange={setSelectValue}
                    options={[
                      { value: 'react', label: 'React' },
                      { value: 'vue', label: 'Vue' },
                      { value: 'svelte', label: 'Svelte' },
                      { value: 'solid', label: 'SolidJS' },
                      { value: 'angular', label: 'Angular' },
                    ]}
                  />
                  <Slider label="Replicas" value={sliderValue} min={1} max={10} step={1} showValue onChange={setSliderValue} />
                  <Stack gap={2}>
                    <Checkbox label="Enable auto-scaling" checked={checked} onChange={setChecked} description="Automatically adjust replicas based on load." />
                    <Switch label="Dark mode preview" checked={switchOn} onChange={setSwitchOn} />
                  </Stack>
                  <RadioGroup label="Region" name="region" value={radioValue} onChange={setRadioValue}>
                    <Radio value="option-a" label="US East" description="Lowest latency for US users." />
                    <Radio value="option-b" label="EU West" description="GDPR compliant region." />
                    <Radio value="option-c" label="AP South" description="Closest to Asia Pacific users." />
                  </RadioGroup>
                </Stack>
              </div>
            </div>

            <div className="playground__controls">
              <h2 className="playground__controls-title">Form Controls</h2>
              <p style={{ fontSize: 'var(--synu-font-size-sm)', color: 'var(--synu-text-secondary)', margin: 0 }}>
                All form controls support controlled and uncontrolled usage, error states, and accessibility attributes.
                Interact with the form on the left to see live updates.
              </p>
              <div className="playground__control-group">
                <label className="playground__control-label">Current values</label>
                <div style={{ fontSize: 'var(--synu-font-size-sm)', fontFamily: 'var(--synu-font-family-mono)', background: 'var(--synu-color-surface)', borderRadius: 'var(--synu-radius-md)', padding: 'var(--synu-spacing-3)', lineHeight: 1.8 }}>
                  <div><span style={{ color: 'var(--synu-text-tertiary)' }}>name:</span> {textValue || '—'}</div>
                  <div><span style={{ color: 'var(--synu-text-tertiary)' }}>framework:</span> {selectValue}</div>
                  <div><span style={{ color: 'var(--synu-text-tertiary)' }}>replicas:</span> {sliderValue}</div>
                  <div><span style={{ color: 'var(--synu-text-tertiary)' }}>auto-scale:</span> {checked ? 'true' : 'false'}</div>
                  <div><span style={{ color: 'var(--synu-text-tertiary)' }}>dark preview:</span> {switchOn ? 'true' : 'false'}</div>
                  <div><span style={{ color: 'var(--synu-text-tertiary)' }}>region:</span> {radioValue}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Display ── */}
        {section === 'display' && (
          <div className="playground__section">
            <div className="playground__preview">
              <div className="playground__preview-canvas" style={{ flexDirection: 'column', gap: 'var(--synu-spacing-6)' }}>
                <Stack direction="row" gap={4} align="center">
                  <Avatar name="Alex Kim" size={avatarSize} />
                  <Stack gap={1}>
                    <span style={{ fontWeight: 'var(--synu-font-weight-semibold)', fontSize: 'var(--synu-font-size-sm)' }}>Alex Kim</span>
                    <Stack direction="row" gap={1}>
                      <Badge variant={badgeVariant}>Admin</Badge>
                      <Badge variant="success" dot>Online</Badge>
                    </Stack>
                  </Stack>
                </Stack>

                <Stack direction="row" gap={2} wrap>
                  {['design', 'engineering', 'product', 'marketing', 'data'].map((chip) => (
                    <Chip key={chip} selected={activeChips.has(chip)} onClick={() => toggleChip(chip)}>
                      {chip}
                    </Chip>
                  ))}
                </Stack>

                <Card variant="elevated" style={{ width: '100%', maxWidth: 340 }}>
                  <CardHeader>
                    <Stack direction="row" justify="space-between" align="center">
                      <CardTitle>API Usage</CardTitle>
                      <Badge variant="info">Live</Badge>
                    </Stack>
                    <CardDescription>Last 30 days</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <Stack gap={2}>
                      <Progress value={72} variant="default" showValue label="Requests" />
                      <Progress value={38} variant="success" showValue label="Cache hits" />
                      <Progress value={91} variant="warning" showValue label="Rate limit" />
                    </Stack>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className="playground__controls">
              <h2 className="playground__controls-title">Display</h2>

              <div className="playground__control-group">
                <label className="playground__control-label">Avatar Size</label>
                <div className="playground__control-options">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((v) => (
                    <button
                      key={v}
                      className={`demo-option${avatarSize === v ? ' demo-option--active' : ''}`}
                      onClick={() => setAvatarSize(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Badge Variant</label>
                <div className="playground__control-options">
                  {(['default', 'primary', 'success', 'warning', 'error', 'info'] as const).map((v) => (
                    <button
                      key={v}
                      className={`demo-option${badgeVariant === v ? ' demo-option--active' : ''}`}
                      onClick={() => setBadgeVariant(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Chips</label>
                <p style={{ fontSize: 'var(--synu-font-size-xs)', color: 'var(--synu-text-tertiary)', margin: 0 }}>
                  Click chips on the left to toggle selection.
                </p>
                <div style={{ fontSize: 'var(--synu-font-size-sm)', fontFamily: 'var(--synu-font-family-mono)', marginTop: 8 }}>
                  selected: [{Array.from(activeChips).join(', ')}]
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Feedback ── */}
        {section === 'feedback' && (
          <div className="playground__section">
            <div className="playground__preview">
              <div className="playground__preview-canvas" style={{ flexDirection: 'column', gap: 'var(--synu-spacing-4)', alignItems: 'stretch', maxWidth: 440 }}>
                <Alert variant={alertVariant} title={alertVariant.charAt(0).toUpperCase() + alertVariant.slice(1)}>
                  {alertVariant === 'info' && 'Your deployment is being processed. This may take a few moments.'}
                  {alertVariant === 'success' && 'All 142 tests passed. Your build is ready to deploy.'}
                  {alertVariant === 'warning' && 'API rate limit is at 80%. Consider upgrading your plan.'}
                  {alertVariant === 'error' && 'Build failed. Check the logs for more information.'}
                </Alert>

                <Stack gap={3}>
                  <Stack direction="row" justify="space-between" align="center">
                    <span style={{ fontSize: 'var(--synu-font-size-sm)', color: 'var(--synu-text-secondary)' }}>Upload</span>
                    <span style={{ fontSize: 'var(--synu-font-size-xs)', fontFamily: 'var(--synu-font-family-mono)', color: 'var(--synu-text-tertiary)' }}>{progressValue}%</span>
                  </Stack>
                  <Progress value={progressValue} label="Upload" />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={progressValue}
                    onChange={(e) => setProgressValue(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--synu-color-primary)', cursor: 'pointer' }}
                  />
                </Stack>

                <Stack direction="row" gap={4} align="center">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </Stack>
              </div>
            </div>

            <div className="playground__controls">
              <h2 className="playground__controls-title">Feedback</h2>

              <div className="playground__control-group">
                <label className="playground__control-label">Alert Variant</label>
                <div className="playground__control-options">
                  {(['info', 'success', 'warning', 'error'] as const).map((v) => (
                    <button
                      key={v}
                      className={`demo-option${alertVariant === v ? ' demo-option--active' : ''}`}
                      onClick={() => setAlertVariant(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Progress</label>
                <p style={{ fontSize: 'var(--synu-font-size-xs)', color: 'var(--synu-text-tertiary)', margin: 0 }}>
                  Drag the slider on the left to control the progress bar value.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
