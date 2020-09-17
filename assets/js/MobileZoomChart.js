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

    // For single chart
    if (window.innerWidth <= 992) {
      $(".zoom-chart").click(function (e, el) {
        // Remove existing chart modal in DOM if any
        $("#chart-modal").remove();

        let target = $("#" + $(this).data("target"));
        let chart = target.find(".chart-img.d-block");
        var modal =
          '<div id="chart-modal"><div class="chart-img-wrapper"><img src="' +
          chart.attr("src") +
          '"/></div></div>';
        $("body").append(modal);

        $("#chart-modal").click(function () {
          $(this).remove();
        });
      });
    }
  }

  initState() {
    this.makeModal();
  }
}
