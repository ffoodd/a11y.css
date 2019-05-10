function onError(error) {
	console.error(`a11y.css error: ${error}`);
}

function statusesOnUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url) {
        let getTextSpacingStatus = browser.storage.local.get("textSpacingStatus");
        getTextSpacingStatus.then(
            (item) => {
                if (item && item.textSpacingStatus && item.textSpacingStatus[tabId]) {
					let textSpacingStatus = item.textSpacingStatus;
					textSpacingStatus[tabId] = {"status": false};
					let setting = browser.storage.local.set({ textSpacingStatus });
					setting.then(null, onError);
                }
            }
        );

		let getShowLangStatus = browser.storage.local.get("showLangStatus");
        getShowLangStatus.then(
            (item) => {
                if (item && item.showLangStatus && item.showLangStatus[tabId]) {
					let showLangStatus = item.showLangStatus;
					showLangStatus[tabId] = {"status": false};
					let setting = browser.storage.local.set({ showLangStatus });
					setting.then(null, onError);
                }
            }
        );

		let getOutlineStatus = browser.storage.local.get("outlineStatus");
        getOutlineStatus.then(
            (item) => {
                if (item && item.outlineStatus && item.outlineStatus[tabId]) {
					let outlineStatus = item.outlineStatus;
					outlineStatus[tabId] = {"status": false};
					let setting = browser.storage.local.set({ outlineStatus });
					setting.then(null, onError);
                }
            }
        );

		let getCheckAltsStatus = browser.storage.local.get("checkAltsStatus");
        getCheckAltsStatus.then(
            (item) => {
                if (item && item.checkAltsStatus && item.checkAltsStatus[tabId]) {
					let checkAltsStatus = item.checkAltsStatus;
					checkAltsStatus[tabId] = {"status": false};
					let setting = browser.storage.local.set({ checkAltsStatus });
					setting.then(null, onError);
                }
            }
        );

		let getA11ycssStatus = browser.storage.local.get("a11ycssStatus");
        getA11ycssStatus.then(
            (item) => {
                if (item && item.a11ycssStatus && item.a11ycssStatus[tabId]) {
					let a11ycssStatus = item.a11ycssStatus;
					a11ycssStatus[tabId] = {"status": false};
					let setting = browser.storage.local.set({ a11ycssStatus });
					setting.then(null, onError);
                }
            }
        );
    }
}

browser.tabs.onUpdated.addListener(statusesOnUpdated);
