import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { GrainGradient, LiquidMetal } from "@paper-design/shaders-react";
import { gsap, useGSAP } from "../lib/gsap";

/**
 * Home hero — ported from the `hero-living-mark` prototype.
 *
 * Intro: on a black stage the Design Tribe mark *draws itself in* (big) and shrinks
 * into place; once formed, the **GrainGradient** background + **LiquidMetal** chrome
 * mark fade in and the nav / headline / badge pop. Honors reduced-motion
 * (skips the intro, shaders static) and keeps copy visible-by-default with a failsafe.
 */

const LOGO = "/assets/design-tribe-logo.svg"; // full wordmark, for the nav
const MARK_WHITE = "/assets/design-tribe-mark-white.svg"; // white silhouette for the shader

// GrainGradient — exact recipe from the brief (neon greens on black).
const GRAIN_COLORS = ["#00ff6e", "#aaffa8", "#c3ff00", "#04ff0087"];

// Design Tribe mark paths (for the intro draw-in).
const PETALS_D =
  "M28.294 5.19163V7.21059C27.6492 6.34532 26.6818 5.72727 25.5936 5.56246C26.1176 5.19163 26.4803 4.65598 26.6818 3.99673L26.7624 3.74951L26.5609 3.54349C25.7951 2.80183 24.7069 2.55461 23.6993 2.84303C23.3768 2.92544 23.0544 3.09025 22.7723 3.29627C22.8126 2.96664 22.7723 2.59581 22.6916 2.26619C22.4095 1.2361 21.6437 0.412034 20.6764 0.0824068L20.3943 0L20.1927 0.206017C19.5076 0.988881 19.2657 2.10137 19.5076 3.13146C19.5076 3.17266 19.5479 3.21386 19.5479 3.25507C18.5806 2.76063 17.4923 2.4722 16.3638 2.4722C15.2352 2.4722 14.147 2.76063 13.1797 3.25507C13.1797 3.21386 13.22 3.17266 13.22 3.13146C13.5021 2.10137 13.22 0.988881 12.5348 0.206017L12.3333 0L12.0915 0.0824068C11.0838 0.412034 10.318 1.2361 10.0762 2.26619C9.99561 2.59581 9.95531 2.96664 9.99561 3.29627C9.67317 3.09025 9.39104 2.96664 9.02829 2.88424C8.02067 2.59581 6.93244 2.88424 6.16665 3.58469L5.96512 3.79071L6.04573 4.03793C6.24726 4.65598 6.65031 5.23283 7.13396 5.60366C6.04573 5.76847 5.07841 6.38652 4.43354 7.25179V5.23283H0V25.7109L2.21677 27.9771L4.39323 25.7521C5.03811 26.6586 6.00543 27.2766 7.13396 27.4415C6.61 27.8123 6.24726 28.3479 6.04573 29.0072L5.96512 29.2544L6.16665 29.4604C6.73092 29.9961 7.49671 30.2845 8.2222 30.2845C8.50433 30.2845 8.74616 30.2433 9.02829 30.1609C9.35073 30.0785 9.67317 29.9137 9.95531 29.7076C9.915 30.0373 9.95531 30.4081 10.0359 30.7377C10.3181 31.7678 11.0838 32.5919 12.0512 32.9215L12.293 33.0039L12.4945 32.7979C13.22 32.015 13.4618 30.9025 13.1797 29.8724C13.1797 29.8312 13.1394 29.79 13.1394 29.7488C14.1067 30.2433 15.1949 30.5317 16.3235 30.5317C17.452 30.5317 18.5402 30.2433 19.5076 29.7488C19.5076 29.79 19.4673 29.8312 19.4673 29.8724C19.1851 30.9025 19.4673 32.015 20.1524 32.7979L20.354 33.0039L20.5958 32.9215C21.6034 32.5919 22.3692 31.7678 22.611 30.7377C22.6916 30.4081 22.732 30.0373 22.6916 29.7076C22.9738 29.9137 23.2962 30.0373 23.6187 30.1609C23.9008 30.2433 24.1426 30.2845 24.4248 30.2845C25.1905 30.2845 25.916 29.9961 26.4803 29.4604L26.6818 29.2544L26.6012 29.0072C26.3997 28.3891 25.9966 27.8123 25.513 27.4415C26.6415 27.2766 27.6088 26.6586 28.2537 25.7521L30.4302 27.9771L32.647 25.7109V5.19163H28.294ZM0.846403 8.4879H1.81372V23.2799C1.45098 23.3623 1.12854 23.4859 0.846403 23.7331V8.4879ZM2.21677 26.741L0.846403 25.3401C0.927013 24.6396 1.49128 24.104 2.17646 24.104C2.86165 24.104 3.46622 24.6808 3.50653 25.3813L2.21677 26.741ZM3.58714 23.7744C3.305 23.5271 2.98256 23.3623 2.61982 23.3211V8.4879H3.58714V23.7744ZM3.58714 7.66383H0.846403V6.0981H3.58714V7.66383ZM23.9008 3.7083C24.5457 3.54349 25.2309 3.6671 25.7548 4.03793C25.4727 4.65598 24.9487 5.10922 24.3038 5.27403C23.659 5.43885 22.9738 5.31524 22.4498 4.94441C22.732 4.32635 23.2962 3.87312 23.9008 3.7083ZM20.6764 1.03008C21.281 1.31851 21.7243 1.85415 21.8856 2.51341C22.0468 3.17266 21.9259 3.87312 21.5631 4.40876C20.9585 4.12034 20.5152 3.58469 20.354 2.92544C20.1524 2.26619 20.2734 1.56573 20.6764 1.03008ZM10.8823 2.4722C11.0435 1.81295 11.4869 1.2773 12.0915 0.988881C12.4542 1.52453 12.5751 2.22498 12.4139 2.88424C12.2527 3.54349 11.8093 4.07913 11.2048 4.36756C10.8017 3.83191 10.6808 3.13146 10.8823 2.4722ZM6.97275 4.03793C7.49671 3.6671 8.18189 3.54349 8.82677 3.7083C9.47165 3.87312 9.99561 4.32635 10.2777 4.94441C9.75378 5.31524 9.0686 5.43885 8.42372 5.27403C7.77884 5.10922 7.25488 4.65598 6.97275 4.03793ZM4.43354 12.361C5.19933 13.3911 6.40848 14.0916 7.77884 14.0916C7.13397 14.7508 6.52939 15.4513 6.04573 16.2753L5.92482 16.4814L6.08604 16.7286C6.61 17.5114 7.17427 18.2531 7.81915 18.9124C7.81915 18.9124 7.81915 18.9124 7.77884 18.9124C6.40848 18.9124 5.19933 19.5716 4.43354 20.6429V12.361ZM16.3638 11.3721C17.049 11.3721 17.7341 11.4545 18.4193 11.5781C18.4596 11.5781 18.4999 11.5781 18.5402 11.6194C21.4825 12.1962 24.1023 13.9267 25.8354 16.5226C23.6993 19.7364 20.1927 21.6318 16.4041 21.6318C15.6786 21.6318 14.9934 21.5494 14.3082 21.4258C14.3082 21.4258 14.3082 21.4258 14.2679 21.4258C11.3257 20.8489 8.66555 19.1184 6.93244 16.5226C9.0686 13.2675 12.5751 11.3721 16.3638 11.3721ZM8.82677 29.2956C8.18189 29.4604 7.49671 29.3368 6.97275 28.966C7.25488 28.3479 7.77884 27.8947 8.42372 27.7299C9.0686 27.5651 9.75378 27.6887 10.2777 28.0595C9.99561 28.6363 9.47165 29.1308 8.82677 29.2956ZM12.0915 31.9738C11.4869 31.6854 11.0435 31.1498 10.8823 30.4905C10.7211 29.8312 10.842 29.1308 11.2048 28.5951C11.8093 28.8836 12.2527 29.4192 12.4139 30.0785C12.5751 30.7377 12.4542 31.4382 12.0915 31.9738ZM21.8856 30.4905C21.7243 31.1498 21.281 31.6854 20.6764 31.9738C20.3137 31.4382 20.1927 30.7377 20.354 30.0785C20.5152 29.4192 20.9585 28.8836 21.5631 28.5951C21.9259 29.1308 22.0468 29.8312 21.8856 30.4905ZM25.7951 28.966C25.2712 29.3368 24.586 29.4604 23.9411 29.2956C23.2962 29.1308 22.7723 28.6776 22.4901 28.0595C23.0141 27.6887 23.6993 27.5651 24.3441 27.7299C24.989 27.8947 25.513 28.3479 25.7951 28.966ZM24.9487 26.5762C24.1426 26.5762 23.3768 26.2878 22.7723 25.7109L22.3692 25.3401L22.1274 25.8757C21.0795 28.1419 18.8627 29.6252 16.4041 29.6252C13.9455 29.6252 11.6884 28.1419 10.6808 25.8757L10.439 25.3401L10.0359 25.7109C9.43134 26.2466 8.66555 26.5762 7.85945 26.5762C6.00543 26.5762 4.51415 25.0517 4.51415 23.1563C4.51415 21.2609 6.00543 19.7364 7.85945 19.7364C8.06098 19.7364 8.30281 19.7776 8.50433 19.8188C8.74616 19.86 8.98799 19.9424 9.18951 20.066C9.55226 20.3545 9.915 20.6017 10.3181 20.8077C8.90738 20.9725 7.69823 21.8378 7.09366 23.1563L7.85945 23.5271C8.38342 22.3734 9.51195 21.6318 10.7614 21.6318C11.8496 21.6318 12.8976 22.2086 13.4618 23.1563C13.0991 23.5271 12.7766 23.9804 12.5348 24.4748L13.3006 24.8456C13.8649 23.6095 15.1143 22.7855 16.4444 22.7855C17.7745 22.7855 19.0239 23.6095 19.5882 24.8456L20.354 24.4748C20.1121 23.9804 19.7897 23.5271 19.427 23.1563C19.9912 22.2086 21.0391 21.6318 22.1274 21.6318C23.3768 21.6318 24.5054 22.3734 25.0293 23.5271L25.7951 23.1563C25.1906 21.8378 23.9814 20.9313 22.5707 20.8077C22.9738 20.5605 23.3365 20.3133 23.6993 20.066C23.9411 19.9836 24.1426 19.9012 24.3845 19.8188C24.5054 19.7776 24.7472 19.7776 24.9487 19.7776C26.8027 19.7776 28.294 21.3021 28.294 23.1975C28.294 25.0517 26.8027 26.5762 24.9487 26.5762ZM28.294 20.6017C27.5282 19.5716 26.3191 18.8711 24.9487 18.8711C24.9487 18.8711 24.9487 18.8711 24.9084 18.8711C25.5533 18.2119 26.1579 17.5114 26.6415 16.6874L26.8027 16.4401L26.6415 16.1929C26.1176 15.4101 25.5533 14.6684 24.9084 14.0091C26.2788 14.0091 27.4879 13.3499 28.2537 12.2786V20.6017H28.294ZM24.9487 13.2263C24.7472 13.2263 24.5054 13.1851 24.3038 13.1439C24.062 13.1027 23.8605 13.0203 23.6187 12.9379C23.2559 12.6494 22.8529 12.4022 22.4901 12.1962C23.9008 12.0314 25.1099 11.1661 25.7145 9.84761L24.9487 9.47678C24.4248 10.6305 23.2962 11.3721 22.0468 11.3721C20.9585 11.3721 19.9106 10.7953 19.3463 9.84761C19.7091 9.47678 20.0315 9.02354 20.2734 8.5291L19.5076 8.11707C18.9433 9.35317 17.6938 10.1772 16.3638 10.1772C15.0337 10.1772 13.7843 9.35317 13.22 8.11707L12.4542 8.4879C12.696 8.98234 13.0185 9.43557 13.3812 9.8064C12.817 10.7541 11.769 11.3309 10.6808 11.3309C9.43134 11.3309 8.30281 10.5893 7.77884 9.43557L7.01305 9.8064C7.61762 11.1249 8.82677 11.9902 10.2374 12.155C9.83439 12.4022 9.47165 12.6494 9.1089 12.8967C8.90738 12.9791 8.66555 13.0615 8.42372 13.1027C8.2222 13.1439 7.98037 13.1851 7.77884 13.1851C5.92482 13.1851 4.43354 11.6606 4.43354 9.7652C4.43354 7.86985 5.92482 6.34532 7.77884 6.34532C8.58494 6.34532 9.35073 6.63374 9.95531 7.21059L10.3584 7.58142L10.6002 7.04578C11.6481 4.77959 13.8649 3.29627 16.3235 3.29627C18.7821 3.29627 21.0392 4.77959 22.0468 7.04578L22.2886 7.58142L22.6916 7.21059C23.2962 6.67495 24.062 6.34532 24.8681 6.34532C26.7221 6.34532 28.2134 7.86985 28.2134 9.7652C28.294 11.7018 26.8027 13.2263 24.9487 13.2263ZM29.1404 8.4879H30.1077V23.2799C29.745 23.3623 29.4226 23.4859 29.1404 23.7331V8.4879ZM30.5108 26.741L29.1404 25.3401C29.221 24.6396 29.7853 24.104 30.4705 24.104C31.1557 24.104 31.7602 24.6808 31.8006 25.3813L30.5108 26.741ZM31.8812 23.7744C31.599 23.5271 31.2766 23.3623 30.9138 23.3211V8.4879H31.8812V23.7744ZM31.8812 7.66383H29.1404V6.0981H31.8812V7.66383Z";
const RING_D =
  "M16.3638 21.096C18.8627 21.096 20.8779 19.0359 20.8779 16.4812C20.8779 13.9266 18.8627 11.8665 16.3638 11.8665C13.8649 11.8665 11.8496 13.9266 11.8496 16.4812C11.8496 19.0359 13.8649 21.096 16.3638 21.096ZM16.3638 12.8553C18.2984 12.8553 19.9106 14.4623 19.9106 16.4812C19.9106 18.5002 18.3387 20.1071 16.3638 20.1071C14.4291 20.1071 12.8169 18.5002 12.8169 16.4812C12.8169 14.4623 14.4291 12.8553 16.3638 12.8553Z";
const EYE_D =
  "M16.3647 19.1183C17.7753 19.1183 18.9442 17.9234 18.9442 16.4813C18.9442 15.0391 17.7753 13.8442 16.3647 13.8442C14.954 13.8442 13.7852 15.0391 13.7852 16.4813C13.7852 17.9234 14.954 19.1183 16.3647 19.1183ZM16.3647 15.1215C17.0902 15.1215 17.6947 15.7396 17.6947 16.4813C17.6947 17.2229 17.0902 17.841 16.3647 17.841C15.6392 17.841 15.0346 17.2229 15.0346 16.4813C15.0346 15.7396 15.6392 15.1215 16.3647 15.1215Z";

const INTRO_PATH_STYLE: CSSProperties = {
  fill: "rgba(0,168,107,0)",
  stroke: "#00a86b",
  strokeWidth: 0.28,
  strokeLinejoin: "round",
  strokeLinecap: "round",
  strokeDasharray: "1",
  strokeDashoffset: "1"
};

// Moody scrim over the (very bright) GrainGradient for legibility.
const scrimStyle: CSSProperties = {
  background:
    "radial-gradient(42% 46% at 50% 46%, rgba(6,8,8,0.52) 0%, rgba(6,8,8,0) 72%)," +
    " linear-gradient(to top, rgba(6,8,8,0.94) 2%, rgba(6,8,8,0.5) 18%, rgba(6,8,8,0) 46%)," +
    " linear-gradient(to bottom, rgba(6,8,8,0.62) 0%, rgba(6,8,8,0) 14%)," +
    " linear-gradient(rgba(6,8,8,0.32), rgba(6,8,8,0.32))"
};

const cursorGlowStyle: CSSProperties = {
  background: "radial-gradient(circle, rgba(0,168,107,0.22) 0%, rgba(0,168,107,0) 70%)",
  willChange: "transform",
  transform: "translate(-50%, -50%)"
};

const PAD_X = "clamp(20px, 4vw, 40px)";

type HeroProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  /** When hosted inside the reel stage the hero floats over the video — drop its opaque backdrop. */
  transparentBg?: boolean;
  /** Stage kills the WebGL shaders once the reel has been revealed (frees the GPU for the video). */
  suspendShaders?: boolean;
  /** Fired when the intro has settled, so the stage knows it's safe to drive the scroll reveal. */
  onReady?: () => void;
  /** Fade out the top nav once the showreel takes over (the floating nav appears instead). */
  hideNav?: boolean;
};

function getReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Hero({
  theme,
  onToggleTheme,
  transparentBg = false,
  suspendShaders = false,
  onReady,
  hideNav = false
}: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);
  const [mounted, setMounted] = useState(false); // mount shaders after first paint
  const [inView, setInView] = useState(true); // pause shaders when scrolled away

  const useLiquid = mounted && !reducedMotion;
  // Shaders run only when on-screen and not suspended by the stage's reveal.
  const shadersLive = !reducedMotion && inView && !suspendShaders;
  const grainSpeed = shadersLive ? 1.36 : 0;
  const metalSpeed = shadersLive ? 1 : 0;
  // Shaders start hidden when we'll run the intro; visible immediately otherwise.
  const hiddenForIntro: CSSProperties = { opacity: reducedMotion ? 1 : 0 };

  // Track reduced-motion reactively.
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  // Mount shaders after first paint (effect → post-commit, no rAF dependency).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reduced motion skips the intro timeline → signal "ready" immediately.
  useEffect(() => {
    if (reducedMotion) {
      onReadyRef.current?.();
    }
  }, [reducedMotion]);

  // Pause shaders when the hero scrolls out of view.
  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Intro: draw the mark on black → settle → fade in shaders + crossfade to the
  // liquid metal → pop the nav / headline / badge. `.from` keeps text visible at
  // rest; a synchronous gsap.set failsafe guarantees the resting state if the
  // ticker stalls under the heavy dual-WebGL load.
  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }
      gsap.set("[data-intro]", { scale: 1.6, transformOrigin: "center center" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to("[data-intro-path]", { strokeDashoffset: 0, duration: 1.0, stagger: 0.28, ease: "power1.inOut" }, 0)
        .to("[data-intro-path]", { fill: "rgba(0,168,107,1)", strokeOpacity: 0, duration: 0.5, stagger: 0.18 }, 0.7)
        .to("[data-intro]", { scale: 0.85, duration: 1.0, ease: "power3.inOut" }, 0.85)
        // formed → bring the world to life
        .to("[data-shaders]", { opacity: 1, duration: 1.0 }, 1.95)
        .to("[data-scrim]", { opacity: 1, duration: 1.0 }, "<")
        .to("[data-liquid]", { opacity: 1, duration: 0.8 }, "<0.15")
        .to("[data-intro]", { opacity: 0, duration: 0.6 }, "<")
        .from("[data-hero-nav]", { autoAlpha: 0, duration: 0.6 }, "<0.05")
        .from("[data-hero-line]", { yPercent: 110, autoAlpha: 0, duration: 0.9, stagger: 0.09, ease: "power4.out" }, "<0.05")
        .from("[data-hero-badge]", { autoAlpha: 0, y: 12, duration: 0.6 }, "<0.15");

      tl.eventCallback("onComplete", () => onReadyRef.current?.());

      const settle = window.setTimeout(() => {
        // Only restore the resting state if we're still at the top; once the
        // user has scrolled, the reel stage owns these layers (don't fight it).
        if (window.scrollY < 8) {
          gsap.set(["[data-shaders]", "[data-scrim]", "[data-liquid]"], { opacity: 1 });
          gsap.set("[data-intro]", { opacity: 0 });
          gsap.set(["[data-hero-nav]", "[data-hero-line]", "[data-hero-badge]"], {
            autoAlpha: 1,
            clearProps: "transform"
          });
        }
        onReadyRef.current?.();
      }, 4600);

      // First scroll hands the hero's layers over to the scroll reveal: finalize
      // the intro to its resting state, then stop it so it can't fight the scrub.
      let handed = false;
      const handover = () => {
        if (handed || window.scrollY <= 8) {
          return;
        }
        handed = true;
        tl.progress(1).kill();
        window.clearTimeout(settle);
        window.removeEventListener("scroll", handover);
        onReadyRef.current?.();
      };
      window.addEventListener("scroll", handover, { passive: true });

      return () => {
        window.clearTimeout(settle);
        window.removeEventListener("scroll", handover);
      };
    },
    { scope: rootRef, dependencies: [reducedMotion] }
  );

  // Drifting particle field.
  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const container = particlesRef.current;
    if (!container) {
      return;
    }
    const count = window.innerWidth < 700 ? 18 : 40;
    const made: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 4 + 2;
      Object.assign(p.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "rgba(0, 168, 107, 0.6)",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: "0"
      });
      container.appendChild(p);
      made.push(p);
      gsap.to(p, {
        opacity: Math.random() * 0.5 + 0.15,
        duration: Math.random() * 2 + 1.5,
        delay: 2.4 + Math.random() * 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
      gsap.to(p, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 160,
        duration: Math.random() * 18 + 14,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random() * 4
      });
    }
    return () => {
      made.forEach((p) => {
        gsap.killTweensOf(p);
        p.remove();
      });
    };
  }, [reducedMotion]);

  // Cursor glow that trails the pointer inside the hero.
  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const glow = glowRef.current;
    const node = rootRef.current;
    if (!glow || !node) {
      return;
    }
    let gx = 0;
    let gy = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const onEnter = () => gsap.to(glow, { opacity: 1, duration: 0.8, ease: "power3.out" });
    const onLeave = () => gsap.to(glow, { opacity: 0, duration: 0.6, ease: "power2.out" });
    const tick = () => {
      gx += (tx - gx) * 0.15;
      gy += (ty - gy) * 0.15;
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      className={`relative isolate min-h-[100svh] w-full overflow-hidden text-[#f2eee3] ${
        transparentBg ? "bg-transparent" : "bg-[#050506]"
      }`}
    >
      {/* GrainGradient background (faded in after the intro) */}
      <div className="absolute inset-0 z-0" style={hiddenForIntro} data-shaders aria-hidden="true">
        {mounted && (
          <GrainGradient
            style={{ width: "100%", height: "100%" }}
            colors={GRAIN_COLORS}
            colorBack="#000000"
            softness={1}
            intensity={0.8}
            noise={0.23}
            shape="corners"
            speed={grainSpeed}
            scale={0.88}
          />
        )}
      </div>

      {/* moody scrim for legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ ...scrimStyle, ...hiddenForIntro }}
        data-scrim
        aria-hidden="true"
      />

      {/* film grain + particles + cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")"
        }}
        aria-hidden="true"
      />
      <div ref={particlesRef} className="pointer-events-none absolute inset-0 z-[3]" data-hero-fx aria-hidden="true" />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-[4] h-[420px] w-[420px] rounded-full opacity-0"
        style={cursorGlowStyle}
        aria-hidden="true"
      />

      {/* NAV */}
      <header
        className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between py-5"
        style={{
          paddingLeft: PAD_X,
          paddingRight: PAD_X,
          opacity: hideNav ? 0 : 1,
          pointerEvents: hideNav ? "none" : "auto",
          transition: "opacity 0.4s ease"
        }}
        data-hero-nav
      >
        <a href="#" className="flex shrink-0 items-center transition-opacity hover:opacity-70" aria-label="Design Tribe — Home">
          <img src={LOGO} alt="Design Tribe" className="h-6 w-auto sm:h-7" />
        </a>

        <nav className="hidden items-center gap-8 font-mono text-[13px] tracking-[0.04em] md:flex">
          <a href="#work" className="text-[#8e887a] transition-colors hover:text-[#f2eee3]">Work</a>
          <a href="#services" className="text-[#8e887a] transition-colors hover:text-[#f2eee3]">Services</a>
          <a href="#about" className="text-[#8e887a] transition-colors hover:text-[#f2eee3]">About&nbsp;Us</a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            aria-pressed={theme === "dark"}
            className="relative h-[26px] w-[48px] rounded-full border-[1.5px] border-[#f2eee3]/25 transition-colors hover:border-[#f2eee3]/50"
          >
            <span
              className="absolute top-1/2 flex h-[19px] w-[19px] -translate-y-1/2 items-center justify-center rounded-full bg-[#f2eee3] text-[10px] text-[#15140f] transition-[left] duration-300"
              style={{ left: theme === "dark" ? "2px" : "25px" }}
            >
              {theme === "dark" ? "☾" : "☀"}
            </span>
          </button>
          <a
            href="mailto:hello@designtribe.com"
            className="whitespace-nowrap bg-[#f2eee3] px-3 py-2 font-mono text-[12px] font-bold text-[#15140f] shadow-[0_2px_0_0_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5 sm:px-[18px] sm:py-2.5 sm:text-[14px]"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* CENTERED MARK — intro draw-in crossfading to the liquid metal */}
      <div className="absolute left-1/2 top-1/2 z-[5]" style={{ transform: "translate(-50%, -50%)" }} data-hero-mark>
        <div
          role="img"
          aria-label="Design Tribe"
          className="relative"
          style={{ width: "clamp(240px, 26vw, 400px)", aspectRatio: "33 / 34" }}
        >
          {/* intro mark (drawn on black, then crossfades out) */}
          <svg
            data-intro
            viewBox="0 0 33 34"
            className="absolute inset-0 h-full w-full overflow-visible"
            style={{ opacity: reducedMotion ? 0 : 1 }}
            aria-hidden="true"
          >
            <path data-intro-path pathLength={1} style={INTRO_PATH_STYLE} d={PETALS_D} />
            <path data-intro-path pathLength={1} style={INTRO_PATH_STYLE} d={RING_D} />
            <path data-intro-path pathLength={1} style={INTRO_PATH_STYLE} d={EYE_D} />
          </svg>

          {/* living liquid-metal mark */}
          <div data-liquid className="absolute inset-0" style={hiddenForIntro}>
            {useLiquid ? (
              <LiquidMetal
                style={{ width: "100%", height: "100%" }}
                image={MARK_WHITE}
                colorBack="#00000000"
                colorTint="#ffffff"
                repetition={2}
                softness={0.1}
                shiftRed={0.3}
                shiftBlue={0.3}
                distortion={0.07}
                contour={0.4}
                angle={70}
                speed={metalSpeed}
                scale={0.85}
                fit="contain"
              />
            ) : (
              <img
                src={MARK_WHITE}
                alt=""
                className="h-full w-full object-contain"
                style={{ transform: "scale(0.85)" }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div
        className="absolute inset-x-0 bottom-0 z-[6] flex flex-wrap items-end justify-between gap-8"
        style={{ paddingLeft: PAD_X, paddingRight: PAD_X, paddingBottom: "clamp(28px, 4vw, 48px)" }}
      >
        <div className="flex max-w-[920px] flex-col gap-4">
          <h1
            className="py-[0.05em] font-display font-bold leading-[1.04] text-[#f2eee3]"
            style={{ fontSize: "clamp(30px, 5.2vw, 76px)" }}
          >
            <span className="block overflow-hidden py-[0.02em]">
              <span data-hero-line className="block">DESIGN THAT THINKS.</span>
            </span>
            <span className="block overflow-hidden py-[0.02em]">
              <span data-hero-line className="block">WORK THAT <em className="italic">ENDURES.</em></span>
            </span>
          </h1>
          <div
            data-hero-badge
            className="inline-flex w-fit items-center gap-2.5 border border-[#f2eee3]/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8e887a]"
          >
            <span className="h-2 w-2 rounded-full bg-[#00a86b] shadow-[0_0_10px_#00a86b]" />
            <span>Guided by humans · Powered by AI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
