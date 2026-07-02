import type { ReactNode } from 'react';
import type { ProjectMockupKind } from '../content';

/**
 * Hand-built CSS/SVG project visuals — no image assets.
 * To use a real screenshot later, replace <ProjectMockup /> in the showcase
 * card with an <img>; everything here is presentational only.
 */

function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="mock-browser">
      <div className="mock-browser__bar">
        <i />
        <i />
        <i />
        <span className="mock-browser__url">{url}</span>
      </div>
      <div className="mock-browser__body">{children}</div>
    </div>
  );
}

function Sparkline() {
  return (
    <svg className="mock-spark" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true">
      <path
        className="mock-spark__area"
        d="M0 34 L12 30 L24 31 L36 24 L48 26 L60 17 L72 20 L84 12 L96 15 L108 8 L120 10 L120 40 L0 40 Z"
      />
      <path
        className="mock-spark__line"
        d="M0 34 L12 30 L24 31 L36 24 L48 26 L60 17 L72 20 L84 12 L96 15 L108 8 L120 10"
      />
    </svg>
  );
}

function DashboardMockup() {
  return (
    <BrowserFrame url="portal.stagezero.app">
      <div className="mock-dash">
        <div className="mock-dash__side">
          <i className="mock-dash__nav mock-dash__nav--active" />
          <i className="mock-dash__nav" />
          <i className="mock-dash__nav" />
          <i className="mock-dash__nav" />
        </div>
        <div className="mock-dash__main">
          <div className="mock-dash__stats">
            <div className="mock-stat">
              <span className="mock-stat__label" />
              <span className="mock-stat__value">4.2 kW</span>
            </div>
            <div className="mock-stat">
              <span className="mock-stat__label" />
              <span className="mock-stat__value">86%</span>
            </div>
            <div className="mock-stat mock-stat--live">
              <span className="mock-stat__dot" />
              <span className="mock-stat__value">Live</span>
            </div>
          </div>
          <div className="mock-dash__chart">
            <Sparkline />
          </div>
          <div className="mock-dash__bars">
            <i style={{ height: '55%' }} />
            <i style={{ height: '80%' }} />
            <i style={{ height: '42%' }} />
            <i style={{ height: '68%' }} />
            <i style={{ height: '90%' }} />
            <i style={{ height: '60%' }} />
            <i style={{ height: '74%' }} />
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function BookingMockup() {
  const days = Array.from({ length: 21 }, (_, i) => i);
  const booked = new Set([2, 3, 4, 8, 9, 13, 14, 15, 16, 19]);
  return (
    <BrowserFrame url="bookmystayapp.co.za">
      <div className="mock-booking">
        <div className="mock-booking__calendar">
          {days.map(day => (
            <i
              key={day}
              className={booked.has(day) ? 'mock-booking__day mock-booking__day--busy' : 'mock-booking__day'}
            />
          ))}
        </div>
        <div className="mock-booking__rooms">
          <div className="mock-room">
            <i className="mock-room__thumb" />
            <div className="mock-room__lines">
              <i />
              <i />
            </div>
            <span className="mock-room__state mock-room__state--in">Checked in</span>
          </div>
          <div className="mock-room">
            <i className="mock-room__thumb" />
            <div className="mock-room__lines">
              <i />
              <i />
            </div>
            <span className="mock-room__state">Arriving</span>
          </div>
          <div className="mock-room">
            <i className="mock-room__thumb" />
            <div className="mock-room__lines">
              <i />
              <i />
            </div>
            <span className="mock-room__state mock-room__state--clean">Housekeeping</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function MobileMockup() {
  return (
    <div className="mock-phone">
      <div className="mock-phone__notch" />
      <div className="mock-phone__screen">
        <div className="mock-phone__header">
          <span className="mock-phone__table">Table 12</span>
          <i className="mock-phone__qr" />
        </div>
        <div className="mock-phone__items">
          <div className="mock-dish">
            <i className="mock-dish__thumb" />
            <div className="mock-dish__lines">
              <i />
              <i />
            </div>
            <span className="mock-dish__price">R89</span>
          </div>
          <div className="mock-dish">
            <i className="mock-dish__thumb" />
            <div className="mock-dish__lines">
              <i />
              <i />
            </div>
            <span className="mock-dish__price">R124</span>
          </div>
          <div className="mock-dish">
            <i className="mock-dish__thumb" />
            <div className="mock-dish__lines">
              <i />
              <i />
            </div>
            <span className="mock-dish__price">R65</span>
          </div>
        </div>
        <div className="mock-phone__cta">Place order · R278</div>
      </div>
    </div>
  );
}

function WebsiteMockup() {
  return (
    <BrowserFrame url="zenanshang.co.za">
      <div className="mock-site">
        <div className="mock-site__hero">
          <i className="mock-site__glow" />
          <div className="mock-site__title">
            <i />
            <i />
          </div>
        </div>
        <div className="mock-site__cards">
          <i />
          <i />
          <i />
        </div>
        <div className="mock-site__marquee">
          <i />
        </div>
      </div>
    </BrowserFrame>
  );
}

export default function ProjectMockup({ kind }: { kind: ProjectMockupKind }) {
  switch (kind) {
    case 'dashboard':
      return <DashboardMockup />;
    case 'booking':
      return <BookingMockup />;
    case 'mobile':
      return <MobileMockup />;
    case 'website':
      return <WebsiteMockup />;
  }
}
