import * as $ from "jquery";
import * as Cookie from "js-cookie";

export class EntryModal {
  constructor() {
    this.entryModal = $("#entry-modal");
    this.initState();
  }

  listen() {
    let thisRef = this;

    $('#enter-btn').on('click', () => {
      thisRef.entryModal.fadeOut();
      Cookie.set('entry-modal-shown', true);
    });
  }

  initState() {
    let entryModalShown = Cookie.get('entry-modal-shown');
    if (!entryModalShown) {
      this.entryModal.fadeIn();
    }
  }
}
