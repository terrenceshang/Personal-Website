import { useState } from 'react';
import { navLinks, site } from '../content';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href="#home" onClick={() => setMenuOpen(false)}>
          <img
            className="header__logo"
            src="/img/brand/zenan-logo.svg"
            alt=""
            width="32"
            height="32"
            aria-hidden="true"
          />
          {site.name}
        </a>

        <button
          type="button"
          className="header__toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen(open => !open)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>

        <nav id="site-nav" className={menuOpen ? 'header__nav header__nav--open' : 'header__nav'}>
          <ul>
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
