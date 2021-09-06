function Toc () {
  const toc = document.getElementById('toc')

  if (!toc) {
    return
  }

  const tocLinks = toc.querySelectorAll('a')

  function setActiveTocLink () {
    const activeTocLink = toc.querySelector(`a[href="${document.location.hash}"]`)

    if (!activeTocLink) {
      return
    }

    tocLinks.forEach(link => link.removeAttribute('aria-current'))
    activeTocLink.setAttribute('aria-current', 'true')
  }

  setActiveTocLink()

  window.addEventListener('hashchange', setActiveTocLink)
}

document.addEventListener('DOMContentLoaded', Toc)
