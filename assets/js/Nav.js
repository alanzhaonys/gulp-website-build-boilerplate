import * as $ from "jquery";

export class Nav {
  constructor() {
    this.initState();
  }

  listen() {
    let distance = 100;
    let lastScrollTop = $(window).scrollTop();

    function makeNav() {
      var scrollTop = $(window).scrollTop();

      if (scrollTop < lastScrollTop) {
        //console.log('going up');
        $("header").removeClass("hide");
      } else if (scrollTop >= lastScrollTop) {
        //console.log('going down');
        if (scrollTop >= distance) {
          $("header").addClass("hide");
        }
      }
      lastScrollTop = scrollTop;
    }

    makeNav();

    $(window).on("scroll", () => {
      makeNav();
    });

    $(window).on("resize", () => {
      makeNav();
    });
  }

  initState() {}
}
