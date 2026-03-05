import React, { useState, useRef, useCallback, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { navigation } from '../lib/navigation';

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ClearIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    style={{
      transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
      transition: 'transform 180ms ease',
      flexShrink: 0,
    }}
  >
    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Sections open by default (others start collapsed)
const DEFAULT_OPEN = new Set(['Getting Started', 'Foundations']);

function getSectionForPath(pathname: string): string | null {
  for (const section of navigation) {
    if (section.items.some((item) => pathname === item.path || pathname.startsWith(item.path + '/'))) {
      return section.section;
    }
  }
  return null;
}

export function DocsSidebar() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Collapsible section state
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const activeSection = getSectionForPath(location.pathname);
    const initial = new Set(DEFAULT_OPEN);
    if (activeSection) initial.add(activeSection);
    return initial;
  });

  // Auto-expand the active section on navigation
  useEffect(() => {
    const activeSection = getSectionForPath(location.pathname);
    if (activeSection) {
      setOpenSections((prev) => {
        if (prev.has(activeSection)) return prev;
        const next = new Set(prev);
        next.add(activeSection);
        return next;
      });
    }
  }, [location.pathname]);

  const toggleSection = useCallback((sectionName: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionName)) {
        next.delete(sectionName);
      } else {
        next.add(sectionName);
      }
      return next;
    });
  }, []);

  const trimmed = query.trim().toLowerCase();

  const filteredNav = trimmed
    ? navigation
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            item.label.toLowerCase().includes(trimmed)
          ),
        }))
        .filter((section) => section.items.length > 0)
    : navigation;

  const firstResult = filteredNav[0]?.items[0];

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setQuery('');
        inputRef.current?.blur();
      } else if (e.key === 'Enter' && firstResult) {
        navigate(firstResult.path);
        setQuery('');
        inputRef.current?.blur();
      }
    },
    [firstResult, navigate],
  );

  const isSearching = trimmed.length > 0;

  return (
    <aside className="site-sidebar" aria-label="Documentation navigation">
      {/* Search */}
      <div className="site-sidebar__search">
        <div className="site-sidebar__search-wrap">
          <span className="site-sidebar__search-icon">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="search"
            className="site-sidebar__search-input"
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search documentation"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              className="site-sidebar__search-clear"
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              aria-label="Clear search"
            >
              <ClearIcon />
            </button>
          )}
        </div>
        {isSearching && filteredNav.length === 0 && (
          <p className="site-sidebar__search-empty">No results for "{trimmed}"</p>
        )}
      </div>

      {/* Navigation */}
      {filteredNav.map((section) => {
        const isOpen = isSearching || openSections.has(section.section);
        return (
          <div key={section.section} className="site-sidebar__section">
            {isSearching ? (
              <p className="site-sidebar__label">{section.section}</p>
            ) : (
              <button
                type="button"
                className="site-sidebar__section-toggle"
                onClick={() => toggleSection(section.section)}
                aria-expanded={isOpen}
              >
                <span className="site-sidebar__label site-sidebar__label--toggle">
                  {section.section}
                </span>
                <ChevronIcon open={isOpen} />
              </button>
            )}
            {isOpen && (
              <div className="site-sidebar__section-items">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `site-sidebar__item${isActive ? ' site-sidebar__item--active' : ''}`
                    }
                    onClick={() => setQuery('')}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="site-sidebar__badge">{item.badge}</span>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
