
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
	// locale is used for all localisation strings, cf. locales.js
	locale = localeNormalCase.toLowerCase();
	// set lang of document
	document.body.setAttribute('lang',localeNormalCase);
	
	// localise every element
	var localizableElts = document.getElementsByClassName('localizeMe');
	for(let i=0 ; i < localizableElts.length ; i++) {
		localizableElts[i].innerHTML = _t(localizableElts[i].getAttribute('id'));
	}

	// localise a11ycss dropdown to choose language REMOVED FOR NOW
	// var a11cssDropdown = ``;
	// locales.forEach(function(key){
	// 	// var str = localeStrings[key]["_LOCALE"];
	// 	var str = _t("_LOCALE",key);
	// 	a11cssDropdown += `<option value="${key}"`;
	// 	if(locale === key) {
	// 		a11cssDropdown += ` selected`;
	// 	}
	// 	a11cssDropdown += `>${str}</option>`;
	// });
	// console.log(a11cssDropdown);
	// document.getElementById("languageSelector").innerHTML = a11cssDropdown;

}

setLocale();
