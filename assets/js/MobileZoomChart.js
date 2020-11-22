import * as $ from "jquery";

export class MobileZoomChart {
  constructor() {
    this.initState();
  }

  listen() {
    let thisRef = this;

    $(window).on("resize", () => {
      thisRef.makeModal();
    });
  }

  makeModal() {
    // .zoom-chart is a button with data-target attribute
    // data-target is the id of the chart container
    $(".zoom-chart").unbind("click");

    if (window.innerWidth <= 992) {
      $(".zoom-chart").each((i, el) => {
        $(el).on("click", () => {
          // Remove existing chart modal in DOM if any
          $("#chart-modal").remove();

          let target = $("#" + $(el).data("target"));
          let chart = target.find(".chart-img-mb");
          let chartSrc = chart.data("src") ? chart.data("src") : chart.attr("src");
          var modal =
            '<div id="chart-modal"><div class="chart-img-wrapper"><img src="' +
            chartSrc +
            '"/></div></div>';
          $("body").append(modal);

          // Click event after initiation
          $("#chart-modal").on("click", () => {
            $("#chart-modal").remove();
          });
        });
      });
    } else if ($("#chart-modal").length) {
      $("#chart-modal").remove();
    }
  }

  initState() {
    this.makeModal();
  }
}
