import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePageMotionReady() {
  useEffect(() => {
    const root = document.documentElement;

    if (prefersReducedMotion()) {
      root.classList.add("motion-reduced");
      return () => {
        root.classList.remove("motion-reduced");
      };
    }

    root.classList.add("motion-ready");
    return () => {
      root.classList.remove("motion-ready");
    };
  }, []);
}

export function useRevealOnView<TElement extends HTMLElement>() {
  const ref = useRef<TElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      element.dataset.motionState = "revealed";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        element.dataset.motionState = "revealed";
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08
      }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}
