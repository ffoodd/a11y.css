let btnCheckalts = document.getElementById('btnCheckalts');

function storeCheckAltsStatus(strStatus) {
	let checkAltsStatus = { status: strStatus };
	let setting = browser.storage.local.set({ checkAltsStatus });
	setting.then(null, onError); // just in case
}

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
	var checked = this.getAttribute('aria-checked') === 'true' || false;
	this.setAttribute('aria-checked', !checked);
	storeCheckAltsStatus(!checked);
});

function checkAltsOnload() {
	let getCheckAltsStatus = browser.storage.local.get("checkAltsStatus");
	getCheckAltsStatus.then(
		// when we got something
		function (item) {
			if (item && item.checkAltsStatus && item.checkAltsStatus.status) {
				btnCheckalts.setAttribute('aria-checked', item.checkAltsStatus.status);
			}
		},
		// we got nothing
		onError
	);
}
checkAltsOnload();
