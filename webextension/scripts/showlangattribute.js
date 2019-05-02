let btnShowLangAttribute = document.getElementById('btnShowLangAttribute');

function storeShowLangStatus(strStatus) {
	// Get a11y.css stored levels
	let getStatus = browser.storage.local.get("showLangStatus");
	getStatus.then(
		// when we got something
		(item) => {
			if (item && item.showLangStatus) {
				// Get current tab ID
				browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
					// Get current stored value
					let showLangStatus = item.showLangStatus;
					// Add or replace current tab's value
					showLangStatus[tabs[0].id] = {"status": strStatus};
					// Abnd set it back to the storage
					let setting = browser.storage.local.set({ showLangStatus });
					setting.then(null, onError); // just in case
				});
			}
		}
	);
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
	let getStatus = browser.storage.local.get("showLangStatus");
	getStatus.then(
		// when we got something
		function (item) {
			if (item && item.showLangStatus) {
				browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
					// If a setting is found for this tab
					if (item.showLangStatus[tabs[0].id]) {
						btnShowLangAttribute.setAttribute('aria-checked', item.showLangStatus[tabs[0].id].status);
					}
				});
			}
		},
		// we got nothing
		onError
	);
}
showLangOnload();
