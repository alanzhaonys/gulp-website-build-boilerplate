import * as $ from "jquery";

import { Nav } from "./Nav";
import { ISI } from "./ISI";
import { EntryModal } from "./EntryModal";
import { Cookie } from "./Cookie";
import { HamburgerMenu } from "./HamburgerMenu";
import { SmoothScrolling } from "./SmoothScrolling";
import { EqualHeight } from "./EqualHeight";
import { FadeInOnScroll } from "./FadeInOnScroll";
import { MobileZoomChart } from "./MobileZoomChart";
import lozad from 'lozad';

// Polyfill - WTF is IE11 doing
if (typeof NodeList.prototype.forEach !== 'function')  {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

$(document).ready(function() {

  // Initialize lozad
  const observer = lozad();
  observer.observe();

  // Initialize other components

  let nav = new Nav();
  nav.listen();

  let isi = new ISI();
  isi.listen();

  let entryModal = new EntryModal();
  entryModal.listen();

  let cookie = new Cookie();
  cookie.listen();

  let hamburgerMenu = new HamburgerMenu();
  hamburgerMenu.listen();

  let smoothScrolling = new SmoothScrolling();
  smoothScrolling.listen();

  let equalHeight = new EqualHeight();
  equalHeight.listen();

  let fadeInOnScroll = new FadeInOnScroll();
  fadeInOnScroll.listen();

  let mobileZoomChart = new MobileZoomChart();
  mobileZoomChart.listen();
});
