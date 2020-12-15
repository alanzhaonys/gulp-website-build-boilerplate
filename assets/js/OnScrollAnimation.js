import * as $ from "jquery";

export class OnScrollAnimation {
  constructor() {
    this.initState();
  }

  listen() {
    this.animate();

    $(window).scroll(() => {
      this.animate();
    });

    $(window).resize(() => {
      this.animate();
    });
  }

  animate() {
    $(".on-scroll-animation").each((i, el) => {
      if ($(el).hasClass("on-scroll-animated")) {
        return true;
      }

      let animation = $(el).data("on-scroll-animation");
      let offset = $(el).data("on-scroll-offset");
      let delay = $(el).data("on-scroll-delay");

      if (!animation) {
        return true;
      }

      if (offset) {
        if (offset[offset.length - 1] === "%") {
          offset = $(window).height() * (parseFloat(offset.replace("%")) / 100)
        } else if (offset.isInteger()) {
          offset = parseInt(offset);
        }
      } else {
        offset = $(window).height() / 4;
      }

      if (!delay) {
        delay = 0;
      }

      if (this.isInViewport($(el), offset)) {
        setTimeout(() => {
          $(el).addClass("on-scroll-" + animation);
          $(el).addClass("on-scroll-animated");
        }, delay);
      }
    });
  }

  isInViewport(el, offset) {
    var elementTop = el.offset().top;
    var elementBottom = elementTop + el.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height() - offset;
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  initState() {}
}
