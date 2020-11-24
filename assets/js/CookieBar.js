import * as $ from "jquery";
import * as Cookie from "js-cookie";

export class CookieBar {
  constructor() {
    this.delay = 0;
    this.cookie = $("#cookie");
    this.initState();
  }

  listen() {
    $("#cookie-close").on("click", () => {
      this.cookie.fadeOut();
      $("body").removeClass("has-cookie");
      Cookie.set("cookie-acked", true);
    });

    this.showCookie();
  }

  showCookie() {
    var cookieShown = Cookie.get("cookie-acked");
    if (!cookieShown) {
        setTimeout(() => {
        this.cookie.fadeIn();
        $("body").addClass("has-cookie");
      }, this.delay);
    }
  }

  initState() {}
}
