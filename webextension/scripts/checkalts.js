let btnCheckalts = document.getElementById('btnCheckalts');
btnCheckalts.addEventListener('click', function () {
	let icons = {
		ok: browser.extension.getURL("/icons/ok.svg"),
		ko: browser.extension.getURL("/icons/ko.svg"),
		info: browser.extension.getURL("/icons/info.svg")
	};
	let strings = {
		ok: _t("altOK"),
		ko: _t("altMissing"),
		info: _t("altEmpty")
	};
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {
			a11ycss_action: "checkalts",
			icons: icons,
			strings: strings
		});
	});
});
