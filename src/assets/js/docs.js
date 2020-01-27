function activeAnchor (toc) {
  var toc = toc || document.getElementById('toc');
  var currentHref = toc.getElementsByTagName('a');

  for (i = 0; i < currentHref.length; i++) {
    if (document.location.href.indexOf(currentHref[i].href) >= 0) {
      currentHref[i].classList.add('active-test');
    }
  }
}

function handleTocClick (event) {
  var link = event.target;
  var active = document.querySelector('.active-test');

  if (active) {
    active.removeAttribute('class');
  }

  if (link.tagName.toLowerCase() === 'a') {
    link.classList.add('active-test');
  }
}

// Quand le DOM a fini de charger
document.addEventListener('DOMContentLoaded', function() {
  // On bricole pour afficher l’ancre active dans le sommaire
  var toc = document.getElementById('toc');
  if (toc) {
    toc.addEventListener('click', handleTocClick);
    activeAnchor(toc);
  }
});
