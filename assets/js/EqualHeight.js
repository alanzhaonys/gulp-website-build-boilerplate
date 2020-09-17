import * as $ from "jquery";

export class EqualHeight {
  constructor() {
    this.initState();
  }

  listen() {
      this.resize();

    $(window).on('resize', () => {
      this.resize();
    });
  }

  resize() {
    // Set height for desktop only
    if (window.innerWidth >= 992) {
      $('[data-equal-height]').each((i, el) => {
        var height = $(el).data('equal-height');
        $(el).height(height);
      });
    } else {
      $('[data-equal-height]').each((i, el) => {
        $(el).height('auto');
      });
    }
  }

  initState() {}
}
