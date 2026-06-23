'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
}

export function useReveal(
  ref: RefObject<HTMLElement | null>,
  options: UseRevealOptions = {}
) {
  const {
    y = 50,
    x = 0,
    duration = 1.0,
    delay = 0,
    stagger = 0.12,
    start = 'top 85%',
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('[data-reveal]');
    const targets = elements.length > 0 ? Array.from(elements) : [ref.current];

    gsap.fromTo(
      targets,
      { opacity: 0, y, x },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      }
    );
  }, [ref, y, x, duration, delay, stagger, start]);
}

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  strength = 60
) {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: strength,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [ref, strength]);
}
