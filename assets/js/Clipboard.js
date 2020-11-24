import $ from "jquery";

// Clipboard
import ClipboardJS from "clipboard/src/clipboard.js";

// Tooltip
import tippy from "tippy.js";
//import "tippy.js/dist/tippy.css";

// Tooltip animation
//import "tippy.js/dist/backdrop.css";
//import "tippy.js/animations/shift-away.css";

export class Clipboard {
  constructor() {
    this.initState();
  }

  listen() {
    this.makeClipboard();
  }

  makeClipboard() {
    // Clipboard copy button
    var clipboardHtml = '<div class="clipboard">';
    clipboardHtml +=
      '<button class="clipboard-btn btn btn-secondary btn-small">';
    clipboardHtml += "Copy";
    clipboardHtml += "</button>";
    clipboardHtml += "</div>";

    // Add clipboard button
    $("kbd").each(function () {
      $(this).before(clipboardHtml);
    });

    $("code").each(function () {
      $(this).before(clipboardHtml);
    });

    // Initialze clipboard
    var clipboard = new ClipboardJS(".clipboard-btn", {
      target: function (trigger) {
        return trigger.parentElement.nextElementSibling;
      },
    });

    // Tooltip
    tippy(".clipboard-btn", {
      appendTo: "parent",
      content: "Copied",
      animation: "shift-away",
      duration: 500,
      delay: 10,
      placement: "bottom-end",
      trigger: "click",
      hideOnClick: false,
      onShow: (instance) => {
        setTimeout(() => {
          instance.hide();
        }, 1000);
      },
    });

    // After copy
    clipboard.on("success", function (e) {
      //console.info('Action:', e.action);
      //console.info('Text:', e.text);
      //console.info('Trigger:', e.trigger);

      // De-select
      e.clearSelection();
    });
  }

  initState() {}
}
