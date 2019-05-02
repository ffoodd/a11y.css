let btnCheckalts = document.getElementById('btnCheckalts');

function storeCheckAltsStatus(strStatus) {
	// Get a11y.css stored levels
	let getStatus = browser.storage.local.get("checkAltsStatus");
	getStatus.then(
		// when we got something
		(item) => {
			if (item && item.checkAltsStatus) {
				// Get current tab ID
				browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
					// Get current stored value
					let checkAltsStatus = item.checkAltsStatus;
					// Add or replace current tab's value
					checkAltsStatus[tabs[0].id] = {"status": strStatus};
					// Abnd set it back to the storage
					let setting = browser.storage.local.set({ checkAltsStatus });
					setting.then(null, onError); // just in case
				});
			}
		}
	);
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
	let getStatus = browser.storage.local.get("checkAltsStatus");
	getStatus.then(
		// when we got something
		function (item) {
			if (item && item.checkAltsStatus) {
				browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
					// If a setting is found for this tab
					if (item.checkAltsStatus[tabs[0].id]) {
						btnCheckalts.setAttribute('aria-checked', item.checkAltsStatus[tabs[0].id].status);
					}
				});
			}
		},
		// we got nothing
		onError
	);
}
checkAltsOnload();
