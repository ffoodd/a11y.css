let btnTextspacing = document.getElementById('btnTextspacing');

function storeTextSpacingStatus(strStatus) {
	// Get a11y.css stored levels
	let getStatus = browser.storage.local.get("textSpacingStatus");
	getStatus.then(
		// when we got something
		(item) => {
			if (item && item.textSpacingStatus) {
				// Get current tab ID
				browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
					// Get current stored value
					let textSpacingStatus = item.textSpacingStatus;
					// Add or replace current tab's value
					textSpacingStatus[tabs[0].id] = {"status": strStatus};
					// Abnd set it back to the storage
					let setting = browser.storage.local.set({ textSpacingStatus });
					setting.then(null, onError); // just in case
				});
			}
		}
	);
}

btnTextspacing.addEventListener('click', function () {
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {
			a11ycss_action: "textspacing"
		});
	});
	var checked = this.getAttribute('aria-checked') === 'true' || false;
	this.setAttribute('aria-checked', !checked);
	storeTextSpacingStatus(!checked);
});

function textSpacingOnload() {
	let getStatus = browser.storage.local.get("textSpacingStatus");
	getStatus.then(
		// when we got something
		function (item) {
			if (item && item.textSpacingStatus) {
				browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
					// If a setting is found for this tab
					if (item.textSpacingStatus[tabs[0].id]) {
						btnTextspacing.setAttribute('aria-checked', item.textSpacingStatus[tabs[0].id].status);
					}
				});
			}
		},
		// we got nothing
		onError
	);
}
textSpacingOnload();
