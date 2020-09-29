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
        let submenu1 = $(el).parent().find(".submenu1");
        if (submenu1.length) {
          submenu1.toggleClass("hover");
        }
      });
    });

    // Click event for submenu on mobile
    $("#mobile-nav ul.menu").find("li a").each((i, el) => {
      $(el).on("click", () => {
        let submenu1 = $(el).parent().find(".submenu1");
        // If it has submenu
        if (submenu1.length) {
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
    } else if (scrollTop >= this.lastScrollTop) {
      //console.log('going down');
      if (scrollTop >= this.distance) {
        $("header").addClass("hide");
      }
    }
    this.lastScrollTop = scrollTop;
  }

  initState() {}
}
