# Roadmap for the extension

## Who?

* Main developer: @notabene
* based on work by @ffoodd (a11y.css creator) and @ideade (porting to an extension)

## Why?

* CORS security prevent from running bookmarklets more and moer often
* Extensions = easier scripting capacities (e.g. on/off on a set of tests)

## What are we going to do?

Step by step at this date (end November 2017)

1. Create an empty WebExtension
2. Add a simple popup
3. Test for browser language (accept-language?): is this language implemented in a11y.css?
  * If yes, serve the same language
  * Else, serve English
4. Provide buttons in the popup with utilities
  * First batch: outline focus.
  * First batch: a11y.css (find a proper label to identify button?).
  * First batch: leave space for other tools
  * Second batch: Outline focused element.
  * Second batch: Check alt images.
5. Outline focus (why, you ask? Well, because it's the simplest thing I have in store)
6. implement a11y.css
  * Localised (do something like a locales.json)
  * Up to date with `a11y.css/css`