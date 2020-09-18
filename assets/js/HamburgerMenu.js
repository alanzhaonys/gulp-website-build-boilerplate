import * as $ from "jquery";

export class HamburgerMenu {
  constructor() {
    this.hamburgerIcon = $(".hamburger");
    this.mobileNav = $("#mobile-nav");
    this.initState();
  }

  listen() {
    let thisRef = this;

    thisRef.hamburgerIcon.on("click", () => {
      if (thisRef.hamburgerIcon.hasClass("is-active")) {
        thisRef.deactivate();
      } else {
        thisRef.activate();
      }
    });

    $(window).scroll(() => {
      if (thisRef.hamburgerIcon.hasClass("is-active")) {
        thisRef.deactivate();
      }
    });
  }

  activate() {
    this.hamburgerIcon.addClass("is-active");
    this.hamburgerIcon.attr("aria-expanded", "true");
    this.mobileNav.addClass("show");
  }

  deactivate() {
    this.hamburgerIcon.removeClass("is-active");
    this.hamburgerIcon.attr("aria-expanded", "false");
    this.mobileNav.removeClass("show");
  }

  initState() {}
}