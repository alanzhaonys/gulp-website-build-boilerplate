import * as $ from "jquery";

export class Nav {
  constructor() {
    this.distance = 100;
    this.lastScrollTop = $(window).scrollTop();

    this.initState();
  }

  listen() {
    this.makeNav();

    $(window).on("scroll", () => {
      this.makeNav();
    });

    $(window).on("resize", () => {
      this.makeNav();
    });
  }

  makeNav() {
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
