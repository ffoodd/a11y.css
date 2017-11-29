function addOutline() {
	const code = `
		var stylesheet = document.createElement("link");
		stylesheet.rel = "stylesheet";
		stylesheet.href = ${BROWSER_STRING}.extension.getURL("/css/outline.css");
		stylesheet.id = "${EXTENSION_PREFIX}outline";
		document.getElementsByTagName("head")[0].appendChild(stylesheet);
	`;
	console.log(code)
	BROWSER.tabs.executeScript({ code: code });
}

function removeOutline() {
	const code = `
	var outlineStylesheet = document.getElementById("${EXTENSION_PREFIX}outline");
	if ( outlineStylesheet ) { outlineStylesheet.parentNode.removeChild(outlineStylesheet) }
	`;
	BROWSER.tabs.executeScript({ code: code });
}

var btnOutline = document.getElementById('btnOutline');
btnOutline.addEventListener('click', function() {
	console.log('----------',btnOutline.getAttribute('data-activated'));
	if(btnOutline.getAttribute('data-activated')) {
		removeOutline();
		btnOutline.removeAttribute('data-activated');
	} else {
		addOutline();
		btnOutline.setAttribute('data-activated','true');
	}
	console.log('----------',btnOutline.getAttribute('data-activated'));
});