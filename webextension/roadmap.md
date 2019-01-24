# Roadmap for the extension

## Who?

* Main developer: @notabene
* based on work by @ffoodd (a11y.css creator) and @ireade (porting to an extension)

## Why?

* CORS security prevent from running bookmarklets more and moer often
* Extensions = easier scripting capacities (e.g. on/off on a set of tests)

## Small fix January 2019 TODO

1. Make the "check alts" into a toggle
	* ~~Make `reporterid` a global variable in the script~~
	* ~~Create a `toggleReporter()` function to either remove the div or build it~~
	* ~~in `init` replace `this.buildReporter();` with the toggle~~
2. LOCALISATION
	* @ffoodd find translators to update `"btnCheckalts": "Afficher/masquer <code>img@alt</code>",`
