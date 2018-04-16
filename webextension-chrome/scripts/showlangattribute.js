let btnShowLangAttribute = document.getElementById('btnShowLangAttribute');

btnShowLangAttribute.addEventListener('click', function () {
	const code = `
		var oldStylesheet = document.getElementById("${EXTENSION_PREFIX}showlangattribute");
		if ( oldStylesheet ) { oldStylesheet.parentNode.removeChild(oldStylesheet) }
		var stylesheet = document.createElement("link");
		stylesheet.rel = "stylesheet";
		stylesheet.href = ${BROWSER_STRING}.extension.getURL("/css/show-lang.css");
		stylesheet.id = "${EXTENSION_PREFIX}showlangattribute";
		document.getElementsByTagName("head")[0].appendChild(stylesheet);
	`;
	BROWSER.tabs.executeScript({ code: code });
});
