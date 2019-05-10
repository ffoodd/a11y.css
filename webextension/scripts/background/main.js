function textSpacingOnUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url) {
        let getStatus = browser.storage.local.get("textSpacingStatus");
        getStatus.then(
            // when we got something
            (item) => {
                console.log("item");
                console.log(item);
                if (item && item.textSpacingStatus && item.textSpacingStatus[tabId]) {
                    console.log("textspacing");
                    console.log(item.textSpacingStatus[tabId]);
                    // what's are we doing if item.textSpacingStatus[tabId] exist? remove it?
                    // Need to find a way to only remove current tab's value
                }
            }
        );
    }
}

browser.tabs.onUpdated.addListener(textSpacingOnUpdated);