import { useEffect, useRef, useState } from 'react';

/**
 * useScrollSpy
 * @param {string[]} ids - section ids to observe
 * @param {object} options - IntersectionObserver options
 * @returns {string} activeId
 */
export default function useScrollSpy(
  ids = [],
  // kept for backwards compatibility, not used in the new implementation
  _options = { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
) {
  const [activeId, setActiveId] = useState(ids[0] || '');
  const rafRef = useRef(0);

  useEffect(() => {
    const pickClosestToCenter = () => {
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      if (elements.length === 0) return;
      // If we're at (or very near) the bottom, force-select the last section
      const doc = document.documentElement;
      const scrollBottom = (window.scrollY || window.pageYOffset) + window.innerHeight;
      const docHeight = Math.max(
        doc.scrollHeight,
        doc.offsetHeight,
        doc.clientHeight,
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.body.clientHeight
      );
      if (docHeight - scrollBottom < 2) {
        const lastPresent = [...ids].reverse().find((id) => document.getElementById(id));
        if (lastPresent && lastPresent !== activeId) {
          setActiveId(lastPresent);
          return;
        }
      }

      // Primary: select the last section whose top is above the header offset
      const header = document.querySelector('nav');
      const headerH = (header?.offsetHeight ?? 0) + 8; // small buffer
      let candidateId = elements[0]?.id || activeId;
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerH) {
          candidateId = el.id || candidateId;
        } else {
          // since elements are ordered top-to-bottom, we can break once one is below header
          break;
        }
      }

      if (candidateId && candidateId !== activeId) setActiveId(candidateId);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(pickClosestToCenter);
    };

    // Initial sync in case the page loads mid-scroll or after lazy components mount
    pickClosestToCenter();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // In case some sections mount later (lazy), observe DOM changes around body
    const mo = new MutationObserver(() => {
      pickClosestToCenter();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      mo.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|')]);

  return activeId;
}
