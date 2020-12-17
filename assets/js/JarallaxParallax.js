import * as $ from "jquery";
import { jarallax, jarallaxVideo } from "jarallax";


export class JarallaxParallax {
  constructor() {
    this.initState();
  }

  listen() {

    // For video(you have to call this first)
    jarallaxVideo();

    // For image
    jarallax(document.querySelectorAll('.jarallax'), {});
  }

  initState() {}
}
