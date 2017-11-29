const BROWSER = chrome || browser;
const BROWSER_STRING = chrome ? 'chrome' : 'browser';
// const STORAGE = BROWSER.storage.sync || BROWSER.storage.local;
// TODO later : storage

// Set language first
var localeNormalCase = 'en'; // default locale, may happen to be capitalised, cf pt-BR
var locale; // this will retrieve a lower-case locale, used for file names etc.

function setLocale() {
	// first find if there is a locale we can use
	let isLocaleFoundYet = false;
	let ualang = navigator.languages; // grab the navigator's languages
	console.log('ualang', ualang);
	ualang.forEach(function (key) {
		if (locales.includes(key.toLowerCase()) && !isLocaleFoundYet) {
			localeNormalCase = key; // new locale
			isLocaleFoundYet = true;
			return;
		}
	});
	locale = localeNormalCase.toLowerCase();
	document.body.setAttribute('lang',locale);
	document.getElementById('btnOutline').innerHTML = localeStrings[locale]['btnOutline'];
	var btns = document.getElementById('home').getElementsByTagName('button');
	for(let i=0 ; i < btns.length ; i++) {
		btns[i].innerHTML = localeStrings[locale][btns[i].getAttribute('id')] ? localeStrings[locale][btns[i].getAttribute('id')] : '?';
	}
}

setLocale();
