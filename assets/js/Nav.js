import * as $ from "jquery";

export class Nav {
  constructor() {
    this.distance = 100;
    this.lastScrollTop = $(window).scrollTop();

    this.initState();
  }

  listen() {
    this.makeNav();

    $("#main-nav ul.menu").find("li a").each((i, el) => {
      $(el).on("click", () => {
        let submenu1 = $(el).parent().find(".submenu1");
        submenu1.toggleClass("hover");
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
