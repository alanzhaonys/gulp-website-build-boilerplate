import * as $ from "jquery";

import { Nav } from "./Nav";
import { SecondaryNav } from "./SecondaryNav";
import { ISI } from "./ISI";
import { EntryModal } from "./EntryModal";
import { CookieBar } from "./CookieBar";
import { HamburgerMenu } from "./HamburgerMenu";
import { SiteSearch } from "./SiteSearch";
import { Clipboard } from "./Clipboard";
import { SmoothScrolling } from "./SmoothScrolling";
import { EqualHeight } from "./EqualHeight";
import { BlurCtaOnScroll } from "./BlurCtaOnScroll";
import { FadeInOnScroll } from "./FadeInOnScroll";
import { FadeInOnScrollStaggered } from "./FadeInOnScrollStaggered";
import { OnScrollAnimation } from "./OnScrollAnimation";
import { ScrollingNumbers } from "./ScrollingNumbers";
import { MobileZoomChart } from "./MobileZoomChart";
import lozad from "lozad";
import { Quicklink } from "./Quicklink";
import { BackToTop } from "./BackToTop";

// Polyfill - WTF is IE11 doing
if (typeof NodeList.prototype.forEach !== "function") {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

if (typeof Object.assign != "function") {
  Object.assign = function (target) {
    if (target == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

// Global
$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(document).ready(function () {
  // Start from top after page reload for better parallax experience
  // After document is ready

  /*
  $("html, body").scrollTop(0);
  // After load event
  $(window).on("load", function () {
    setTimeout(function () {
      $("html, body").scrollTop(0);
    }, 0);
  });
  */

  //
  // Register service worker
  // https://developers.google.com/web/tools/workbox/guides/get-started
  //

  // Check that service workers are supported, uncomment for PWA
  /*
  if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });
  }
  */

  // Initialize lozad
  const observer = lozad();
  observer.observe();

  // Initialize other components

  // Turn on quicklink for production, avoid it for http://localhost dev
  // as it causes issue with BrowserSync
  if (location.hostname !== "localhost") {
    let quicklink = new Quicklink();
    quicklink.listen();
  }

  let nav = new Nav();
  nav.listen();

  let secondaryNav = new SecondaryNav();
  secondaryNav.listen();

  let entryModal = new EntryModal(() => {
    // Callback to show cookie bar after bypassing the entry modal
    let cookieBar = new CookieBar();
    cookieBar.listen();
  });
  entryModal.listen();

  let hamburgerMenu = new HamburgerMenu();
  hamburgerMenu.listen();

  let siteSearch = new SiteSearch();
  siteSearch.listen();

  let clipboard = new Clipboard();
  clipboard.listen();

  let isi = new ISI(hamburgerMenu);
  isi.listen();

  let smoothScrolling = new SmoothScrolling();
  smoothScrolling.listen();

  let equalHeight = new EqualHeight();
  equalHeight.listen();

  let blurCtaOnScroll = new BlurCtaOnScroll();
  blurCtaOnScroll.listen();

  let fadeInOnScroll = new FadeInOnScroll();
  fadeInOnScroll.listen();

  let fadeInOnScrollStaggered = new FadeInOnScrollStaggered();
  fadeInOnScrollStaggered.listen();

  let onScrollAnimation = new OnScrollAnimation();
  onScrollAnimation.listen();

  let scrollingNumbers = new ScrollingNumbers();
  scrollingNumbers.listen();

  let mobileZoomChart = new MobileZoomChart();
  mobileZoomChart.listen();

  let backToTop = new BackToTop();
  backToTop.listen();
});
