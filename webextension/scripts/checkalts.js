let btnCheckalts = document.getElementById('btnCheckalts');
btnCheckalts.addEventListener('click', function () {

	let icons = [];
	icons.ok = BROWSER.extension.getURL("/icons/ok.svg");
	icons.ko = BROWSER.extension.getURL("/icons/ko.svg");
	icons.info = BROWSER.extension.getURL("/icons/info.svg");
	let strings = [];
	strings.ok = _t("altOK");
	strings.ko = _t("altMissing");
	strings.info = _t("altEmpty");
	BROWSER.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		BROWSER.tabs.sendMessage(tabs[0].id, {
			a11ycss_action: "checkalts",
			icons: icons,
			strings: strings
		});
	});


});
