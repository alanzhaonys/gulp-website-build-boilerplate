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
        // On-page links
        if (
          location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length
            ? target
            : $("[name=" + this.hash.slice(1) + "]");

          let currentScrollTop = $(window).scrollTop();
          let targetScrollTop = target.offset().top;
          let offset = 0;

          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();

            //
            // Determine offset here because of the damn sticky subnavs
            //
            if (
              $("header").hasClass("sticky") &&
              currentScrollTop - targetScrollTop > 0
            ) {
              // Scroll is going up
              offset = $("header").height();
              //console.log("need to go up");
            } else if ($(".internal-nav").length > 0) {
              // Scroll is going down
              offset = $("header").height();
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
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        scrollSpeed
      );
    }
  }
}
