import React, { useState } from 'react';
import { BottomNavigation, Stack } from '@synu/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const bottomNavProps: PropDef[] = [
  { name: 'items', type: 'BottomNavItem[]', required: true, description: 'Array of navigation item definitions.' },
  { name: 'value', type: 'string', required: true, description: 'The value of the currently selected item.' },
  { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called when the user selects a different item.' },
  { name: 'className', type: 'string', description: 'Additional CSS class name(s) applied to the root element.' },
];

const bottomNavItemProps: PropDef[] = [
  { name: 'value', type: 'string', required: true, description: 'Unique identifier for the item.' },
  { name: 'label', type: 'string', required: true, description: 'Text label displayed below the icon.' },
  { name: 'icon', type: 'React.ReactNode', required: true, description: 'Icon element rendered above the label.' },
  { name: 'badge', type: 'number | string', description: 'Badge value shown on the icon (e.g. notification count).' },
];

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.5L1.5 7V14.5H6V10H10V14.5H14.5V7L8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6V9.5L2 11.5H14L12.5 9.5V6C12.5 3.515 10.485 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6.5 12.5C6.5 13.328 7.172 14 8 14C8.828 14 9.5 13.328 9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PersonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 14C2 11.239 4.686 9 8 9C11.314 9 14 11.239 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const navItems = [
  { value: 'home', label: 'Home', icon: <HomeIcon /> },
  { value: 'search', label: 'Search', icon: <SearchIcon /> },
  { value: 'notifications', label: 'Notifications', icon: <BellIcon />, badge: 3 },
  { value: 'profile', label: 'Profile', icon: <PersonIcon /> },
];

export function BottomNavPage() {
  const [value, setValue] = useState('home');

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Navigation</p>
        <h1 className="doc-page__title">Bottom Navigation</h1>
        <p className="doc-page__desc">
          A fixed bottom tab bar for mobile-style navigation. Each item shows an icon and
          label, with optional badge indicators. The active item is highlighted with the
          primary color.
        </p>
      </header>

      {/* Interactive Demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Demo</h2>
        <p className="doc-section__desc">
          Shown inside a mobile-phone-like frame to illustrate real-world placement.
          The Notifications item has a badge of 3.
        </p>
        <ComponentPreview
          code={`const [value, setValue] = useState('home');

<BottomNavigation
  items={[
    { value: 'home', label: 'Home', icon: <HomeIcon /> },
    { value: 'search', label: 'Search', icon: <SearchIcon /> },
    { value: 'notifications', label: 'Notifications', icon: <BellIcon />, badge: 3 },
    { value: 'profile', label: 'Profile', icon: <PersonIcon /> },
  ]}
  value={value}
  onChange={setValue}
/>`}
          leftAlign
        >
          <div
            style={{
              maxWidth: 375,
              width: '100%',
              height: 200,
              border: '2px solid var(--synu-color-border)',
              borderRadius: 'var(--synu-radius-xl)',
              overflow: 'hidden',
              position: 'relative',
              background: 'var(--synu-color-background)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Phone screen content */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--synu-spacing-4)',
              }}
            >
              <span style={{ fontSize: 'var(--synu-font-size-sm)', color: 'var(--synu-text-tertiary)' }}>
                Active: <strong style={{ color: 'var(--synu-text-primary)' }}>{value}</strong>
              </span>
            </div>
            <BottomNavigation
              items={navItems}
              value={value}
              onChange={setValue}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* With badges */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Badges</h2>
        <p className="doc-section__desc">
          Pass a numeric or string <code className="inline-code">badge</code> on any item to
          show a notification count. Counts above 99 are conventionally displayed as "99+".
        </p>
        <ComponentPreview
          code={`<BottomNavigation
  items={[
    { value: 'home', label: 'Home', icon: <HomeIcon /> },
    { value: 'search', label: 'Search', icon: <SearchIcon /> },
    { value: 'notifications', label: 'Notifications', icon: <BellIcon />, badge: 3 },
    { value: 'profile', label: 'Profile', icon: <PersonIcon />, badge: '!' },
  ]}
  value="home"
  onChange={() => {}}
/>`}
          leftAlign
        >
          <div style={{ maxWidth: 375, width: '100%', border: '1px solid var(--synu-color-border)', borderRadius: 'var(--synu-radius-lg)', overflow: 'hidden' }}>
            <BottomNavigation
              items={[
                { value: 'home', label: 'Home', icon: <HomeIcon /> },
                { value: 'search', label: 'Search', icon: <SearchIcon /> },
                { value: 'notifications', label: 'Notifications', icon: <BellIcon />, badge: 3 },
                { value: 'profile', label: 'Profile', icon: <PersonIcon />, badge: '!' },
              ]}
              value="home"
              onChange={() => {}}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — BottomNavigation</h2>
        <PropsTable props={bottomNavProps} />
      </div>
      <div className="doc-section">
        <h2 className="doc-section__title">Props — BottomNavItem</h2>
        <PropsTable props={bottomNavItemProps} />
      </div>
    </>
  );
}
