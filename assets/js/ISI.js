import * as $ from "jquery";

export class ISI {
  constructor() {
    this.isi = $("#isi");
    this.stickyIsi = $("#sticky-isi");
    this.isSticky = true;
    this.scrollPos = 0;
    this.initState();
  }

  listen() {
    let thisRef = this;

    $(window).on("resize scroll", () => {
      thisRef.initState();
    });

    $('.expand-isi').on('click', () => {
      $('html, body').animate({ scrollTop: thisRef.isi.offset().top }, 1000);
      thisRef.scrollPos = $(window).scrollTop();
    });

    $('.collapse-isi').on('click', () => {
      $('html, body').animate({ scrollTop: thisRef.scrollPos }, 1000); 
    });
  }

  initState() {
    if (this.isInViewport()) {
      //console.log("I am in viewport");
      $("#sticky-isi").hide();
      this.isSticky = false;
    } else {
      //console.log("I am not in viewport");
      $("#sticky-isi").show();
      this.isSticky = true;
    }
  }

  isInViewport() {
    var elementTop = this.isi.offset().top;
    var elementBottom = elementTop + this.isi.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom =
      viewportTop + $(window).height() - this.stickyIsi.outerHeight();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  }
}
