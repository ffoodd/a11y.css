let btnCheckalts = document.getElementById('btnCheckalts');
btnCheckalts.addEventListener('click', function () {

	let icons = [];
	icons.ok = browser.extension.getURL("/icons/ok.svg");
	icons.ko = browser.extension.getURL("/icons/ko.svg");
	icons.info = browser.extension.getURL("/icons/info.svg");
	let strings = [];
	strings.ok = _t("altOK");
	strings.ko = _t("altMissing");
	strings.info = _t("altEmpty");
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {
			a11ycss_action: "checkalts",
			icons: icons,
			strings: strings
		});
	});


});
