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
      { label: 'Slider', path: '/docs/slider' },
      { label: 'Switch', path: '/docs/switch' },
      { label: 'Search Field', path: '/docs/search-field' },
      { label: 'Toggle Button', path: '/docs/toggle' },
    ],
  },
  {
    section: 'Feedback',
    items: [
      { label: 'Alert', path: '/docs/alert' },
      { label: 'Progress', path: '/docs/progress' },
      { label: 'Circular Progress', path: '/docs/circular-progress' },
      { label: 'Snackbar', path: '/docs/snackbar' },
    ],
  },
  {
    section: 'Navigation',
    items: [
      { label: 'Breadcrumbs', path: '/docs/breadcrumbs' },
      { label: 'Tabs', path: '/docs/tabs' },
      { label: 'Menu', path: '/docs/menu' },
      { label: 'Stepper', path: '/docs/stepper' },
      { label: 'Bottom Navigation', path: '/docs/bottom-nav' },
      { label: 'Navigation Rail', path: '/docs/nav-rail' },
      { label: 'App Bar', path: '/docs/app-bar' },
    ],
  },
  {
    section: 'Overlay',
    items: [
      { label: 'Dialog', path: '/docs/dialog' },
      { label: 'Confirm Dialog', path: '/docs/confirm-dialog' },
      { label: 'Drawer', path: '/docs/drawer' },
      { label: 'Tooltip', path: '/docs/tooltip' },
      { label: 'Popover', path: '/docs/popover' },
      { label: 'Hover Card', path: '/docs/hover-card' },
      { label: 'Context Menu', path: '/docs/context-menu' },
      { label: 'Dropdown', path: '/docs/dropdown' },
      { label: 'Command Palette', path: '/docs/command-palette' },
    ],
  },
  {
    section: 'Data Display',
    items: [
      { label: 'Accordion', path: '/docs/accordion' },
      { label: 'Table', path: '/docs/table' },
      { label: 'Pagination', path: '/docs/pagination' },
      { label: 'Timeline', path: '/docs/timeline' },
      { label: 'Tree View', path: '/docs/treeview' },
      { label: 'Statistic', path: '/docs/statistic' },
      { label: 'Empty State', path: '/docs/emptystate' },
      { label: 'Result', path: '/docs/result' },
    ],
  },
  {
    section: 'Charts',
    items: [
      { label: 'Charts', path: '/docs/charts' },
    ],
  },
  {
    section: 'Performance',
    items: [
      { label: 'Virtualized List', path: '/docs/virtual-list' },
      { label: 'Infinite Scroll', path: '/docs/infinite-scroll' },
    ],
  },
];
