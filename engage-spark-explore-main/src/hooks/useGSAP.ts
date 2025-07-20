import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGSAP = (animation: (elements: any) => void, dependencies: any[] = []) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = gsap.context(() => {
        animation(ref.current);
      }, ref.current);

      return () => ctx.revert();
    }
  }, dependencies);

  return ref;
};

export const fadeInUp = (element: any, delay: number = 0) => {
  gsap.fromTo(
    element,
    { 
      opacity: 0, 
      y: 50 
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power2.out"
    }
  );
};

export const staggerFadeIn = (elements: any, delayBetween: number = 0.1) => {
  gsap.fromTo(
    elements,
    { 
      opacity: 0, 
      y: 30 
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: delayBetween,
      ease: "power2.out"
    }
  );
};

export const scaleIn = (element: any, delay: number = 0) => {
  gsap.fromTo(
    element,
    { 
      opacity: 0, 
      scale: 0.8 
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay,
      ease: "back.out(1.7)"
    }
  );
};