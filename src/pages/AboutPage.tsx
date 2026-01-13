import React from 'react';
import { Stack, Badge } from '@synu/react';
import { NavButton } from '../components/NavButton';
import { ButtonLabel } from '@synu/react';
import { CodeBlock } from '../components/CodeBlock';

interface ComparisonRow {
  feature: string;
  synu: string | boolean;
  radix: string | boolean;
  shadcn: string | boolean;
  mui: string | boolean;
}

const comparisons: ComparisonRow[] = [
  { feature: 'Runtime CSS-in-JS', synu: false, radix: false, shadcn: false, mui: true },
  { feature: 'Token-native design', synu: true, radix: false, shadcn: false, mui: false },
  { feature: 'Zero dependencies', synu: true, radix: false, shadcn: false, mui: false },
  { feature: 'Built-in dark mode', synu: true, radix: false, shadcn: true, mui: true },
  { feature: 'Headless + styled', synu: true, radix: 'Headless only', shadcn: true, mui: false },
  { feature: 'SSR safe', synu: true, radix: true, shadcn: true, mui: true },
  { feature: 'TypeScript first', synu: true, radix: true, shadcn: true, mui: true },
  { feature: 'No Tailwind required', synu: true, radix: true, shadcn: false, mui: true },
  { feature: 'Framework agnostic core', synu: true, radix: false, shadcn: false, mui: false },
  { feature: 'CSS variable theming', synu: true, radix: false, shadcn: false, mui: false },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <span style={{ color: 'var(--synu-color-success)', fontWeight: 600 }}>✓</span>;
  if (value === false) return <span style={{ color: 'var(--synu-color-error)', opacity: 0.5 }}>✗</span>;
  return <span style={{ color: 'var(--synu-text-secondary)', fontSize: 'var(--synu-font-size-xs)' }}>{value}</span>;
}

const principles = [
  {
    num: '01',
    title: 'Zero runtime',
    desc: 'All styles are precompiled CSS. No emotion, no styled-components, no runtime cost. Your CSS ships once and stays static.',
  },
  {
    num: '02',
    title: 'Token-native',
    desc: 'Every visual decision — color, spacing, radius, motion — is a CSS variable. Theming is as simple as overriding variables.',
  },
  {
    num: '03',
    title: 'Headless core',
    desc: 'Logic lives in framework-agnostic hooks and utilities. React is just one adapter. Vue and Svelte adapters are on the roadmap.',
  },
  {
    num: '04',
    title: 'Accessible by default',
    desc: 'WAI-ARIA compliance is non-negotiable. Every component ships with correct roles, keyboard navigation, and focus management.',
  },
  {
    num: '05',
    title: 'Composable',
    desc: 'The slot pattern over prop explosion. Primitives compose into complex UIs without fighting the component API.',
  },
  {
    num: '06',
    title: 'Enterprise scale',
    desc: 'Designed to power real SaaS products. 100+ component target, consistent patterns, and a CSS architecture built for teams.',
  },
];

export function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__inner">
          <Badge variant="primary">v0.1.0</Badge>
          <h1 className="about-hero__title">
            Why we built<br />
            <span className="hero__title-gradient">Synu</span>
          </h1>
          <p className="about-hero__subtitle">
            Most UI libraries make a trade-off: flexibility or quality. You either get a rigid, opinionated
            system that looks great out of the box, or a headless system that gives you full control but
            zero visual polish. Synu does both.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__inner">
          <p className="features__eyebrow">Philosophy</p>
          <h2 className="about-section__title">Six principles we don't compromise on</h2>
          <div className="about-principles">
            {principles.map((p) => (
              <div key={p.num} className="about-principle">
                <span className="about-principle__num">{p.num}</span>
                <div>
                  <h3 className="about-principle__title">{p.title}</h3>
                  <p className="about-principle__desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--alt">
        <div className="about-section__inner">
          <p className="features__eyebrow">Architecture</p>
          <h2 className="about-section__title">Layered by design</h2>
          <p className="about-section__desc">
            The package structure enforces strict separation. Tokens inform the theme. The headless core
            is framework-free. React is one adapter on top. Future adapters (Vue, Svelte) will live
            alongside it without touching the core.
          </p>
          <CodeBlock
            language="text"
            code={`@synu/tokens    ← CSS variables as JS constants
    ↓
@synu/theme     ← Precompiled component CSS
    ↓
@synu/core      ← Headless logic (no React)
    ↓
@synu/react     ← React components & hooks`}
          />
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__inner">
          <p className="features__eyebrow">Comparison</p>
          <h2 className="about-section__title">How Synu stacks up</h2>
          <p className="about-section__desc">
            An honest comparison with popular alternatives.
          </p>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>
                    <span className="comparison-table__synu">Synu</span>
                  </th>
                  <th>Radix UI</th>
                  <th>shadcn/ui</th>
                  <th>MUI</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td><Cell value={row.synu} /></td>
                    <td><Cell value={row.radix} /></td>
                    <td><Cell value={row.shadcn} /></td>
                    <td><Cell value={row.mui} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="about-section about-section--alt">
        <div className="about-section__inner">
          <p className="features__eyebrow">Roadmap</p>
          <h2 className="about-section__title">What's coming</h2>
          <div className="roadmap-grid">
            {[
              { phase: 'v0.1', label: 'Current', items: ['40+ React components', 'CSS variable theming', 'Dark mode', 'WCAG AA compliance'], done: true },
              { phase: 'v0.2', label: 'Next', items: ['Animation primitives', 'Vue adapter', 'Figma tokens sync', 'RTL support'], done: false },
              { phase: 'v0.3', label: 'Future', items: ['Svelte adapter', 'CLI scaffold tool', 'Theme builder UI', 'AI-assisted theming'], done: false },
            ].map((phase) => (
              <div key={phase.phase} className={`roadmap-card${phase.done ? ' roadmap-card--done' : ''}`}>
                <div className="roadmap-card__header">
                  <span className="roadmap-card__phase">{phase.phase}</span>
                  <Badge variant={phase.done ? 'success' : 'default'}>{phase.label}</Badge>
                </div>
                <ul className="roadmap-card__items">
                  {phase.items.map((item) => (
                    <li key={item} className="roadmap-card__item">
                      <span className="roadmap-card__check">{phase.done ? '✓' : '○'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" style={{ marginTop: 0 }}>
        <div className="cta-section__content">
          <h2 className="cta-section__title">Ready to build?</h2>
          <p className="cta-section__desc">
            Synu is open-source and MIT licensed. Start with the docs or explore components in the playground.
          </p>
          <Stack direction="row" gap={3} justify="center" wrap>
            <NavButton to="/docs/introduction" size="lg" variant="primary">
              <ButtonLabel>Read the Docs</ButtonLabel>
            </NavButton>
            <NavButton to="/playground" size="lg" variant="outline">
              <ButtonLabel>Open Playground</ButtonLabel>
            </NavButton>
          </Stack>
        </div>
      </section>
    </div>
  );
}
