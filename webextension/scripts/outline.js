let btnOutline = document.getElementById('btnOutline');

function addOutline() {
	const code = `
		var oldStylesheet = document.getElementById("${EXTENSION_PREFIX}outline");
		if ( oldStylesheet ) { oldStylesheet.parentNode.removeChild(oldStylesheet) }
		var stylesheet = document.createElement("link");
		stylesheet.rel = "stylesheet";
		stylesheet.href = ${BROWSER_STRING}.extension.getURL("/css/outline.css");
		stylesheet.id = "${EXTENSION_PREFIX}outline";
		document.getElementsByTagName("head")[0].appendChild(stylesheet);
	`;
	BROWSER.tabs.executeScript({ code: code });
}

function removeOutline() {
	const code = `
	var outlineStylesheet = document.getElementById("${EXTENSION_PREFIX}outline");
	if ( outlineStylesheet ) { outlineStylesheet.parentNode.removeChild(outlineStylesheet) }
	`;
	BROWSER.tabs.executeScript({ code: code });
	btnOutline.innerHTML = _t('btnOutline');
	btnOutline.classList.remove('unapply');
	btnOutline.classList.add('apply');
}
/**
 * Helper function for browser storage
 * @param {Boolean} bOutline
 */
function storeOutline(bOutline) {
	let outline = { isSet: bOutline };
	let setting = BROWSER.storage.local.set({ outline });
	setting.then(null, onError); // just in case
}

btnOutline.addEventListener('click', function() {
	addOutline();
});
