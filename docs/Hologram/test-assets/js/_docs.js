// Quand le DOM a fini de charger
document.addEventListener("DOMContentLoaded", function() {
  var bookmarklink = document.getElementById("bookmarklet");

  // On écoute la soumission du formulaire de génération
  if ( bookmarklink ) {
    bookmarklink.addEventListener("submit", function (e) {
      e.preventDefault();

      var $minimum_level = document.getElementById("minimum-level").value;
      var $language = document.getElementById("language").value;

      var $hrefstart = 'javascript:(function(){a11ycss=document.createElement("LINK");a11ycss.href="https://rawgit.com/ffoodd/a11y.css/master/css/a11y-';
      var $hreflang = $language;
      var $hreflevel = '';
      if ($minimum_level !== "advice") {
        $hreflevel = '_' + $minimum_level;
      }
      var $hrefend = '.css";a11ycss.rel="stylesheet";a11ycss.media="(min-width: 800px)";document.body.appendChild(a11ycss);})();';

      var $href = $hrefstart + $hreflang + $hreflevel + $hrefend;

      document.getElementById("bookmarklet--link").setAttribute("href", $href);
      document.getElementById("bookmarklet--link").classList.add("done");
    });

    bookmarklink.addEventListener("change", function () {
      document.getElementById("bookmarklet--link").classList.remove("done");
    });
  }

  // On bricole pour afficher l'ancre active dans le sommaire
  document.getElementById("toc").addEventListener("click", function(e) {
    var $link = e.target;
    var $active = document.querySelector(".active-test");

    if( $active ) {
      $active.removeAttribute("class");
    }

    if( $link.tagName.toLowerCase() === "a" ) {
      $link.classList.add("active-test");
    }
  });

  // On fait pareil au chargement
  function activeAnchor() {
    var $currentHref = document.getElementById("toc").getElementsByTagName("a");
    var $length = $currentHref.length;
    var i = 0;
    for(;i<$length;i++) {
      if(document.location.href.indexOf($currentHref[i].href)>=0) {
        $currentHref[i].classList.add("active-test");
      }
    }
  }

  activeAnchor();
});



