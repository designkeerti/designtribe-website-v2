import { useEffect } from "react";
import { gsap, Flip } from "../lib/gsap";

/**
 * Bento Flip gallery — faithful port of the supplied CodePen (reference first,
 * customisation later). The grid pins and Flip zooms it from the bento layout
 * into the final layout on scroll. Logic mirrors the original vanilla script
 * (gsap.context + Flip.to + a scrubbed, pinned timeline) run from a plain effect.
 */

// Curated Unsplash renders (downloaded locally). g3 (3rd) is the centre cell —
// the one the zoom fills.
const IMAGES = [
  "/assets/gallery/g1.jpg",
  "/assets/gallery/g2.jpg",
  "/assets/gallery/g3.jpg",
  "/assets/gallery/g4.jpg",
  "/assets/gallery/g5.jpg",
  "/assets/gallery/g6.jpg",
  "/assets/gallery/g7.jpg",
  "/assets/gallery/g8.jpg"
];

export function ServicesBento() {
  useEffect(() => {
    const galleryElement = document.querySelector<HTMLElement>("#gallery-8");
    if (!galleryElement) {
      return;
    }
    const galleryItems = galleryElement.querySelectorAll(".gallery__item");

    let flipCtx: ReturnType<typeof gsap.context> | undefined;

    const createTween = () => {
      flipCtx && flipCtx.revert();
      galleryElement.classList.remove("gallery--final");

      flipCtx = gsap.context(() => {
        // Temporarily add the final class to capture the final state
        galleryElement.classList.add("gallery--final");
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove("gallery--final");

        const flip = Flip.to(flipState, {
          simple: true,
          ease: "expoScale(1, 5)"
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: "center center",
            end: "+=100%",
            scrub: true,
            pin: galleryElement.parentNode as Element
          }
        });
        tl.add(flip);
        return () => gsap.set(galleryItems, { clearProps: "all" });
      });
    };

    createTween();
    window.addEventListener("resize", createTween);
    return () => {
      window.removeEventListener("resize", createTween);
      flipCtx && flipCtx.revert();
    };
  }, []);

  return (
    <div className="gallery-wrap">
      <div className="gallery gallery--bento gallery--switch" id="gallery-8">
        {IMAGES.map((src, i) => (
          <div className="gallery__item" key={i}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
