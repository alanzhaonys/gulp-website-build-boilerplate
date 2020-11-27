// https://github.com/GoogleChromeLabs/quicklink
import * as quicklink from "quicklink";

export class Quicklink {
  constructor() {}

  listen() {
    window.addEventListener("load", () => {
      quicklink.listen({
        timeout: 3000,
        // Ignore all requests to:
        //  - all "/downloads/*" pathnames
        //  - all ".pdf" extensions
        //  - all URL hash tags
        //  - all <a> tags with "noprefetch" attribute
        ignores: [
          /\/downloads\/?/,
          (uri) => uri.includes(".pdf"),
          (uri) => uri.includes("#"),
          (uri, elem) => elem.hasAttribute("noprefetch"),
        ],
      });
    });
  }

  initState() {}
}
