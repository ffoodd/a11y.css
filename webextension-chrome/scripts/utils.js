/**
 * returns a localised string
 * @param {String} str 
 * @param {String} locale (optional)
 */
function _t() {
	var args = _t.arguments;
	var str = args[0] ? args[0] : "";
	var localestr = (args[1] && args[1].length > 0) ? args[1] : locale;
	return (localeStrings[localestr] && localeStrings[localestr][str]) ? localeStrings[localestr][str] : '???';
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
/**
 * Short-hand for showing/hiding an element
 * @param {String} id : id of an element
 */
function showHide(id) {
	document.getElementById(id).classList.toggle('hidden');
}