
// Set language first
var localeNormalCase = 'en'; // default locale, may happen to be capitalised, cf pt-BR
var locale; // this will retrieve a lower-case locale, used for file names etc.

function setLocale() {
	// first find if there is a locale we can use
	let isLocaleFoundYet = false;
	let ualang = navigator.languages; // grab the navigator's languages
	ualang.forEach(function (key) {
		if (locales.includes(key.toLowerCase()) && !isLocaleFoundYet) {
			localeNormalCase = key; // new locale
			isLocaleFoundYet = true;
			return;
		}
	});
	locale = localeNormalCase.toLowerCase();
	document.body.setAttribute('lang',locale);
	var localizableElts = document.getElementsByClassName('localizeMe'); // localise every element
	for(let i=0 ; i < localizableElts.length ; i++) {
		localizableElts[i].innerHTML = localeStrings[locale][localizableElts[i].getAttribute('id')] ? localeStrings[locale][localizableElts[i].getAttribute('id')] : '?';
	}
}

setLocale();
