import * as $ from "jquery";
import lunr from "lunr/lunr.js";

export class SiteSearch {
  constructor() {
    this.siteSearchForm = $(".site-search-form");
    this.siteSearchButton = $(".site-search-form input[type='submit']");
    this.headerSiteSearchForm = $("header .site-search-form");
    this.initState();
  }

  listen() {
    let thisRef = this;

    $(".search-button").on("click", () => {
      this.show();
    });

    $(window).scroll(() => {
      if (this.siteSearchForm.hasClass("show")) {
        this.hide();
      }
    });

    this.siteSearchButton.on("click", (e) => {
      e.preventDefault();
      let button = $(e.target);
      // Find its parent form
      let form = button.parents('form');
      let keywordsField = form.find(".keywords");
      let keywords = keywordsField.val().trim();
      keywordsField.removeClass("error");
      if (keywords === "") {
        keywordsField.addClass("error");
      } else {
        form.submit();
      }
    });

    this.siteSearchForm.find(".cancel").on("click", () => {
      this.hide();
    });

    // Initiate search on the search page
    if ($("body").hasClass("site-search")) {
      $.getJSON("/search/index.json", function (response) {
        let jsonCount = response.results.length;
        let keywords = thisRef.getUrlParameter("keywords");
        keywords = keywords.trim();
        // Populate keywords in the main search form
        $("main .site-search-form").find("input[name='keywords']").val(keywords);

        if (jsonCount <= 0) {
          alert("Search is not working at the moment. Please try again later.");
          return false;
        }

        if (keywords !== "") {
          let documents = response.results;
          let indexedDocuments = [];
          let searchIndex = lunr(function () {
            this.ref("url");
            this.field("title", { boost: 10 });
            this.field("tags", { boost: 10 });
            this.field("keywords", { boost: 10 });
            this.field("content");
            for (let document of documents) {
              indexedDocuments[document.url] = document;
              this.add({
                url: document.url,
                title: document.title,
                tags: document.tags,
                keywords: document.keywords,
                content: document.content,
              });
            }
          });

          //let results = searchIndex.search(keywords + "*");
          let results = searchIndex.search(keywords);
          let resultDiv = $("#search-results");
          let noResultDiv = $("#search-not-found");

          if (results.length === 0) {
            // Hide results
            resultDiv.hide();
            noResultDiv.show();
          } else {
            // Show results
            resultDiv.empty();
            for (let match of results) {
              let document = indexedDocuments[match.ref];
              //console.log(document);
              let itemHtml =
                '<li><a href="' +
                document.url +
                '"><div class="document-title">' +
                document.title +
                '</div></a><div class="document-description">' + 
                document.description +
                "</div></li>";
              resultDiv.append(itemHtml);
            }
            resultDiv.show();
            noResultDiv.hide();
          }
        }
      });
    }
  }

  getUrlParameter(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, "%20"));
      }
    }
  }

  show() {
    this.headerSiteSearchForm.toggleClass("show");
    let keywordsField = this.headerSiteSearchForm.find(".keywords");
    keywordsField.focus();
  }

  hide() {
    this.headerSiteSearchForm.removeClass("show");
    let keywordsField = this.headerSiteSearchForm.find(".keywords");
    keywordsField.removeClass("error");
    keywordsField.val("");
  }

  initState() {}
}
