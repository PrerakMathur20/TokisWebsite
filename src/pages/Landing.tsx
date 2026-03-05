import React, { useState, useEffect, useRef } from 'react';
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
  Tooltip,
  Rating,
} from '@synu/react';
import { NavButton } from '../components/NavButton';

// ─── Animated counter hook ─────────────────────────────────

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Marquee scroll ticker ────────────────────────────────

const techStack = [
  'React 18', 'TypeScript', 'CSS Variables', 'WAI-ARIA', 'Zero Runtime',
  'Dark Mode', 'Tree Shakable', 'SSR Safe', 'WCAG AA', 'ESM + CJS',
  'Focus Management', 'Headless Core', 'Design Tokens', 'MIT License',
];

function Marquee() {
  const items = [...techStack, ...techStack];
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Feature icons ────────────────────────────────────────

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2L3 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 14l8 5 8-5M3 10.5l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    tag: 'Performance',
    title: 'Zero Runtime CSS',
    desc: 'No emotion, no styled-components — pure precompiled CSS. Styles ship once, execute instantly.',
    color: 'var(--synu-color-primary)',
    bg: 'var(--synu-color-primary-subtle)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    tag: 'Architecture',
    title: 'Token-Native Design',
    desc: 'Every decision is a token — colors, spacing, radius, motion. Theming without the ceremony.',
    color: 'var(--synu-color-secondary)',
    bg: 'var(--synu-color-secondary-subtle)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 9v5M8 11l-4 5M14 11l4 5M8 10l3 1 3-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: 'Accessibility',
    title: 'Built-in A11y',
    desc: 'WAI-ARIA compliant. Keyboard navigation, focus traps, screen readers — never bolted-on.',
    color: '#059669',
    bg: 'var(--synu-color-success-subtle)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="2" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="12" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="12" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    tag: 'Composable',
    title: 'Compound Components',
    desc: 'Headless primitives with styled layers. Compose complex UIs from simple, predictable parts.',
    color: '#7c3aed',
    bg: 'var(--synu-color-secondary-subtle)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 9h3v7M8.5 12h3M13 16V9.5a2 2 0 0 1 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: 'DX',
    title: 'TypeScript First',
    desc: 'Strict prop types, discriminated unions, and full inference. Errors at compile time.',
    color: '#0284c7',
    bg: 'var(--synu-color-info-subtle)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M19 13.5A8.5 8.5 0 0 1 8.5 3a7 7 0 1 0 10.5 10.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    tag: 'Theming',
    title: 'Native Dark Mode',
    desc: 'Instant theme switching via CSS variables. No flicker, system preference detection built in.',
    color: 'var(--synu-color-warning)',
    bg: 'var(--synu-color-warning-subtle)',
  },
];

// ─── Landing ──────────────────────────────────────────────

export function Landing() {
  const [switchOn, setSwitchOn] = useState(true);
  const [activeChip, setActiveChip] = useState('design');
  const [ratingVal, setRatingVal] = useState(4);

  const stat1 = useCountUp(40);
  const stat2 = useCountUp(100);
  const stat3 = useCountUp(0); // stays 0 for "0kb"
  const stat4 = useCountUp(2);

  return (
    <div className="landing">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero section">
        <div className="hero__content">
          <a
            href="https://github.com"
            className="hero__badge"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Open source, v0.1.0, MIT License"
          >
            <span className="hero__badge-dot" />
            <span>Open Source</span>
            <span className="hero__badge-sep">·</span>
            <span>v0.1.0</span>
            <span className="hero__badge-sep">·</span>
            <span>MIT</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ marginLeft: 2, opacity: 0.5 }}>
              <path d="M2 8l6-6M3 2h5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <h1 className="hero__title">
            Design systems,
            <br />
            <span className="hero__title-gradient">reimagined.</span>
          </h1>

          <p className="hero__subtitle">
            A performance-first UI system for React teams who refuse to compromise.
            Zero runtime styling. Accessible by default. Token-native architecture.
          </p>

          <div className="hero__cta">
            <NavButton to="/docs/introduction" size="lg" variant="primary">
              <ButtonLabel>Start Building →</ButtonLabel>
            </NavButton>
            <NavButton to="/playground" size="lg" variant="outline">
              <ButtonLabel>Open Playground</ButtonLabel>
            </NavButton>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-avatars">
              {[1, 2, 3, 4, 5].map((i) => (
                <Avatar key={i} name={`User ${i}`} size="sm" />
              ))}
            </div>
            <div className="hero__trust-text">
              <Rating value={5} readOnly size="sm" />
              <span>Loved by engineers</span>
            </div>
          </div>
        </div>

        {/* Component showcase */}
        <div className="hero__showcase" aria-label="Component showcase">
          <div className="hero__showcase-grid">
            {/* Buttons card */}
            <div className="showcase-card showcase-card--span-2">
              <div className="showcase-card__chrome">
                <div className="showcase-card__dots" aria-hidden="true">
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                </div>
                <span className="showcase-card__title">button.tsx</span>
              </div>
              <div className="showcase-card__body">
                <Stack gap={3}>
                  <Stack direction="row" gap={2} wrap>
                    <ButtonRoot size="sm" variant="primary"><ButtonLabel>Primary</ButtonLabel></ButtonRoot>
                    <ButtonRoot size="sm" variant="secondary"><ButtonLabel>Secondary</ButtonLabel></ButtonRoot>
                    <ButtonRoot size="sm" variant="ghost"><ButtonLabel>Ghost</ButtonLabel></ButtonRoot>
                    <ButtonRoot size="sm" variant="outline"><ButtonLabel>Outline</ButtonLabel></ButtonRoot>
                  </Stack>
                  <Stack direction="row" gap={2} align="center">
                    <ButtonRoot size="sm" variant="destructive"><ButtonLabel>Destructive</ButtonLabel></ButtonRoot>
                    <ButtonRoot size="sm" variant="primary" loading><ButtonLabel>Loading…</ButtonLabel></ButtonRoot>
                    <Badge variant="success">Active</Badge>
                    <Badge variant="warning">Pending</Badge>
                  </Stack>
                </Stack>
              </div>
            </div>

            {/* Status card */}
            <div className="showcase-card">
              <div className="showcase-card__chrome">
                <div className="showcase-card__dots" aria-hidden="true">
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                </div>
                <span className="showcase-card__title">status.tsx</span>
              </div>
              <div className="showcase-card__body">
                <Stack gap={3}>
                  <Alert variant="success" title="Deploy successful">
                    <span style={{ fontSize: 'var(--synu-font-size-xs)' }}>Edge network live.</span>
                  </Alert>
                  <Stack direction="row" gap={2} align="center">
                    <Switch checked={switchOn} onChange={setSwitchOn} label="Sync" aria-label="Toggle sync" />
                    <Badge variant={switchOn ? 'primary' : 'default'}>{switchOn ? 'On' : 'Off'}</Badge>
                  </Stack>
                </Stack>
              </div>
            </div>

            {/* Progress card */}
            <div className="showcase-card">
              <div className="showcase-card__chrome">
                <div className="showcase-card__dots" aria-hidden="true">
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                </div>
                <span className="showcase-card__title">metrics.tsx</span>
              </div>
              <div className="showcase-card__body">
                <Stack gap={2}>
                  {[
                    { label: 'Storage', value: 73, variant: 'default' },
                    { label: 'Bandwidth', value: 41, variant: 'success' },
                    { label: 'API calls', value: 89, variant: 'warning' },
                  ].map((m) => (
                    <Stack key={m.label} gap={1}>
                      <Stack direction="row" justify="space-between">
                        <span style={{ fontSize: 'var(--synu-font-size-xs)', color: 'var(--synu-text-secondary)' }}>{m.label}</span>
                        <span style={{ fontSize: 'var(--synu-font-size-xs)', color: 'var(--synu-text-tertiary)' }}>{m.value}%</span>
                      </Stack>
                      <Progress value={m.value} variant={m.variant as 'default' | 'success' | 'warning'} />
                    </Stack>
                  ))}
                </Stack>
              </div>
            </div>

            {/* Tags card */}
            <div className="showcase-card">
              <div className="showcase-card__chrome">
                <div className="showcase-card__dots" aria-hidden="true">
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                </div>
                <span className="showcase-card__title">filter.tsx</span>
              </div>
              <div className="showcase-card__body">
                <Stack gap={3}>
                  <Stack direction="row" gap={2} wrap>
                    {['design', 'engineering', 'product'].map((tag) => (
                      <Chip key={tag} selected={activeChip === tag} onClick={() => setActiveChip(tag)}>
                        {tag}
                      </Chip>
                    ))}
                  </Stack>
                  <Stack direction="row" gap={2} align="center">
                    <Spinner size="sm" />
                    <span style={{ fontSize: 'var(--synu-font-size-xs)', color: 'var(--synu-text-secondary)' }}>Syncing…</span>
                  </Stack>
                </Stack>
              </div>
            </div>

            {/* Avatars card */}
            <div className="showcase-card">
              <div className="showcase-card__chrome">
                <div className="showcase-card__dots" aria-hidden="true">
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                  <div className="showcase-card__dot" />
                </div>
                <span className="showcase-card__title">team.tsx</span>
              </div>
              <div className="showcase-card__body">
                <Stack direction="row" gap={4} align="center" wrap>
                  {[
                    { name: 'Jordan L', role: 'Admin', online: true },
                    { name: 'Alex K', role: 'Editor', online: true },
                    { name: 'Sam R', role: 'Viewer', online: false },
                  ].map((member) => (
                    <Stack key={member.name} direction="row" gap={2} align="center">
                      <Avatar name={member.name} size="sm" />
                      <Stack gap={0}>
                        <span style={{ fontSize: 'var(--synu-font-size-xs)', fontWeight: 600, color: 'var(--synu-text-primary)' }}>{member.name}</span>
                        <Stack direction="row" gap={1}>
                          <Badge variant="default" style={{ fontSize: 10 }}>{member.role}</Badge>
                          {member.online && <Badge variant="success" dot style={{ fontSize: 10 }}>Online</Badge>}
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────── */}
      <div className="marquee-section">
        <Marquee />
      </div>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="stats-section" aria-label="Library statistics">
        <div className="stats-grid">
          <div ref={stat1.ref} className="stat-item">
            <div className="stat-item__value">{stat1.count}+</div>
            <div className="stat-item__label">Components</div>
          </div>
          <div ref={stat3.ref} className="stat-item">
            <div className="stat-item__value">0<span className="stat-item__unit">kb</span></div>
            <div className="stat-item__label">Runtime CSS</div>
          </div>
          <div ref={stat2.ref} className="stat-item">
            <div className="stat-item__value">{stat2.count}%</div>
            <div className="stat-item__label">TypeScript</div>
          </div>
          <div className="stat-item">
            <div className="stat-item__value">WCAG</div>
            <div className="stat-item__label">AA Compliant</div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="features-section" aria-label="Features">
        <div className="section-eyebrow">Why Synu?</div>
        <h2 className="section-title">Built for teams that <span className="text-gradient">give a damn.</span></h2>
        <p className="section-subtitle">
          Not another component library. An architectural decision. For teams that ship
          accessible, fast, maintainable products without compromise.
        </p>

        <div className="features-bento">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bento-card"
              style={{ '--accent': f.color, '--accent-bg': f.bg } as React.CSSProperties}
            >
              <div className="bento-card__tag">{f.tag}</div>
              <div className="bento-card__icon">{f.icon}</div>
              <h3 className="bento-card__title">{f.title}</h3>
              <p className="bento-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Code Teaser ──────────────────────────────────────── */}
      <section className="code-section" aria-label="Code example">
        <div className="code-section__inner">
          <div className="code-section__text">
            <div className="section-eyebrow">Developer Experience</div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Composable by design.</h2>
            <p className="section-subtitle" style={{ textAlign: 'left' }}>
              Compound component APIs that are predictable, flexible, and refactor-friendly.
              No prop explosion — just clean composition.
            </p>
            <Stack direction="row" gap={3} style={{ marginTop: 'var(--synu-spacing-6)' }}>
              <NavButton to="/docs/button" variant="primary">
                <ButtonLabel>Explore Components →</ButtonLabel>
              </NavButton>
              <NavButton to="/docs/installation" variant="ghost">
                <ButtonLabel>Install in 30s</ButtonLabel>
              </NavButton>
            </Stack>
          </div>

          <div className="code-section__preview">
            <div className="code-window">
              <div className="code-window__bar">
                <div className="code-window__dots" aria-hidden="true">
                  <span /><span /><span />
                </div>
                <span className="code-window__file">Button.tsx</span>
              </div>
              <pre className="code-window__body"><code>{`import {
  ButtonRoot,
  ButtonIcon,
  ButtonLabel,
} from '@synu/react';

// Compound composition
<ButtonRoot variant="primary" size="lg">
  <ButtonIcon>
    <SaveIcon />
  </ButtonIcon>
  <ButtonLabel>
    Save changes
  </ButtonLabel>
</ButtonRoot>

// All variants auto-styled
<ButtonRoot variant="secondary" />
<ButtonRoot variant="ghost" />
<ButtonRoot variant="destructive" />
<ButtonRoot variant="outline" loading />
<ButtonRoot variant="link" />`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="cta-section-v2" aria-label="Call to action">
        <div className="cta-section-v2__glow" aria-hidden="true" />
        <div className="cta-section-v2__content">
          <div className="cta-section-v2__badge">
            <span className="hero__badge-dot" />
            Ready to ship
          </div>
          <h2 className="cta-section-v2__title">
            Your design system,
            <br />
            on your terms.
          </h2>
          <p className="cta-section-v2__desc">
            Start building today. Production-grade components, zero external dependencies,
            one install command.
          </p>
          <div className="cta-section-v2__install">
            <code className="cta-section-v2__cmd">npm install @synu/react @synu/theme</code>
          </div>
          <Stack direction="row" gap={3} justify="center" wrap style={{ marginTop: 'var(--synu-spacing-8)' }}>
            <NavButton to="/docs/introduction" size="lg" variant="primary">
              <ButtonLabel>Read the Docs →</ButtonLabel>
            </NavButton>
            <NavButton to="/playground" size="lg" variant="outline">
              <ButtonLabel>Try the Playground</ButtonLabel>
            </NavButton>
          </Stack>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <div className="site-navbar__logo-mark" aria-hidden="true">Sy</div>
            <span className="site-footer__copy">© 2025 Synu — MIT License</span>
          </div>
          <nav className="site-footer__links" aria-label="Footer navigation">
            <a href="#" className="site-footer__link">GitHub</a>
            <a href="#" className="site-footer__link">npm</a>
            <Link to="/docs/introduction" className="site-footer__link">Docs</Link>
            <Link to="/playground" className="site-footer__link">Playground</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
