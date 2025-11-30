import { useEffect, useState, useRef } from 'react';

/**
 * Hook to observe element visibility with Intersection Observer
 * Returns a ref to attach to the element and visibility state
 */
export default function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
      }
    }, defaultOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated, options.threshold, options.rootMargin]);

  return { elementRef, isVisible, hasAnimated };
}
