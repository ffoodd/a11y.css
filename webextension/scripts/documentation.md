# Scripts documentation

The scripts are in webextension/scripts and are organised as follows:

````
scripts                   Main folder for scripts
|
|-* constants.js          Constants for browsers
|-* locales.js            All strings
|-* popuphandlers.js      Behaviours for the extension popup
|-* utils.js              What it says on the cover: utilities
|-* [all other JS]        One script per functionality
|
|-- injected              Scripts that must be injected in the page to add behaviour in the page
```

So, for instance:

1. Once the popup is shown, we click on “Check alts”
2. `checkalts.js` is triggered
3. `injected/checkalts.js` is injected into the page

