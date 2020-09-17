import * as $ from "jquery";

export class FadeInOnScroll {
  constructor() {
    this.initState();
  }

  listen() {
    this.fadeIn();

    $(window).scroll(() => {
      this.fadeIn();
    });

    $(window).resize(() => {
      this.fadeIn();
    });
  }

  fadeIn() {
    let thisRef = this;
    let delay = 300;

    $(".fade-in-on-scroll-staggered").each(() => {
      if (thisRef.isInViewport($(this))) {
        $(this)
          .find(".staggered-child")
          .each((i, child) => {
            setTimeout(() => {
              $(child).addClass("show");
            }, delay * i);
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
