import * as $ from "jquery";
import * as Cookie from "js-cookie";

export class EntryModal {
  constructor() {
    this.cookie = $("#cookie");
    this.initState();
  }

  listen() {
    $("#cookie-close").on("click", function () {
      this.cookie.fadeOut();
      Cookies.set("cookie-acked", true);
    });

    this.showCookie();
  }

  showCookie() {
    var cookieShown = Cookies.get("cookie-acked");
    if (!cookieShown) {
      this.cookie.fadeIn();
    }
  }

  initState() {}
}
