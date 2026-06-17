// Central GSAP setup. Import everything pre-registered from here:
//   import { gsap, useGSAP, ScrollTrigger, SplitText } from "../lib/gsap";
//
// GSAP 3.13+ is fully free (incl. the former Club plugins), so a plain
// `npm install gsap @gsap/react` covers every plugin below.
//
// Note: GSDevTools and MotionPathHelper are authoring/debug tools — fine in dev,
// but consider dropping them from production imports to keep the bundle lean.
// Note: registration runs at import time (client-side). This app is a Vite CSR SPA,
// so that's safe; if we ever move to SSR (Next), guard registration to the browser.
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce"; // requires CustomEase
import { CustomWiggle } from "gsap/CustomWiggle"; // requires CustomEase
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother"; // requires ScrollTrigger
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(
  useGSAP,
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle
);

// Don't refresh pinned ScrollTriggers on the mobile address-bar show/hide resize
// (it counts as a viewport resize and causes pin jump/thrash). Set once, app-wide.
ScrollTrigger.config({ ignoreMobileResize: true });

export {
  gsap,
  useGSAP,
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle
};
