import * as $ from "jquery";

export class SmoothScrolling {
  constructor() {}

  listen() {
    let scrollSpeed = 800;

    //
    // https://css-tricks.com/snippets/jquery/smooth-scrolling/
    //
    // with modifications

    // On click
    // Select all links with hashes
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').unbind("click");
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click((event) => {
        let clicked = event.target;
        // On-page links
        if (
          location.pathname.replace(/^\//, "") ==
            clicked.pathname.replace(/^\//, "") &&
          location.hostname == clicked.hostname
        ) {
          // Figure out element to scroll to
          var target = $(clicked.hash);
          target = target.length
            ? target
            : $("[name=" + clicked.hash.slice(1) + "]");

          let currentScrollTop = $(window).scrollTop();
          let targetScrollTop = target.offset().top;
          let offset = 0;

          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();

            //
            // Determine offset here
            //

            // Typical offset for sticky nav
            //offset = $("header").height();

            let headerHeight = $("header").outerHeight();
            let cookieHeight = $("#cookie").is(":visible") ? $("#cookie").outerHeight() : 0;
            let secondaryNavHeight = $("#secondary-nav").length ? $("#secondary-nav").outerHeight() : 0;

            if (currentScrollTop - targetScrollTop > 0) {
              // Scroll is going up
              // Special logic here
              offset = headerHeight + cookieHeight + secondaryNavHeight;
            } else {
              // Scroll is going down
              // Speical logic here
              offset = cookieHeight + secondaryNavHeight;
            }

            $("html, body").animate(
              {
                scrollTop: target.offset().top - offset - 1,
              },
              scrollSpeed,
              () => {
                // Callback after animation
                // Add hash (#) to URL when done scrolling (default click behavior)
                //window.location.hash = target.attr("id");
                // Must change focus!
                /*
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                  // Checking if the target was focused
                  return false;
                } else {
                  $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                  $target.focus(); // Set focus again
                }*/
              }
            );
          } else {
            return false;
          }
        }
      });

    // On load
    let hash = window.location.hash;
    if (hash.length && $(hash).length) {
      // Typical offset for sticky nav
      let offset = $("header").height();

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - offset - 1,
        },
        scrollSpeed
      );
    }
  }
}
