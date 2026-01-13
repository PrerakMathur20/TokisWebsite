import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ButtonRoot, ButtonLabel,
  Badge,
  Avatar,
  Alert,
  Switch,
  Card, CardHeader, CardBody, CardTitle, CardDescription,
  Stack,
  Tabs,
  Chip,
  Progress,
  Spinner,
  Breadcrumbs,
} from '@synu/react';
import { NavButton } from '../components/NavButton';

// ── Feature Icons ─────────────────────────────────────────
const ZeroRuntimeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M2 13l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M2 10l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const TokenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 10h6M10 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const A11yIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 8v5M7 10l-3 4M13 10l3 4M7 9l3 1 3-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ComposeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 8h3v6M7.5 11h3M12 14v-4.5a1.5 1.5 0 0 1 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DarkModeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M17.5 12.5A7.5 7.5 0 0 1 7.5 2.5a6 6 0 1 0 10 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const features = [
  {
    icon: <ZeroRuntimeIcon />,
    title: 'Zero Runtime CSS',
    desc: 'Precompiled CSS with no emotion, no styled-components — just fast, static styles that ship once.',
  },
  {
    icon: <TokenIcon />,
    title: 'Token-Native Design',
    desc: 'CSS variables as the foundation. Every visual decision is a token — colors, spacing, radius, motion.',
  },
  {
    icon: <A11yIcon />,
    title: 'Accessible by Default',
    desc: 'WAI-ARIA compliant. Keyboard navigation, focus management, screen reader support — built-in, never bolted-on.',
  },
  {
    icon: <ComposeIcon />,
    title: 'Composable Primitives',
    desc: 'Headless core with a styled layer. Compose complex UIs from simple, predictable building blocks.',
  },
  {
    icon: <TypeScriptIcon />,
    title: 'TypeScript First',
    desc: 'Strict types throughout. Prop errors caught at compile time, not in production.',
  },
  {
    icon: <DarkModeIcon />,
    title: 'Native Dark Mode',
    desc: 'CSS variable-based theming. Instant switching, no flicker, system preference detection.',
  },
];

export function Landing() {
  const [switchOn, setSwitchOn] = useState(true);
  const [activeChip, setActiveChip] = useState('design');

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero" aria-label="Hero section">
        <div className="hero__content">
          <div className="hero__badge" aria-label="Status: Open source, v0.1.0">
            <span className="hero__badge-dot" />
            Open Source · v0.1.0 · MIT License
          </div>

          <h1 className="hero__title">
            Build without
            <br />
            <span className="hero__title-gradient">boundaries</span>
          </h1>

          <p className="hero__subtitle">
            A performance-first, token-native UI design system for React.
            Zero runtime styling. Accessible by default. Built for the products you're proud of.
          </p>

          <div className="hero__cta">
            <NavButton to="/docs/introduction" size="lg" variant="primary">
              <ButtonLabel>Get Started</ButtonLabel>
            </NavButton>
            <NavButton to="/docs/button" size="lg" variant="outline">
              <ButtonLabel>View Components →</ButtonLabel>
            </NavButton>
          </div>
        </div>

        {/* Live Component Showcase */}
        <div className="hero__showcase" aria-label="Component showcase">
          <div className="hero__showcase-inner">

            {/* Card 1: Buttons showcase */}
            <div className="showcase-card">
              <div className="showcase-card__header">
                <div className="showcase-card__dots" aria-hidden="true">
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                </div>
                <span className="showcase-card__label">Button.tsx</span>
              </div>
              <div className="showcase-card__content">
                <Stack direction="row" gap={2} wrap>
                  <ButtonRoot size="sm" variant="primary">
                    <ButtonLabel>Primary</ButtonLabel>
                  </ButtonRoot>
                  <ButtonRoot size="sm" variant="secondary">
                    <ButtonLabel>Secondary</ButtonLabel>
                  </ButtonRoot>
                  <ButtonRoot size="sm" variant="ghost">
                    <ButtonLabel>Ghost</ButtonLabel>
                  </ButtonRoot>
                </Stack>
                <Stack direction="row" gap={2} wrap>
                  <ButtonRoot size="sm" variant="outline">
                    <ButtonLabel>Outline</ButtonLabel>
                  </ButtonRoot>
                  <ButtonRoot size="sm" variant="destructive">
                    <ButtonLabel>Destructive</ButtonLabel>
                  </ButtonRoot>
                  <ButtonRoot size="sm" variant="primary" loading>
                    <ButtonLabel>Loading</ButtonLabel>
                  </ButtonRoot>
                </Stack>
                <Stack direction="row" gap={2} align="center">
                  <Avatar name="Jane D" size="sm" />
                  <Avatar name="Alex K" size="sm" />
                  <Badge variant="success">Active</Badge>
                  <Badge variant="warning">Pending</Badge>
                </Stack>
              </div>
            </div>

            {/* Card 2: Form controls */}
            <div className="showcase-card">
              <div className="showcase-card__header">
                <div className="showcase-card__dots" aria-hidden="true">
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                </div>
                <span className="showcase-card__label">Form.tsx</span>
              </div>
              <div className="showcase-card__content">
                <Alert variant="success" title="Deploy successful">
                  Your app is live on the edge network.
                </Alert>
                <Stack direction="row" gap={2} align="center" wrap>
                  {['design', 'engineering', 'product'].map((tag) => (
                    <Chip
                      key={tag}
                      selected={activeChip === tag}
                      onClick={() => setActiveChip(tag)}
                    >
                      {tag}
                    </Chip>
                  ))}
                </Stack>
                <Stack direction="row" gap={3} align="center">
                  <Switch
                    checked={switchOn}
                    onChange={setSwitchOn}
                    label="Dark mode"
                    aria-label="Toggle dark mode demo"
                  />
                  <Badge variant={switchOn ? 'primary' : 'default'}>
                    {switchOn ? 'Enabled' : 'Disabled'}
                  </Badge>
                </Stack>
              </div>
            </div>

            {/* Card 3: Data + Progress */}
            <div className="showcase-card">
              <div className="showcase-card__header">
                <div className="showcase-card__dots" aria-hidden="true">
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                </div>
                <span className="showcase-card__label">Dashboard.tsx</span>
              </div>
              <div className="showcase-card__content">
                <Stack gap={3} style={{ width: '100%' }}>
                  <Stack gap={1}>
                    <Stack direction="row" justify="space-between" align="center">
                      <span style={{ fontSize: 'var(--synu-font-size-sm)', color: 'var(--synu-text-secondary)' }}>
                        Storage
                      </span>
                      <span style={{ fontSize: 'var(--synu-font-size-xs)', color: 'var(--synu-text-tertiary)' }}>
                        73%
                      </span>
                    </Stack>
                    <Progress value={73} />
                  </Stack>
                  <Stack gap={1}>
                    <Stack direction="row" justify="space-between" align="center">
                      <span style={{ fontSize: 'var(--synu-font-size-sm)', color: 'var(--synu-text-secondary)' }}>
                        Bandwidth
                      </span>
                      <span style={{ fontSize: 'var(--synu-font-size-xs)', color: 'var(--synu-text-tertiary)' }}>
                        41%
                      </span>
                    </Stack>
                    <Progress value={41} variant="success" />
                  </Stack>
                  <Stack gap={1}>
                    <Stack direction="row" justify="space-between" align="center">
                      <span style={{ fontSize: 'var(--synu-font-size-sm)', color: 'var(--synu-text-secondary)' }}>
                        API calls
                      </span>
                      <span style={{ fontSize: 'var(--synu-font-size-xs)', color: 'var(--synu-text-tertiary)' }}>
                        89%
                      </span>
                    </Stack>
                    <Progress value={89} variant="warning" />
                  </Stack>
                </Stack>
                <Stack direction="row" gap={2} align="center">
                  <Spinner size="sm" />
                  <span style={{ fontSize: 'var(--synu-font-size-sm)', color: 'var(--synu-text-secondary)' }}>
                    Syncing edge nodes…
                  </span>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar" aria-label="Library statistics">
        <div className="stats-bar__inner">
          <div className="stat">
            <div className="stat__value">40+</div>
            <div className="stat__label">Components</div>
          </div>
          <div className="stat">
            <div className="stat__value">0kb</div>
            <div className="stat__label">Runtime CSS</div>
          </div>
          <div className="stat">
            <div className="stat__value">100%</div>
            <div className="stat__label">TypeScript</div>
          </div>
          <div className="stat">
            <div className="stat__value">WCAG</div>
            <div className="stat__label">AA Compliant</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="features" aria-label="Features">
        <p className="features__eyebrow">Why Synu?</p>
        <h2 className="features__title">Engineered for serious products</h2>
        <p className="features__subtitle">
          Not just a component library. A system architected for teams that care about
          performance, accessibility, and long-term maintainability.
        </p>
        <div className="features__grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Component Tiles Showcase */}
      <section className="component-showcase" aria-label="Component examples">
        <p className="features__eyebrow">Component System</p>
        <h2 className="features__title">Everything you need, nothing you don't</h2>
        <p className="features__subtitle">
          From simple buttons to complex data tables — every component built with the same
          level of discipline.
        </p>

        <div className="component-showcase__scroll">
          {/* Tabs demo */}
          <div className="comp-tile">
            <div className="comp-tile__header">
              <span className="comp-tile__name">Tabs</span>
              <Badge variant="primary" dot>Interactive</Badge>
            </div>
            <div className="comp-tile__content">
              <Tabs
                tabs={[
                  { value: 'overview', label: 'Overview', content: (
                    <div style={{ padding: 'var(--synu-spacing-4)', color: 'var(--synu-text-secondary)', fontSize: 'var(--synu-font-size-sm)' }}>
                      Tabs organize content into selectable panels. Fully keyboard-navigable with ARIA support.
                    </div>
                  )},
                  { value: 'api', label: 'API', content: (
                    <div style={{ padding: 'var(--synu-spacing-4)', color: 'var(--synu-text-secondary)', fontSize: 'var(--synu-font-size-sm)' }}>
                      Props: <code>tabs</code>, <code>variant</code>, <code>orientation</code>, <code>onChange</code>
                    </div>
                  )},
                  { value: 'examples', label: 'Examples', content: (
                    <div style={{ padding: 'var(--synu-spacing-4)', color: 'var(--synu-text-secondary)', fontSize: 'var(--synu-font-size-sm)' }}>
                      Variants: <code>line</code>, <code>pills</code>. Orientation: horizontal, vertical.
                    </div>
                  )},
                ]}
              />
            </div>
          </div>

          {/* Card composition demo */}
          <div className="comp-tile">
            <div className="comp-tile__header">
              <span className="comp-tile__name">Card</span>
              <Badge variant="info" dot>Composable</Badge>
            </div>
            <div className="comp-tile__content" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <Card variant="elevated" style={{ width: '100%' }}>
                <CardHeader>
                  <Stack direction="row" justify="space-between" align="center">
                    <CardTitle>Monthly Revenue</CardTitle>
                    <Badge variant="success">+12.4%</Badge>
                  </Stack>
                  <CardDescription>Jan 2025 – Mar 2025</CardDescription>
                </CardHeader>
                <CardBody>
                  <Stack gap={2}>
                    <Stack direction="row" justify="space-between">
                      <span style={{ fontSize: 'var(--synu-font-size-sm)', color: 'var(--synu-text-secondary)' }}>Q1 Target</span>
                      <span style={{ fontSize: 'var(--synu-font-size-sm)', fontWeight: 'var(--synu-font-weight-semibold)' }}>$240,000</span>
                    </Stack>
                    <Progress value={78} />
                  </Stack>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Alert variants */}
          <div className="comp-tile">
            <div className="comp-tile__header">
              <span className="comp-tile__name">Alert</span>
              <Badge variant="warning" dot>4 Variants</Badge>
            </div>
            <div className="comp-tile__content" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 'var(--synu-spacing-2)' }}>
              <Alert variant="info">Your deployment is being processed.</Alert>
              <Alert variant="success" title="Tests passed">All 142 tests completed successfully.</Alert>
              <Alert variant="warning">API rate limit at 80%.</Alert>
            </div>
          </div>

          {/* Avatar group */}
          <div className="comp-tile">
            <div className="comp-tile__header">
              <span className="comp-tile__name">Avatar + Badge</span>
              <Badge variant="default" dot>Display</Badge>
            </div>
            <div className="comp-tile__content" style={{ flexDirection: 'column', gap: 'var(--synu-spacing-4)' }}>
              <Stack direction="row" gap={4} align="center">
                <Avatar src="https://i.pravatar.cc/60?img=1" alt="User 1" size="lg" />
                <Stack gap={1}>
                  <span style={{ fontWeight: 'var(--synu-font-weight-semibold)', fontSize: 'var(--synu-font-size-sm)' }}>Jordan Lee</span>
                  <Stack direction="row" gap={1}>
                    <Badge variant="primary">Admin</Badge>
                    <Badge variant="success" dot>Online</Badge>
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction="row" gap={2}>
                {['XS', 'SM', 'MD', 'LG', 'XL'].map((s, i) => (
                  <Avatar
                    key={s}
                    name={`User ${i + 1}`}
                    size={(['xs', 'sm', 'md', 'lg', 'xl'] as const)[i]}
                  />
                ))}
              </Stack>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-label="Call to action">
        <div className="cta-section__content">
          <h2 className="cta-section__title">
            Ready to ship something great?
          </h2>
          <p className="cta-section__desc">
            Start building with Synu today. Production-grade components, zero compromise.
          </p>
          <Stack direction="row" gap={3} justify="center" wrap>
            <NavButton to="/docs/introduction" size="lg" variant="primary">
              <ButtonLabel>Read the Docs</ButtonLabel>
            </NavButton>
            <NavButton to="/docs/button" size="lg" variant="outline">
              <ButtonLabel>Browse Components</ButtonLabel>
            </NavButton>
          </Stack>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <span className="site-footer__copy">
            © 2025 Synu. MIT License.
          </span>
          <nav className="site-footer__links" aria-label="Footer navigation">
            <a href="#" className="site-footer__link">GitHub</a>
            <a href="#" className="site-footer__link">npm</a>
            <Link to="/docs/introduction" className="site-footer__link">Docs</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
