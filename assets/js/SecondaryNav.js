import * as $ from "jquery";

/*
HTML/PUG syntax

section#secondary-nav.secondary-nav
  .container
    .row
      .col-12
        ul
          li #[a(href="#nav-1" data-nav-1) NAV 1]
          li #[a(href="#nav-2" data-nav-2) NAV 2]
          li #[a(href="#nav-3" data-nav-3) NAV 3]
 */

export class SecondaryNav {
  constructor() {
    this.initState();
  }

  listen() {
    $(window).on("scroll", () => {
      this.makeNav();
    });

    $(window).on("resize", () => {
      this.makeNav();
    });
  }

  makeNav() {
    if (!$("#secondary-nav").length) {
      return false;
    }

    // Top offset when it reaches the header
    let topOffset = $("header").outerHeight();

    // Bottom offset when it reaches half height of the viewport
    let bottomOffset = $(window).height() / 2;

    $("section").each((i, el) => {
      let id = $(el).attr("id");
      if (!id) {
        // Bail if section has no id
        return true;
      }

      // Matching secondary nav item
      let nav = $("#secondary-nav").find("[data-" + id);
      if (!nav) {
        // Bail if nav if not found
        return true;
      }

      if (
        $(window).scrollTop() >=
          $(el).offset().top + $(el).outerHeight() - topOffset ||
        $(window).scrollTop() <
          $(el).offset().top - $(window).height() + bottomOffset
      ) {
        // Out of view
        $(el).removeClass("viewing");
        nav.removeClass("active");
      } else if (!$(el).hasClass("viewing")) {
        // If you want only one "viewing" class at all time
        $("section").removeClass("viewing");

        $(el).addClass("viewing");
        if (nav && !nav.hasClass("active")) {
          $("#secondary-nav").find("a.active").removeClass("active");
          nav.addClass("active");
        }
      }
    });
  }

  initState() {
    this.makeNav();

    if ($("#secondary-nav").length) {
      $("body").addClass("has-secondary-nav");
    }
  }
}
