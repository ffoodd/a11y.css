function getFileName () {
  var base = 'https://rawgit.com/ffoodd/a11y.css/master/css/';
  var prefix = 'a11y-';
  var lang = document.getElementById('language').value || 'en';
  var level = document.getElementById('minimum-level').value || 'advice';
  var extension = '.css';

  if (level !== 'advice') {
    level = '_' + level;
  } else {
    level = '';
  }

  return base + prefix + lang + level + extension;
}

function getBookmarkletContent () {
  return [
    'javascript:',
      '(function(){',
        'a11ycss=document.createElement("LINK");',
        'a11ycss.href="' + getFileName() + '";',
        'a11ycss.rel="stylesheet";',
        'a11ycss.media="all";',
        'document.body.appendChild(a11ycss);',
      '})();'
  ].join('');
}

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

function handleFormSubmit (event) {
  event.preventDefault();

  var link = document.getElementById('bookmarklet--link');
  link.setAttribute('href', getBookmarkletContent());
  link.classList.add('done');
}

function handleFormChange () {
  var link = document.getElementById('bookmarklet--link');
  link.classList.remove('done');
}

// Quand le DOM a fini de charger
document.addEventListener('DOMContentLoaded', function() {
  // On écoute la soumission du formulaire de génération
  var bookmarklink = document.getElementById('bookmarklet');
  if (bookmarklink) {
    bookmarklink.addEventListener('submit', handleFormSubmit);
    bookmarklink.addEventListener('change', handleFormChange);
  }

  // On bricole pour afficher l’ancre active dans le sommaire
  var toc = document.getElementById('toc');
  if (toc) {
    toc.addEventListener('click', handleTocClick);
    activeAnchor(toc);
  }
});
