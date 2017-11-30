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
	console.log(code)
	BROWSER.tabs.executeScript({ code: code });
	btnOutline.innerHTML = _t('btnOutlineRemove');
}

function removeOutline() {
	const code = `
	var outlineStylesheet = document.getElementById("${EXTENSION_PREFIX}outline");
	if ( outlineStylesheet ) { outlineStylesheet.parentNode.removeChild(outlineStylesheet) }
	`;
	BROWSER.tabs.executeScript({ code: code });
	btnOutline.innerHTML = _t('btnOutline');
}
/**
 * Helper function for browser storage
 * @param {Boolean} bOutline 
 */
function storeOutline(bOutline) {
	let outline = { isSet: bOutline }
	let setting = browser.storage.local.set({ outline });
	setting.then(null, onError); // just in case
}

btnOutline.addEventListener('click', function() {
	let gettingItem = browser.storage.local.get("outline");
	gettingItem.then(
		// when we got something
		function (item) {
			console.log('item.outline.isSet', item.outline.isSet);
			if (item.outline.isSet) { // the outline was shown already
				removeOutline();
				storeOutline(false);
			} else {
				addOutline();
				storeOutline(true);
			}
		},
		// we got nothing
		function () {
			addOutline();
			storeOutline(true);
		}
	);
});

// in case we already had stored something and want to go back to the state we had
function outlineCheckAtLoad() {
	let gettingItem = browser.storage.local.get("outline");
	gettingItem.then(
		// when we got something
		function (item) {
			console.log('item.outline.isSet at load', item.outline.isSet);
			if (item.outline.isSet) { // the outline was shown already
				addOutline();
			}
		},
		// we got nothing
		onError
	);
}
outlineCheckAtLoad();