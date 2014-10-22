a11y.css
========

Pronounced « Alix ». Because it's fun.

## News

From now on, CSS counters are incremented on each error/advice/warning and results are displayed with `body::after`. Since it is added through CSS, it is basically fake-content which is good since it is no more than visual indication for the user to see what's going on.

*Note: this counter takes into account possible issues with elements within `<head>` tag. Related messages are not displayed, but they do increment the counter correctly, as any other issues.*

## Bookmarklet

You can easily use the latest version of this stylesheet by adding this *bookmarklet* to your bookmarks:

```
javascript:(function(){a11ycss=document.createElement('LINK');a11ycss.href='https://rawgit.com/ffoodd/a11y.css/master/css/a11y-fr.css';a11ycss.rel='stylesheet';a11ycss.media='all';document.body.appendChild(a11ycss);})();
```

You can also add it by going on [the dedicated page](http://ffoodd.github.io/a11y.css/) then dragging it to your bookmarks. Isn't it handy?

## About languages

a11y.css currently exists in both English and French: you'll find both files in the [css](https://github.com/ffoodd/a11y.css/tree/master/css) folder. If you want to contribute and add a new language, it is very easy to do:

1. Add the name of the language [this list](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_mixins.scss#L10);
2. Update [this map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L10) with your translations.

Done!

## Introduction

This CSS file intends to warn developers about possible risks and mistakes that exist in HTML code. It can also be used to roughly evaluate a site's quality by simply including it as an external stylesheet.

*This file is not a replacement to a complete tool such as [OpQuast Reporting](http://reporting.opquast.com/fr/). It only intends to show possible weaknesses. You should obviously do some manual check by hand to know whether the code should or should not be fixed.*

Many references helped me in the making of this stylesheet:

* [https://github.com/redroot/holmes/blob/master/holmes.css](https://github.com/redroot/holmes/blob/master/holmes.css)
* [https://github.com/karlgroves/diagnostic.css](https://github.com/karlgroves/diagnostic.css)
* [http://www.w3.org/TR/html5/obsolete.html#obsolete](http://www.w3.org/TR/html5/obsolete.html#obsolete)
* [https://github.com/nternetinspired/debug-css](https://github.com/nternetinspired/debug-css)
* [http://meyerweb.com/eric/tools/css/diagnostics/](http://meyerweb.com/eric/tools/css/diagnostics/)
* [http://accessites.org/site/2006/07/big-red-angry-text/](http://accessites.org/site/2006/07/big-red-angry-text/)
* [https://code.google.com/p/qa-style-sheet/](https://code.google.com/p/qa-style-sheet/)
* Mémento «Sites web — Les bonnes pratiques» aux éditions Eyrolles
* «Intégration Web, les bonnes pratiques», pages 335/336

Although let's keep in mind the idea has nothing new (there is an article from Marco Battilana from 2006, and a proposal by Eric Meyer himself from 2007). I only tried to push things further. I suggest you read [my article](http://www.ffoodd.fr/a11y-cssun-credo/) (in French) to learn more about the project.

## About colors

In concrete terms, errors, warnings and advices are outlined by a 4px colored border:

* red for errors;
* yellow for alerts;
* gray for obsolete stuff;
* green for advices.

Those colors are obviously customisable through [the configuration file](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L230). When hovering marked elements, a little banner should appear on top of your browser displaying what's going on.

## About selectors

Given the very long list of selectors to test, [they are splitted across several files](https://github.com/ffoodd/a11y.css/tree/master/sass/selectors). Errors are in their own file, advices in their own, and so on.

## About messages

Each test has its own message, trying to explain and guide you as much as possible. All messages are [gathered in a Sass map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L1), in both English and French. It should be quite easy for you to update the messages for internal use if you don't like them.

## Edge cases and known issues

1. Self-closing tags do not allow generated content through pseudo-elements. Thus, errors or whatever will correctly be displayed, but not the message on hover. That being said, it should be available for consultation with any DOM reader (DevTools, Firebug or whatever).
Here are affected self-closing tags:

 * `<area />`
 * `<base />`
 * `<br />`
 * `<col />`
 * `<command />`
 * `<embed />`
 * `<hr />`
 * `<img />`
 * `<input />`
 * `<keygen />`
 * `<link />`
 * `<meta />`
 * `<param />`
 * `<source />`
 * `<track />`
 * `<wbr />`

*Issue [#7](https://github.com/ffoodd/a11y.css/issues/7) opened by [@7studio](https://twitter.com/7studio) suggested a decent work-around to display messages for those tags, as long as they are followed by a non-self-closing element. Still better than nothing.*

2. Messages are generated through a fixed pseudo-element. However there could be an a containing block issue if the parent is a transformed element (`transform`):
* [W3C Specification about this](http://www.w3.org/TR/css3-transforms/#transform-property)
* [What no one told you about z-index](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) ([translated in French by @iamvdo](http://blog.iamvdo.me/post/41094013194/comprendre-z-index-et-les-contextes-dempilement))

3. Along the same lines, tests on elements that are contained within `<head>` cannot be displayed (since `<head>` is a hidden element). I need to find a way to do this.

4. To avoid cases when outline could be hidden, the property [outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset) is being used in order to display it inside the element (rather than outside). Thanks to [@7studio](https://twitter.com/7studio) in [#4](https://github.com/ffoodd/a11y.css/issues/4).

## Improvements to come

In a not-so-distant future, I'd like to:

* [ ] find a way to display messages from `<head>` contained elements (JavaScript?);
* [ ] improve the way we deal with self-closing tags (JavaScript?);
* [x] add a new *advice* role. While not critical, some things (like ARIA roles) can be tested through CSS, let's do this!

*PS: CSS best practices do not belong to this CSS file. Some selectors are ugly as hell, but we need them in order to select what we need to select.*

This project is distributed under [MIT](http://opensource.org/licenses/MIT "The MIT licence") license and [CC BY 3.0 FR](http://creativecommons.org/licenses/by/3.0/fr/).
*Copyright (c) 2013 Gaël Poupard*

## Building docs

With global SassDoc install:

```sh
$ npm install sassdoc -g
$ sassdoc sass/ docs/ --verbose --config .sassdocrc
```

With local SassDoc install:

```sh
$ npm install
$ node_modules/sassdoc/bin/sassdoc sass/ docs/ --verbose --config .sassdocrc
```
