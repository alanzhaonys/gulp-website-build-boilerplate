import * as $ from "jquery";
import * as Cookie from "js-cookie";

export class ISI {
  constructor(hamburgerMenu) {
    this.shrinkIsi = true;
    this.persistIsiShink = true;
    this.scrollToShrinkDistance = 200;

    this.hamburgerMenu = hamburgerMenu;
    this.isi = $("#isi");
    this.stickyIsi = $("#sticky-isi");
    this.initState();
  }

  listen() {
    if (!this.stickyIsi.length) {
      return false;
    }

    let thisRef = this;

    $(window).on("resize scroll", () => {
      thisRef.initState();
    });

    //
    // .toggle-isi is used to expand/collapse sticky ISI
    //
    $(".toggle-isi").on("click", () => {
      // Close mobile nav if open
      this.hamburgerMenu.deactivate();

      // Close secondary nav if open
      if ($("#secondary-nav").length) {
        $("#secondary-nav").removeClass("mobile-open");
      }

      // Scroll to top so we always see the header, with as less delay as possible
      $("html, body").animate({ scrollTop: 0 }, 0);

      setTimeout(() => {
        // Toggle the class
        thisRef.stickyIsi.toggleClass("expanded-w-header");

        // .expanded-w-header use 100vh CSS calculation which does not work well with browser bar in mobile
        // thus the *additional* workaround below to set height and min-height manually
        if (thisRef.stickyIsi.hasClass("expanded-w-header")) {
          //
          // Expand it
          //
          let windowHeight = $(window).outerHeight();
          let headerHeight = $("header").outerHeight();
          let cookieHeight = $("#cookie").is(":visible") ? $("#cookie").outerHeight() : 0;
          let secondaryNavHeight = $("#secondary-nav").length ? $("#secondary-nav").outerHeight() : 0;
          let stickyIsiHeight = windowHeight - headerHeight - cookieHeight - secondaryNavHeight;
          let isiHeaderHeight = $(".isi-header").outerHeight();
          let innerStickyIsiHeight = stickyIsiHeight - isiHeaderHeight;

          thisRef.stickyIsi.css({
            height: stickyIsiHeight + "px",
            "min-height": stickyIsiHeight + "px",
          });
          thisRef.stickyIsi.find(".isi-container .isi-body").css({
            height: innerStickyIsiHeight + "px",
            "min-height": innerStickyIsiHeight + "px",
          });
        } else {
          //
          // Collapse it
          //
          thisRef.stickyIsi.removeAttr("style");
          thisRef.stickyIsi
            .find(".isi-container .isi-body")
            .removeAttr("style");
          // Make sure it's shown
          thisRef.stickyIsi.show();
        }
      }, 30);
    });
  }

  initState() {
    if (!this.stickyIsi.length) {
      return false;
    }

    var scrollTop = $(window).scrollTop();

    // Shrink ISI
    if (this.shrinkIsi) {
      let shouldShrink = Cookie.get("isi-shown");
      if (shouldShrink) {
        this.stickyIsi.addClass("shrink");
      } else if (scrollTop >= this.scrollToShrinkDistance) {
        // Shrink after scrolling for 200px
        this.stickyIsi.addClass("shrink");
        Cookie.set("isi-shown", true);
      }
    }

    // Only if inline ISI is enabled
    if (this.isi.length) {
      if (this.isInViewport()) {
        if (this.stickyIsi.is(":visible")) {
          this.stickyIsi.hide();
        }
      } else {
        if (!this.stickyIsi.is(":visible")) {
          this.stickyIsi.show();
          this.stickyIsi.find(".isi-body").animate({ scrollTop: 0 }, 500);
        }
      }
    } else {
      this.stickyIsi.show();
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
