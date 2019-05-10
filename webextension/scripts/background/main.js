function onError(error) {
	console.error(`a11y.css error: ${error}`);
}

function textSpacingOnUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url) {
        let getStatus = browser.storage.local.get("textSpacingStatus");
        getStatus.then(
            (item) => {
                if (item && item.textSpacingStatus && item.textSpacingStatus[tabId]) {
					let textSpacingStatus = item.textSpacingStatus;
					textSpacingStatus[tabId] = {"status": false};
					let setting = browser.storage.local.set({ textSpacingStatus });
					setting.then(null, onError);
                }
            }
        );
    }
}

browser.tabs.onUpdated.addListener(textSpacingOnUpdated);
