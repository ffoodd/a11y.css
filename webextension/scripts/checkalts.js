let btnCheckalts = document.getElementById('btnCheckalts');
btnCheckalts.addEventListener('click', function () {
	const code = `
		var oldJS = document.getElementById("${EXTENSION_PREFIX}checkalts");
		if ( !oldJS ) {
			var newJS = document.createElement("script");
			newJS.src = ${BROWSER_STRING}.extension.getURL("/scripts/injected/checkalts.js");
			newJS.id = "${EXTENSION_PREFIX}checkalts";
			document.getElementsByTagName("head")[0].appendChild(newJS);
		}
	`;
	browser.tabs.executeScript({ code: code });
	let icons = [];
	icons.ok = browser.extension.getURL("/icons/ok.svg");
	icons.ko = browser.extension.getURL("/icons/ko.svg");
	icons.info = browser.extension.getURL("/icons/info.svg");
	console.log("icons complet",icons, icons.length);
	// browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
	// 	browser.tabs.sendMessage(tabs[0].id, {
	// 		icons: icons
	// 	});

	// });

});
