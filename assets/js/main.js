import * as $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { ISI } from "./ISI";

$(document).ready(function() {
  let isi = new ISI();
  isi.listen();
});
