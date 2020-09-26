import * as $ from "jquery";

export class FadeInOnScrollStaggered {
  constructor() {
    this.initState();
  }

  listen() {
    let thisRef = this;

    thisRef.fadeIn();

    $(window).scroll(() => {
      thisRef.fadeIn();
    });

    $(window).resize(() => {
      thisRef.fadeIn();
    });
  }

  fadeIn() {
    let thisRef = this;
    let delay = 300;

    $(".fade-in-on-scroll-staggered").each((i, parent) => {
      if (thisRef.isInViewport($(parent))) {
        $(parent)
          .find(".staggered-child")
          .each((j, child) => {
            setTimeout(() => {
              $(child).addClass("show");
            }, delay * j);
          });
      }
    });
  }

  isInViewport(el) {
    var bottomOffset = 200;
    var elementTop = el.offset().top;
    var elementBottom = elementTop + el.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height() - bottomOffset;
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  initState() {}
}
