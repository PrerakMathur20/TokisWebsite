export interface NavItem {
  label: string;
  path: string;
  badge?: string;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    section: 'Getting Started',
    items: [
      { label: 'Introduction', path: '/docs/introduction' },
      { label: 'Installation', path: '/docs/installation' },
      { label: 'Theming', path: '/docs/theming' },
    ],
  },
  {
    section: 'Foundations',
    items: [
      { label: 'Typography', path: '/docs/typography' },
      { label: 'Layout', path: '/docs/layout' },
    ],
  },
  {
    section: 'Components',
    items: [
      { label: 'Button', path: '/docs/button' },
      { label: 'Avatar', path: '/docs/avatar' },
      { label: 'Badge', path: '/docs/badge' },
      { label: 'Card', path: '/docs/card' },
      { label: 'Chip', path: '/docs/chip' },
    ],
  },
  {
    section: 'Forms',
    items: [
      { label: 'TextField', path: '/docs/input' },
      { label: 'Checkbox', path: '/docs/checkbox' },
      { label: 'Radio', path: '/docs/radio' },
      { label: 'Select', path: '/docs/select' },
      { label: 'Switch', path: '/docs/switch' },
      { label: 'Slider', path: '/docs/slider' },
    ],
  },
  {
    section: 'Feedback',
    items: [
      { label: 'Alert', path: '/docs/alert' },
      { label: 'Progress', path: '/docs/progress' },
      { label: 'Snackbar', path: '/docs/snackbar' },
    ],
  },
  {
    section: 'Navigation',
    items: [
      { label: 'Breadcrumbs', path: '/docs/breadcrumbs' },
      { label: 'Tabs', path: '/docs/tabs' },
      { label: 'Menu', path: '/docs/menu' },
    ],
  },
  {
    section: 'Overlay',
    items: [
      { label: 'Dialog', path: '/docs/dialog' },
      { label: 'Drawer', path: '/docs/drawer' },
      { label: 'Tooltip', path: '/docs/tooltip' },
      { label: 'Popover', path: '/docs/popover' },
    ],
  },
  {
    section: 'Interactive',
    items: [
      { label: 'Accordion', path: '/docs/accordion' },
      { label: 'Table', path: '/docs/table' },
    ],
  },
];
