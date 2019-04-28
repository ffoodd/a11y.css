let btnTextspacing = document.getElementById('btnTextspacing');

function storeTextSpacingStatus(strStatus) {
	let textSpacingStatus = { status: strStatus };
	let setting = BROWSER.storage.local.set({ textSpacingStatus });
	setting.then(null, onError); // just in case
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
	let getTextSpacingStatus = browser.storage.local.get("textSpacingStatus");
	getTextSpacingStatus.then(
		// when we got something
		function (item) {
			if (item && item.textSpacingStatus && item.textSpacingStatus.status) {
				btnTextspacing.setAttribute('aria-checked', item.textSpacingStatus.status);
			}
		},
		// we got nothing
		onError
	);
}
textSpacingOnload();
