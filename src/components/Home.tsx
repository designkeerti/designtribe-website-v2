import { useEffect, useState } from "react";
import { Hero } from "./Hero";
import { ReelStage } from "./ReelStage";
import { ServicesBento } from "./ServicesBento";
import { AiSection } from "./AiSection";
import { ServicesScroll } from "./ServicesScroll";
import { ProcessSection } from "./ProcessSection";
import { FloatingNav } from "./FloatingNav";
import { usePageMotionReady } from "../hooks/useMotion";

export type ThemeMode = "light" | "dark";

const THEME_KEY = "designtribe-theme";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return "dark";
}

/**
 * New from-scratch homepage shell. Hosts the redesigned Hero (which owns the nav
 * + theme toggle). Owns persisted theme state for the page chrome / future sections.
 */
export function Home() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [inReel, setInReel] = useState(false);

  usePageMotionReady();

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Once the showreel takes over (past most of the hero), swap the hero's top
  // nav for the floating bottom nav.
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.8;
      setInReel((prev) => (prev === past ? prev : past));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <div data-theme={theme} className="min-h-[100svh] bg-bg text-ink">
      <Hero theme={theme} onToggleTheme={toggleTheme} hideNav={inReel} />
      <ReelStage />
      <ServicesBento />
      <AiSection />
      <ServicesScroll />
      <ProcessSection />
      <FloatingNav visible={inReel} />
    </div>
  );
}
