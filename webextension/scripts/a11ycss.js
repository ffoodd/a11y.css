// collection of radio buttons
let level = document.getElementsByName('level');


/**
 * Helper function for browser storage
 * @param {String} strLevel 
 */
function storeA11ycss(strLevel) {
	let a11ycss = { level: strLevel }
	let setting = browser.storage.local.set({ a11ycss });
	setting.then(null, onError); // just in case
}

// store choice when one radio button is chosen
level.forEach(function (key) {
	key.addEventListener('click', function (event ) {
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
	console.log(currentLevel);
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
	console.log(code)
	BROWSER.tabs.executeScript({ code: code });
}

function removeA11ycss() {
	const code = `
		var oldStylesheet = document.getElementById("${EXTENSION_PREFIX}stylechecker");
		if ( oldStylesheet ) { stylesheet.parentNode.removeChild(oldStylesheet) }
	`;
	BROWSER.tabs.executeScript({ code: code });
}

document.getElementById("a11ycssBtnApply").addEventListener('click', function () {
	addA11ycss();
});
document.getElementById("a11ycssBtnClear").addEventListener('click', function () {
	removeA11ycss();
});
// --------------------------------------

// on document load, if we have already chosen a level, give it back
// (the first option is checked in the popup's HTML by default)
function a11ycssOnload() {
	let gettingItem = browser.storage.local.get("a11ycss");
	gettingItem.then(
		// when we got something
		function (item) {
			if (item && item.a11ycss && item.a11ycss.level) { // a level was set already
				console.log("item.a11ycss.level", item.a11ycss.level);
				level.forEach(function (key) {
					if (key.value === item.a11ycss.level) {
						key.checked = true;
					} else {
						key.checked = false;
					}
				});
			}
		},
		// we got nothing
		onError
	);
}
a11ycssOnload();