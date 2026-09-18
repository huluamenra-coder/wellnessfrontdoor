import type { CSSProperties } from 'react';
import { Link } from '../lib/router';
import { SearchBar } from './SearchBar';

export type Hotspot = {
  to?: string;
  href?: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
  search?: boolean;
};

const NAV: Hotspot[] = [
  { to: '/', label: 'Home', top: '1.05%', left: '2%', width: '30%', height: '4.8%' },
  { to: '/explore', label: 'Explore', top: '1.7%', left: '36.2%', width: '6.6%', height: '3%' },
  { to: '/needs', label: 'Needs', top: '1.7%', left: '42.9%', width: '5.6%', height: '3%' },
  { to: '/categories', label: 'Categories', top: '1.7%', left: '48.7%', width: '8.4%', height: '3%' },
  { to: '/neighborhoods', label: 'Neighborhoods', top: '1.7%', left: '57.3%', width: '11.2%', height: '3%' },
  { to: '/events', label: 'Events', top: '1.7%', left: '68.6%', width: '5.4%', height: '3%' },
  { to: '/about', label: 'About', top: '1.7%', left: '74.2%', width: '5%', height: '3%' },
  { to: '/join', label: 'Join', top: '1.35%', left: '80.4%', width: '8%', height: '3.6%' },
];

const NAV_WIDE: Hotspot[] = [
  { to: '/', label: 'Home', top: '1.05%', left: '1.8%', width: '26%', height: '4.6%' },
  { to: '/explore', label: 'Explore', top: '1.7%', left: '31.2%', width: '5.4%', height: '2.8%' },
  { to: '/needs', label: 'Needs', top: '1.7%', left: '36.7%', width: '4.8%', height: '2.8%' },
  { to: '/categories', label: 'Categories', top: '1.7%', left: '41.6%', width: '7.2%', height: '2.8%' },
  { to: '/neighborhoods', label: 'Neighborhoods', top: '1.7%', left: '49%', width: '9.4%', height: '2.8%' },
  { to: '/events', label: 'Events', top: '1.7%', left: '58.5%', width: '4.8%', height: '2.8%' },
  { to: '/for-providers', label: 'For Providers', top: '1.7%', left: '63.5%', width: '8.6%', height: '2.8%' },
  { to: '/about', label: 'About', top: '1.7%', left: '72.3%', width: '4.4%', height: '2.8%' },
  { to: '/join', label: 'Join', top: '1.25%', left: '77.4%', width: '7.6%', height: '3.5%' },
  { to: '/explore', label: 'Header search', top: '1.35%', left: '85.4%', width: '4.2%', height: '3.3%' },
];

const FOOTER: Hotspot[] = [
  { to: '/', label: 'Footer home', top: '90.6%', left: '3%', width: '18%', height: '5%' },
  { to: '/explore', label: 'Footer Explore', top: '91.2%', left: '24%', width: '12%', height: '1.5%' },
  { to: '/needs', label: 'Footer Needs', top: '92.8%', left: '24%', width: '14%', height: '1.4%' },
  { to: '/categories', label: 'Footer Categories', top: '94.3%', left: '24%', width: '12%', height: '1.4%' },
  { to: '/neighborhoods', label: 'Footer Neighborhoods', top: '95.8%', left: '24%', width: '14%', height: '1.4%' },
  { to: '/events', label: 'Footer Events', top: '97.3%', left: '24%', width: '10%', height: '1.4%' },
  { to: '/about', label: 'Footer About', top: '91.2%', left: '41%', width: '10%', height: '1.5%' },
  { to: '/join', label: 'Footer Join', top: '92.8%', left: '41%', width: '8%', height: '1.4%' },
  { to: '/contact', label: 'Footer Contact', top: '94.3%', left: '41%', width: '10%', height: '1.4%' },
  { to: '/join', label: 'Footer List business', top: '91.2%', left: '56%', width: '16%', height: '1.5%' },
  { to: '/your-concierge', label: 'Footer Concierge', top: '92.8%', left: '56%', width: '16%', height: '1.4%' },
  { to: '/for-providers', label: 'Footer Provider resources', top: '94.3%', left: '56%', width: '16%', height: '1.4%' },
];

export const EXPLORE_SPOTS: Hotspot[] = [
  ...NAV,
  { search: true, label: 'Search', top: '26.6%', left: '5%', width: '50%', height: '4.2%' },
  { to: '/categories', label: 'View all categories', top: '38.4%', left: '70%', width: '24%', height: '2.3%' },
  { to: '/categories/recovery', label: 'Recovery', top: '41.2%', left: '4.5%', width: '12.5%', height: '8.4%' },
  { to: '/categories/wellness', label: 'Wellness', top: '41.2%', left: '17.4%', width: '12.5%', height: '8.4%' },
  { to: '/categories/movement', label: 'Movement', top: '41.2%', left: '30.3%', width: '12.5%', height: '8.4%' },
  { to: '/categories/community', label: 'Community', top: '41.2%', left: '43.2%', width: '12.5%', height: '8.4%' },
  { to: '/categories/energy', label: 'Energy', top: '41.2%', left: '56.1%', width: '12.5%', height: '8.4%' },
  { to: '/categories/holistic', label: 'Holistic', top: '41.2%', left: '69%', width: '12.5%', height: '8.4%' },
  { to: '/categories/spa', label: 'Spa', top: '41.2%', left: '81.9%', width: '13%', height: '8.4%' },
  { to: '/neighborhoods', label: 'View all neighborhoods', top: '53.6%', left: '68%', width: '26%', height: '2.3%' },
  { to: '/neighborhoods/ocean-beach', label: 'Ocean Beach', top: '56.4%', left: '4.6%', width: '14.6%', height: '11.2%' },
  { to: '/neighborhoods/encinitas', label: 'Encinitas', top: '56.4%', left: '19.8%', width: '14.6%', height: '11.2%' },
  { to: '/explore?q=La%20Jolla', label: 'La Jolla', top: '56.4%', left: '35%', width: '14.6%', height: '11.2%' },
  { to: '/explore?q=North%20Park', label: 'North Park', top: '56.4%', left: '50.2%', width: '14.6%', height: '11.2%' },
  { to: '/neighborhoods/little-italy', label: 'Little Italy', top: '56.4%', left: '65.4%', width: '14.6%', height: '11.2%' },
  { to: '/explore?q=Downtown', label: 'Downtown', top: '56.4%', left: '80.6%', width: '14.6%', height: '11.2%' },
  { to: '/explore?view=list', label: 'Explore the map', top: '72.8%', left: '55%', width: '28%', height: '4%' },
  ...FOOTER,
];

export const NEEDS_SPOTS: Hotspot[] = [
  ...NAV,
  { to: '/needs/stress-overwhelm', label: 'Stress / Overwhelm', top: '29.4%', left: '4.5%', width: '44.5%', height: '10.6%' },
  { to: '/needs/pain-discomfort', label: 'Pain / Discomfort', top: '29.4%', left: '51%', width: '44.5%', height: '10.6%' },
  { to: '/needs/energize-restore', label: 'Energize / Restore', top: '40.6%', left: '4.5%', width: '44.5%', height: '10.6%' },
  { to: '/needs/detox-rejuvenate', label: 'Detox / Rejuvenate', top: '40.6%', left: '51%', width: '44.5%', height: '10.6%' },
  { to: '/needs/sleep-rest', label: 'Sleep / Rest', top: '51.8%', left: '4.5%', width: '44.5%', height: '10.6%' },
  { to: '/needs/connect-belong', label: 'Connect / Belong', top: '51.8%', left: '51%', width: '44.5%', height: '10.6%' },
  { to: '/needs/beauty-skin', label: 'Beauty / Skin', top: '63%', left: '4.5%', width: '44.5%', height: '10.6%' },
  { to: '/needs/movement-flow', label: 'Movement / Flow', top: '63%', left: '51%', width: '44.5%', height: '10.6%' },
  { to: '/explore?view=list', label: 'Explore the directory', top: '77.4%', left: '58%', width: '30%', height: '4.2%' },
  ...FOOTER,
];

export const CATEGORY_SPOTS: Hotspot[] = [
  ...NAV,
  { to: '/categories/recovery', label: 'Recovery', top: '29.6%', left: '4.5%', width: '44.5%', height: '9.4%' },
  { to: '/categories/wellness', label: 'Wellness', top: '29.6%', left: '51%', width: '44.5%', height: '9.4%' },
  { to: '/categories/movement', label: 'Movement', top: '39.6%', left: '4.5%', width: '44.5%', height: '9.4%' },
  { to: '/categories/community', label: 'Community', top: '39.6%', left: '51%', width: '44.5%', height: '9.4%' },
  { to: '/categories/energy', label: 'Energy', top: '49.6%', left: '4.5%', width: '44.5%', height: '9.4%' },
  { to: '/categories/holistic', label: 'Holistic', top: '49.6%', left: '51%', width: '44.5%', height: '9.4%' },
  { to: '/categories/spa', label: 'Spa', top: '59.6%', left: '4.5%', width: '44.5%', height: '9.4%' },
  { to: '/categories/beauty', label: 'Beauty / Skin', top: '59.6%', left: '51%', width: '44.5%', height: '9.4%' },
  { to: '/needs', label: 'Start with a need', top: '74.8%', left: '58%', width: '30%', height: '4.2%' },
  ...FOOTER,
];

export const NEIGHBORHOOD_SPOTS: Hotspot[] = [
  ...NAV,
  { to: '/neighborhoods/ocean-beach', label: 'Ocean Beach', top: '26.4%', left: '4.4%', width: '29.4%', height: '14.6%' },
  { to: '/neighborhoods/encinitas', label: 'Encinitas', top: '26.4%', left: '35.3%', width: '29.4%', height: '14.6%' },
  { to: '/explore?q=La%20Jolla', label: 'La Jolla', top: '26.4%', left: '66.2%', width: '29.4%', height: '14.6%' },
  { to: '/explore?q=North%20Park', label: 'North Park', top: '41.6%', left: '4.4%', width: '29.4%', height: '14.6%' },
  { to: '/neighborhoods/little-italy', label: 'Little Italy', top: '41.6%', left: '35.3%', width: '29.4%', height: '14.6%' },
  { to: '/explore?q=Downtown', label: 'Downtown', top: '41.6%', left: '66.2%', width: '29.4%', height: '14.6%' },
  { to: '/explore?q=Pacific%20Beach', label: 'Pacific Beach', top: '56.8%', left: '4.4%', width: '29.4%', height: '14.6%' },
  { to: '/explore?q=Mission%20Bay', label: 'Mission Bay', top: '56.8%', left: '35.3%', width: '29.4%', height: '14.6%' },
  { to: '/explore?view=list', label: 'All neighborhoods', top: '56.8%', left: '66.2%', width: '29.4%', height: '14.6%' },
  { to: '/explore?view=list', label: 'View the map', top: '76.6%', left: '62%', width: '24%', height: '4%' },
  ...FOOTER,
];

export const EVENTS_SPOTS: Hotspot[] = [
  ...NAV_WIDE,
  { to: '/join', label: 'Find events', top: '26.4%', left: '52%', width: '14%', height: '3%' },
  { to: '/neighborhoods/ocean-beach', label: 'Ocean Beach events', top: '58.6%', left: '70%', width: '24%', height: '1.7%' },
  { to: '/neighborhoods/encinitas', label: 'Encinitas events', top: '60.5%', left: '70%', width: '24%', height: '1.7%' },
  { to: '/explore?q=La%20Jolla', label: 'La Jolla events', top: '62.4%', left: '70%', width: '24%', height: '1.7%' },
  { to: '/explore?q=North%20Park', label: 'North Park events', top: '64.3%', left: '70%', width: '24%', height: '1.7%' },
  { to: '/neighborhoods/little-italy', label: 'Little Italy events', top: '66.2%', left: '70%', width: '24%', height: '1.7%' },
  { to: '/explore?q=Mission%20Bay', label: 'Mission Bay events', top: '68.1%', left: '70%', width: '24%', height: '1.7%' },
  { to: '/explore?view=list', label: 'All neighborhoods events', top: '70%', left: '70%', width: '24%', height: '1.7%' },
  { to: '/join', label: 'Share an event', top: '80.6%', left: '68%', width: '22%', height: '3.6%' },
  ...FOOTER,
];

export const HOW_IT_WORKS_SPOTS: Hotspot[] = [
  ...NAV_WIDE,
  { to: '/needs', label: 'Start your journey', top: '17.8%', left: '4.6%', width: '18%', height: '3.2%' },
  { to: '/explore?view=list', label: 'Watch the video', top: '17.8%', left: '23.5%', width: '16%', height: '3.2%' },
  { to: '/needs', label: 'Tell us what you need', top: '32%', left: '3.8%', width: '14.8%', height: '16%' },
  { to: '/explore', label: 'Explore possibilities', top: '32%', left: '19.4%', width: '14.8%', height: '16%' },
  { to: '/explore?view=list', label: 'Find people and places', top: '32%', left: '35%', width: '14.8%', height: '16%' },
  { to: '/explore?view=list', label: 'Start exploring', top: '84.8%', left: '38%', width: '22%', height: '3.6%' },
  ...FOOTER,
];

export const BENEFITS_SPOTS: Hotspot[] = [
  ...NAV_WIDE,
  { to: '/explore?view=list', label: 'Explore the benefits', top: '18.2%', left: '4.6%', width: '18%', height: '3.2%' },
  { to: '/join', label: 'Join the movement', top: '18.2%', left: '23.4%', width: '17%', height: '3.2%' },
  { to: '/needs', label: 'Start exploring', top: '55.6%', left: '7%', width: '16%', height: '3.2%' },
  { to: '/join', label: 'List your business', top: '55.6%', left: '52%', width: '16%', height: '3.2%' },
  { to: '/join', label: 'Join Wellness Front Door', top: '82.8%', left: '62%', width: '28%', height: '3.8%' },
  ...FOOTER,
];

export const FOR_PROVIDERS_SPOTS: Hotspot[] = [
  ...NAV_WIDE,
  { to: '/join', label: 'List your business', top: '17.6%', left: '4.6%', width: '17%', height: '3.2%' },
  { to: '/your-concierge', label: 'Watch how it works', top: '17.6%', left: '22.6%', width: '20%', height: '3.2%' },
  { to: '/join', label: 'Join as a provider', top: '36.4%', left: '78%', width: '16%', height: '3%' },
  { to: '/join', label: 'Get started', top: '83.6%', left: '66%', width: '22%', height: '3.8%' },
  ...FOOTER,
];

export const CONCIERGE_SPOTS: Hotspot[] = [
  ...NAV_WIDE,
  { to: '/join', label: 'Get your concierge', top: '17.8%', left: '4.6%', width: '18%', height: '3.2%' },
  { to: '/for-providers', label: 'Watch demo', top: '17.8%', left: '23.4%', width: '16%', height: '3.2%' },
  { to: '/for-providers', label: 'See plans', top: '56.8%', left: '78%', width: '14%', height: '3%' },
  { to: '/join', label: 'Get started today', top: '83.4%', left: '64%', width: '24%', height: '3.8%' },
  ...FOOTER,
];

export const JOIN_SPOTS: Hotspot[] = [
  ...NAV,
  { to: '/join#form', label: 'List your business', top: '21.4%', left: '4.6%', width: '18%', height: '3.4%' },
  { to: '/for-providers', label: 'Learn more', top: '21.4%', left: '23.6%', width: '14%', height: '3.4%' },
  { to: '/join#form', label: 'Get started', top: '82.8%', left: '66%', width: '22%', height: '3.8%' },
  ...FOOTER,
];

function spotKey(spot: Hotspot) {
  return `${spot.label}-${spot.top}-${spot.left}`;
}

export function TemplateBoard({
  src,
  alt,
  spots,
}: {
  src: string;
  alt: string;
  spots: Hotspot[];
}) {
  return (
    <div className="template-board">
      <img src={src} alt={alt} />
      {spots.map((spot) => {
        const style: CSSProperties = {
          top: spot.top,
          left: spot.left,
          width: spot.width,
          height: spot.height,
        };
        if (spot.search) {
          return (
            <div key={spotKey(spot)} className="hotspot hotspot-search" style={style}>
              <SearchBar variant="ghost" placeholder="Search wellness, yoga, massage, Encinitas…" />
            </div>
          );
        }
        if (spot.href) {
          return (
            <a
              key={spotKey(spot)}
              href={spot.href}
              className="hotspot"
              style={style}
              aria-label={spot.label}
            />
          );
        }
        return (
          <Link
            key={spotKey(spot)}
            to={spot.to || '/'}
            className="hotspot"
            style={style}
            aria-label={spot.label}
          >
            <span className="visually-hidden">{spot.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
