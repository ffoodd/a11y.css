let btnCheckalts = document.getElementById('btnCheckalts');
btnCheckalts.addEventListener('click', function () {

	if (window.hasRun_btnCheckalts) {
		return;
	}
	window.hasRun_btnCheckalts = true;

	browser.tabs.executeScript({ file: "/scripts/injected/checkalts.js" }).then(() => {
		let icons = [];
		icons.ok = browser.extension.getURL("/icons/ok.svg");
		icons.ko = browser.extension.getURL("/icons/ko.svg");
		icons.info = browser.extension.getURL("/icons/info.svg");
		browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {
				icons: icons
			});

		});

	});

});
