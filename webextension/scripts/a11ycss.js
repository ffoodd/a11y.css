// collection of radio buttons
let level = document.getElementsByName('level');
let button = document.getElementById("a11ycssBtnApply");

/**
 * Helper function for browser storage
 * @param {String} strLevel
 */
function storeA11ycss(strLevel) {
	// Get current tab ID
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		let a11ycssLevel = [];
		// Get a11y.css stored levels
		let getLevel = browser.storage.local.get("a11ycssLevel");
		getLevel.then(
			// when we got something
			(item) => {
				if (item && item.a11ycssLevel) {
					let a11ycssLevel = item.a11ycssLevel;
				}
			}
		);
		// Add or replace current tab's value
		a11ycssLevel[tabs[0].id] = {"level": strLevel};
		// And set it back to the storage
		let setting = browser.storage.local.set({ a11ycssLevel });
		setting.then(null, onError); // just in case
	});
}

// store choice when one radio button is chosen
level.forEach(function (key) {
	key.addEventListener('click', function (event) {
		storeA11ycss(event.target.value);
	});
});


// --------------------------------------
function addA11ycss() {
	let currentLevel = '';
	level.forEach(function (key) {
		if (key.checked == true) {
			currentLevel = key.value;
		}
	});
	const file = `/css/a11y-${locale}_${currentLevel}.css`;
	const code = `
		var oldStylesheet = document.getElementById("${EXTENSION_PREFIX}stylechecker");
		if ( oldStylesheet ) { stylesheet.parentNode.removeChild(oldStylesheet) }
		var stylesheet = document.createElement("link");
		stylesheet.rel = "stylesheet";
		stylesheet.href = ${BROWSER_STRING}.extension.getURL("${file}");
		stylesheet.id = "${EXTENSION_PREFIX}stylechecker";
		document.getElementsByTagName("head")[0].appendChild(stylesheet);
	`;
	console.log(code);
	browser.tabs.executeScript({ code: code });
}

function removeA11ycss() {
	const code = `
		var oldStylesheet = document.getElementById("${EXTENSION_PREFIX}stylechecker");
		if ( oldStylesheet ) { stylesheet.parentNode.removeChild(oldStylesheet) }
	`;
	browser.tabs.executeScript({ code: code });
}

function storeStatus(strStatus) {
	// Get current tab ID
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		let a11ycssStatus = [];
		// Get a11y.css stored levels
		let getStatus = browser.storage.local.get("a11ycssStatus");
		getStatus.then(
			// when we got something
			(item) => {
				if (item && item.a11ycssStatus) {
					let a11ycssStatus = item.a11ycssStatus;
				}
			}
		);
		// Add or replace current tab's value
		a11ycssStatus[tabs[0].id] = {"status": strStatus};
		// And set it back to the storage
		let setting = browser.storage.local.set({ a11ycssStatus });
		setting.then(null, onError); // just in case
	});
}

button.addEventListener('click', function () {
	var checked = this.getAttribute('aria-checked') === 'true' || false;
	if (checked) {
		removeA11ycss();
		storeStatus('false');
	} else {
		addA11ycss();
		storeStatus('true');
	}
	this.setAttribute('aria-checked', !checked);
});
// --------------------------------------

// on document load, if we have already chosen a level, give it back
// (the first option is checked in the popup's HTML by default)
function a11ycssOnload() {
	let getLevel = browser.storage.local.get("a11ycssLevel");
	getLevel.then(
		// when we got something
		(item) => {
			if (item && item.a11ycssLevel) {
				// Get current tab ID
				browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
					// If a setting is found for this tab
					if (item.a11ycssLevel[tabs[0].id]) {
						// a level was set already
						level.forEach(function (key) {
							if (key.value === item.a11ycssLevel[tabs[0].id].level) {
								key.checked = true;
							} else {
								key.checked = false;
							}
						});
					}
				});
			}
		},
		// we got nothing
		onError
	);

	let getStatus = browser.storage.local.get("a11ycssStatus");
	getStatus.then(
		// when we got something
		(item) => {
			if (item && item.a11ycssStatus) {
				browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
					// If a setting is found for this tab
					if (item.a11ycssStatus[tabs[0].id]) {
						button.setAttribute('aria-checked', item.a11ycssStatus[tabs[0].id].status);
					}
				});
			}
		},
		// we got nothing
		onError
	);
}
a11ycssOnload();
