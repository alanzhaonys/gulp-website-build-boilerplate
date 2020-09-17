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
  }

  fadeIn() {
    $(".fade-in-on-scroll").each((i, el) => {
      if ($(el).css("opacity") > 0) {
        return true;
      }

      if (this.isInViewport($(el))) {
        $(el).addClass('show');
      }      
    });
  }

  isInViewport(el) {
    var elementTop = el.offset().top;
    var elementBottom = elementTop + el.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height() - $(window).height() / 4;
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  initState() {}
}
