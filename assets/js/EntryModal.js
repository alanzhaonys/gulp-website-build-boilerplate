import * as $ from "jquery";
import * as Cookie from "js-cookie";

export class EntryModal {
  constructor(callback) {
    this.entryModal = $("#entry-modal");
    this.callback = callback;
    this.initState();
  }

  listen() {
    let thisRef = this;

    $('#enter-btn').on('click', () => {
      thisRef.entryModal.fadeOut();
      $("body").removeClass("has-entry-modal");
      Cookie.set('entry-modal-shown', true);

      this.callback();
    });
  }

  initState() {
    let entryModalShown = Cookie.get('entry-modal-shown');
    if (!entryModalShown) {
      this.entryModal.fadeIn();
      $("body").addClass("has-entry-modal");
    } else {
      this.callback();
    }
  }
}
