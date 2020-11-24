import * as $ from "jquery";

export class Nav {
  constructor() {
    this.distance = 100;
    this.lastScrollTop = $(window).scrollTop();

    this.initState();
  }

  listen() {
    this.makeNav();

    // Hover state for submenu on touch device
    $("#main-nav ul.menu").find("li a").each((i, el) => {
      $(el).on("click", () => {
        let submenu = $(el).parent().find(".submenu");
        if (submenu.length) {
          submenu.toggleClass("hover");
        }
      });
    });

    // Click event for submenu on mobile
    $("#mobile-nav ul.menu").find("li a").each((i, el) => {
      $(el).on("click", () => {
        let submenu = $(el).parent().find(".submenu");
        // If it has submenu
        if (submenu.length) {
          $(el).toggleClass("expanded");
        }
      });
    });

    $(window).on("scroll", () => {
      this.makeNav();
    });

    $(window).on("resize", () => {
      this.makeNav();
    });
  }

  makeNav() {
    // If sticky ISI is open, make header stay when scroll to prevent gap at top
    if ($('#sticky-isi').hasClass('expanded-w-header')) {
      return false;
    }

    var scrollTop = $(window).scrollTop();

    if (scrollTop < this.lastScrollTop) {
      //console.log('going up');
      $("header").removeClass("hide");
      $("body").removeClass("has-hidden-header");
    } else if (scrollTop >= this.lastScrollTop) {
      //console.log('going down');
      if (scrollTop >= this.distance) {
        $("header").addClass("hide");
        $("body").addClass("has-hidden-header");
      }
    }
    this.lastScrollTop = scrollTop;
  }

  initState() {}
}
