import * as $ from "jquery";

export class BlurCtaOnScroll {
  constructor() {
    this.initState();
  }

  listen() {
    this.blur();

    $(window).scroll(() => {
      this.blur();
    });

    $(window).resize(() => {
      this.blur();
    });
  }

  blur() {
    $(".blur-cta").each((i, el) => {
      if (this.isInViewport($(el))) {
        $(el).addClass('blur-in');
      }      
    });
  }

  isInViewport(el) {
    var elementTop = el.offset().top;
    var elementBottom = elementTop + el.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height() - $(window).height() / 8;
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  initState() {}
}
