import * as $ from "jquery";
import * as Cookie from "js-cookie";

export class CookieBar {
  constructor() {
    this.delay = 3000;
    this.cookie = $("#cookie");
    this.initState();
  }

  listen() {
    $("#cookie-close").on("click", () => {
      this.cookie.fadeOut();
      Cookie.set("cookie-acked", true);
    });

    this.showCookie();
  }

  showCookie() {
    var cookieShown = Cookie.get("cookie-acked");
    if (!cookieShown) {
        setTimeout(() => {
        this.cookie.fadeIn();
      }, this.delay);
    }
  }

  initState() {}
}
