# Scripts documentation

## File organisation

The scripts are in webextension/scripts and are organised as follows:

```
scripts                   Main folder for scripts
|
|-* constants.js          Constants for browsers
|-* locales.js            All strings
|-* utils.js              What it says on the cover: utilities
|-* [all other JS]        One script per functionality
|
|-- injected              Content scripts
```


## API between the extension and the pages

Each script that needs to execute a content script has to call it that way:

```javascript
browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
	browser.tabs.sendMessage(tabs[0].id, {
		a11ycss_action: "checkalts",
		// [… other parameters …]
	});
});
```

For instance this will be listened to by the injected content script checkalts.js, which will react accordingly:

```javascript
browser.runtime.onMessage.addListener((message) => {
	if (message.a11ycss_action && message.a11ycss_action === "checkalts") {
		// this is where the actions are going to be called
	}
});
```
