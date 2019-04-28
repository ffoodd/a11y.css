let btnShowLangAttribute = document.getElementById('btnShowLangAttribute');

function storeShowLangStatus(strStatus) {
	let showLangStatus = { status: strStatus };
	let setting = BROWSER.storage.local.set({ showLangStatus });
	setting.then(null, onError); // just in case
}

function showLangAttribute() {
	const code = `
		var oldStylesheet = document.getElementById("${EXTENSION_PREFIX}showlangattribute");
		if ( oldStylesheet ) { oldStylesheet.parentNode.removeChild(oldStylesheet) }
		var stylesheet = document.createElement("link");
		stylesheet.rel = "stylesheet";
		stylesheet.href = ${BROWSER_STRING}.extension.getURL("/css/show-lang.css");
		stylesheet.id = "${EXTENSION_PREFIX}showlangattribute";
		document.getElementsByTagName("head")[0].appendChild(stylesheet);
	`;
	browser.tabs.executeScript({ code: code });
}

function hideLangAttribute() {
	const code = `
		var oldStylesheet = document.getElementById("${EXTENSION_PREFIX}showlangattribute");
		if ( oldStylesheet ) { stylesheet.parentNode.removeChild(oldStylesheet) }
	`;
	browser.tabs.executeScript({ code: code });
}

btnShowLangAttribute.addEventListener('click', function () {
	var checked = this.getAttribute('aria-checked') === 'true' || false;
	if (checked) {
		hideLangAttribute();
	} else {
		showLangAttribute();
	}
	this.setAttribute('aria-checked', !checked);
	storeShowLangStatus(!checked);
});

function showLangOnload() {
	let getShowLangStatus = browser.storage.local.get("showLangStatus");
	getShowLangStatus.then(
		// when we got something
		function (item) {
			if (item && item.showLangStatus && item.showLangStatus.status) {
				btnShowLangAttribute.setAttribute('aria-checked', item.showLangStatus.status);
			}
		},
		// we got nothing
		onError
	);
}
showLangOnload();
