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
	let outlineStatus = { status: strStatus };
	let setting = BROWSER.storage.local.set({ outlineStatus });
	setting.then(null, onError); // just in case
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
	let getOutlineStatus = browser.storage.local.get("outlineStatus");
	getOutlineStatus.then(
		// when we got something
		function (item) {
			if (item && item.outlineStatus && item.outlineStatus.status) {
				btnOutline.setAttribute('aria-checked', item.outlineStatus.status);
			}
		},
		// we got nothing
		onError
	);
}
outlineOnload();
