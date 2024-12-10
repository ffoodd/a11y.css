function Toc() {
	const toc = document.getElementById('toc')

	if (!toc) {
		return
	}

	const tocLink = toc.querySelector('a[aria-current]')

	function setActiveTocLink() {
		const activeTocLink = toc.querySelector(`a[href="${document.location.hash}"]`)

		if (!activeTocLink) {
			return
		}

		tocLink.removeAttribute('aria-current')
		activeTocLink.setAttribute('aria-current', 'true')
	}

	setActiveTocLink()

	window.addEventListener('hashchange', setActiveTocLink)
}

document.addEventListener('DOMContentLoaded', Toc)
