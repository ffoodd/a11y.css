let btnTextspacing = document.getElementById('btnTextspacing');
btnTextspacing.addEventListener('click', function () {
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {
			a11ycss_action: "textspacing"
		});
	});
});
