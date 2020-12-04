import * as $ from "jquery";

export class BackToTop {
  constructor() {}

  listen() {
    if ($("footer").length) {
      let backToTopHtml = "<div id='back-to-top' class='section'></div>";
      $(backToTopHtml).insertBefore($("footer"));
    }

    $("#back-to-top").on("click", (e) => {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
  }

  initState() {}
}
