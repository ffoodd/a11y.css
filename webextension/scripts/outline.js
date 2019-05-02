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
	browser.tabs.executeScript({ code: code });
}

function removeOutline() {
	const code = `
	var outlineStylesheet = document.getElementById("${EXTENSION_PREFIX}outline");
	if ( outlineStylesheet ) { outlineStylesheet.parentNode.removeChild(outlineStylesheet) }
	`;
	browser.tabs.executeScript({ code: code });
}

function storeOutlineStatus(strStatus) {
	// Get a11y.css stored levels
	let getStatus = browser.storage.local.get("outlineStatus");
	getStatus.then(
		// when we got something
		(item) => {
			if (item && item.outlineStatus) {
				// Get current tab ID
				browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
					// Get current stored value
					let outlineStatus = item.outlineStatus;
					// Add or replace current tab's value
					outlineStatus[tabs[0].id] = {"status": strStatus};
					// Abnd set it back to the storage
					let setting = browser.storage.local.set({ outlineStatus });
					setting.then(null, onError); // just in case
				});
			}
		}
	);
}

btnOutline.addEventListener('click', function() {
	var checked = this.getAttribute('aria-checked') === 'true' || false;
	if (checked) {
		removeOutline();
	} else {
		addOutline();
	}
	this.setAttribute('aria-checked', !checked);
	storeOutlineStatus(!checked);
});

function outlineOnload() {
	let getStatus = browser.storage.local.get("outlineStatus");
	getStatus.then(
		// when we got something
		function (item) {
			if (item && item.outlineStatus) {
				browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
					// If a setting is found for this tab
					if (item.outlineStatus[tabs[0].id]) {
						btnOutline.setAttribute('aria-checked', item.outlineStatus[tabs[0].id].status);
					}
				});
			}
		},
		// we got nothing
		onError
	);
}
outlineOnload();
