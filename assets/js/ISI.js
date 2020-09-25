import * as $ from "jquery";

export class ISI {
  constructor() {
    this.isi = $("#isi");
    this.stickyIsi = $("#sticky-isi");
    this.scrollPos = 0;
    this.initState();
  }

  listen() {
    let thisRef = this;

    $(window).on("resize scroll", () => {
      thisRef.initState();
    });

    $('.toggle-isi').on('click', () => {
      // Close mobile nav if open
      $('#mobile-nav').removeClass('show');
      $('#main-nav .hamburger').removeClass('is-active');

      // Scroll to top so we always see the header, with as less delay as possible
      $('html, body').animate({ scrollTop: 0 }, 0);
      setTimeout(() => {
        thisRef.stickyIsi.toggleClass('expanded-w-header');
      }, 30);
    });
  }

  initState() {

    var scrollTop = $(window).scrollTop();

    // Shrink after scrolling for 200px
    if (scrollTop >= 200) {
      this.stickyIsi.addClass('shrink');
    }

    if (this.isInViewport()) {
      if (this.stickyIsi.is(':visible')) {
        this.stickyIsi.hide();
      }
    } else {
      if (!this.stickyIsi.is(':visible')) {
        this.stickyIsi.show();
        this.stickyIsi.find('.isi-body').animate({ scrollTop: 0 }, 500); 
      }
    }
  }

  // Check if inline version of ISI is in viewport and not covered by sticky ISI
  isInViewport() {
    var elementTop = this.isi.offset().top;
    var elementBottom = elementTop + this.isi.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom =
      viewportTop + $(window).height() - this.stickyIsi.outerHeight();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  }
}
