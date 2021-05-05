// typical import
//import gsap from "gsap";

// or get other plugins:
//import Draggable from "gsap/Draggable";
//import ScrollTrigger from "gsap/ScrollTrigger";

// or all tools are exported from the "all" file (excluding bonus plugins):
import { gsap, ScrollTrigger } from "gsap/all";

export class GSAP {
  constructor() {}

  listen() {
    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-container",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        // base vertical scrolling on how wide the container is so it feels more natural.
        end: () =>
          "+=" + document.querySelector(".scroll-container").offsetWidth,
      },
    });
  }

  initState() {}
}
