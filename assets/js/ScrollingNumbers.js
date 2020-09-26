import * as $ from "jquery";

export class ScrollingNumbers {
  constructor() {
    this.initState();
  }

  listen() {
    let thisRef = this;

    thisRef.scroll();

    $(window).resize(() => {
      //thisRef.scroll();
    });
  }

  scroll() {
    let thisRef = this;

    $(".scrolling-numbers").each((i, parent) => {

      if (thisRef.isInViewport($(parent))) {
        let children = $(parent).find(".scrolling-number");
        let speed = $(parent).data('speed');

        for (let j = 0; j < children.length; j++) {
          let child = children[j];
          let delay = $(child).data("delay");
          let min = $(child).data("min");
          let max = $(child).data("max");
          let increment = $(child).data("increment");

          setTimeout(() => {
            let num = min;
            let interval = setInterval(() => {
              if (num >= max) {
                clearInterval(interval);
                num = max;
              }

              $(child).text(num);
              num += increment;
            }, speed);
          }, delay);
        }
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
