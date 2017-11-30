/**
 * returns a localised string
 * @param {String} str 
 */
function _t(str) {
	return localeStrings[locale][str] ? localeStrings[locale][str] : '???';
}

/**
 * Documents the error to the console
 * @param {Error} error 
 */
function onError(error) {
	console.log(`A11Y.CSS ERROR: ${error}`);
}
/**
 * Documents what we got from a STORAGE.get()
 * @param {Object} item 
 */
function onGot(item) {
	console.log(`A11Y.CSS GOT`, item);
}
