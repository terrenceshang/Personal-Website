import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Shared gsap.matchMedia() conditions. Every scroll animation is created
 * inside one of these, so users with prefers-reduced-motion get the fully
 * static page and heavy pinned scenes only run on larger screens.
 */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP_MOTION = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';
export const MOBILE_MOTION = '(max-width: 899px) and (prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, useGSAP };
