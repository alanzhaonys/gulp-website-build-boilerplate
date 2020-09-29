import * as $ from "jquery";

export class SiteSearch {
  constructor() {
    this.siteSearch = $(".site-search");
    this.siteSearchForm = $(".site-search-form");
    this.initState();
  }

  listen() {
    $(".search-button").on("click", () => {
      this.show();
    });

    $(window).scroll(() => {
      if (this.siteSearch.hasClass("show")) {
        this.hide();
      }
    });

    this.siteSearchForm.on("submit", (e) => {
      let form = $(e.target);
      let keywordsField = form.find(".keywords");
      let keywords = keywordsField.val().trim();
      keywordsField.removeClass("error");
      if (keywords === "") {
        keywordsField.addClass("error");
        e.preventDefault();
      } else {
        form.submit();
      }
    });

    this.siteSearchForm.find(".cancel").on("click", () => {
      this.hide();
    });
  }

  show() {
    this.siteSearch.toggleClass("show");
    let keywordsField = this.siteSearchForm.find(".keywords");
    keywordsField.focus();
  }

  hide() {
    this.siteSearch.removeClass("show");
    let keywordsField = this.siteSearchForm.find(".keywords");
    keywordsField.removeClass("error");
    keywordsField.val("");
  }

  initState() {}
}
