a11y.css
========

Pronounced « Alix ». Because it's fun.

[![GitHub version](https://badge.fury.io/gh/ffoodd%2Fa11y.css.svg)](https://badge.fury.io/gh/ffoodd%2Fa11y.css) [![npm version](https://badge.fury.io/js/a11y.css.svg)](https://badge.fury.io/js/a11y.css) [![Bower version](https://badge.fury.io/bo/a11y.css.svg)](https://badge.fury.io/bo/a11y.css) [![devDependency Status](https://david-dm.org/ffoodd/a11y.css/dev-status.svg)](https://david-dm.org/ffoodd/a11y.css#info=devDependencies) [![Build Status](https://travis-ci.org/ffoodd/a11y.css.svg?branch=master)](https://travis-ci.org/ffoodd/a11y.css)

## Introduction

This CSS file intends to warn developers about possible risks and mistakes that exist in HTML code. It can also be used to roughly evaluate a site's quality by simply including it as an external stylesheet.

*This file is not a replacement to a complete tool such as [OpQuast Reporting](http://reporting.opquast.com/). It only intends to show possible weaknesses. You should obviously do some manual check by hand to know whether the code should or should not be fixed.*

### Acknowledgements

Many references helped me in the making of this stylesheet:

* [https://github.com/redroot/holmes/blob/master/holmes.css](https://github.com/redroot/holmes/blob/master/holmes.css)
* [https://github.com/karlgroves/diagnostic.css](https://github.com/karlgroves/diagnostic.css)
* [http://www.w3.org/TR/html5/obsolete.html#obsolete](http://www.w3.org/TR/html5/obsolete.html#obsolete)
* [https://github.com/nternetinspired/debug-css](https://github.com/nternetinspired/debug-css)
* [https://yahoo.github.io/debugCSS/](https://yahoo.github.io/debugCSS/)
* [http://meyerweb.com/eric/tools/css/diagnostics/](http://meyerweb.com/eric/tools/css/diagnostics/)
* [http://accessites.org/site/2006/07/big-red-angry-text/](http://accessites.org/site/2006/07/big-red-angry-text/)
* [http://www.accessiweb.org/index.php/accessiweb-html5aria-liste-deployee.html](http://www.accessiweb.org/index.php/accessiweb-html5aria-liste-deployee.html)
* [https://github.com/Heydon/REVENGE.CSS](https://github.com/Heydon/REVENGE.CSS)
* [https://code.google.com/p/qa-style-sheet/](https://code.google.com/p/qa-style-sheet/)
* Mémento « Sites web — Les bonnes pratiques »
* « Intégration Web, les bonnes pratiques », pages 335/336

Although let's keep in mind the idea has nothing new (there is an article from Marco Battilana from 2006, and a proposal by Eric Meyer himself from 2007). I only tried to push things further. I suggest you read [my article](http://www.ffoodd.fr/a11y-cssun-credo/) (in French) to learn more about the project.

## Technical structure

### About colors

In concrete terms, errors, warnings and advices are outlined by a 4px colored border:

* red for errors;
* yellow for warnings;
* blue for obsolete stuff;
* green for advices.

Those colors are obviously customisable through [the configuration file](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L230). When hovering marked elements, a little banner should appear on top of your browser displaying what's going on.

### About selectors

Given the very long list of selectors to test, [they are splitted across several files](https://github.com/ffoodd/a11y.css/tree/master/sass/themes). Errors are in their own file, advices in their own, and so on.

*Please notice that you can build a single level file* (obsolete stuff only, for example), and adjust it to your very own issues. You may want to fix errors, or to learn from few advices.

#### Cancel a selector

When the `:not()` selector cannot be precise enough, you may add a second selector to extend the `%a11y-reset` placeholder, which tries to cancel the test in your second case. However a few styles from the original page will still be overrided.

#### Extend a selector to target self-closing tags and replaced elements

Generic selector like `[class]` may targetself-closing tags and replaced elements (see "Edge cases and known issues" section). Some selectors are now extended with `@void-tags` mixin, that improve selector to target those weird tags, and repeat the associated message (adding `$self-closing: true`).

#### Quarantine

When a selector is not cross-browser, you may send it to quarantine as it won't invalidate other selectors.

Just switch the boolean argument `$quarantine: true`.

### About messages

Each test has its own message, trying to explain and guide you as much as possible. All messages are [gathered in a Sass map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L1), in both English and French. It should be quite easy for you to update the messages for internal use if you don't like them.

*New* : You are now able to use the `attr()` CSS function in messages to show the real value of an attribute.

### Counters

From now on, CSS counters are incremented on each error/advice/warning and results are displayed with `html::after`. Since it is added through CSS, it is basically fake-content which is good since it is no more than visual indication for the user to see what's going on.

*Note: this counter takes into account possible issues with elements within `<head>` tag. Related messages are not displayed, but they do increment the counter correctly, as any other issues.*

## Portability, languages and known limitations

### Bookmarklet

You can easily use the latest version of this stylesheet by adding this *bookmarklet* to your bookmarks:

```
javascript:(function(){a11ycss=document.createElement('LINK');a11ycss.href='https://rawgit.com/ffoodd/a11y.css/master/css/a11y-en.css';a11ycss.rel='stylesheet';a11ycss.media='all';document.body.appendChild(a11ycss);})();
```

*New*
You can also generate your own bookmarklet (choosing language and minimum level) on [the dedicated page](http://ffoodd.github.io/a11y.css/) then directly drag it to your bookmarks. Isn't it handy?

### About languages

a11y.css currently exists in both English and French: you'll find both files in the [css](https://github.com/ffoodd/a11y.css/tree/master/css) folder. If you want to contribute and add a new language, it is very easy to do:

1. Add the name of the language in [this list](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_mixins.scss#L10);
2. Copy [`_a11y-en.scss`](https://github.com/ffoodd/a11y.css/blob/master/sass/a11y-en.scss), rename it `_a11y-<your-language>.scss` and change the value passed to the `set-locale` mixin;
". Update [this map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L10) with your translations.
'. Update [this map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L241) to translate theme names.
(. Run `sass --update sass:css --style=compressed` to generate the new CSS file.

Done!

### Edge cases and known issues

1. Self-closing tags (a.k.a. void elements) do not allow generated content through pseudo-elements. Thus, errors or whatever will correctly be displayed, but not the message on hover. That being said, it should be available for consultation with any DOM reader (DevTools, Firebug or whatever).
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
 * `<textarea>`, `<select>`, `<svg>`, `<audio>`, `<video>`, `<track>` and `<iframe>` aren't void tags but can't contain pseudo-elements as they are replaced elements. Take a look at [What The Heck Is A Replaced Element?](https://demosthenes.info/blog/461/What-The-Heck-Is-A-Replaced-Element#) by @dudleystorey.

 *Issue [#7](https://github.com/ffoodd/a11y.css/issues/7) opened by [@7studio](https://twitter.com/7studio) suggested a decent work-around to display messages for those tags, as long as they are followed by a non-self-closing element. Still better than nothing.*

2. Messages are generated through a fixed pseudo-element. However there could be a containing block issue if the parent is a transformed element (`transform`):
 * [W3C Specification about this](http://www.w3.org/TR/css3-transforms/#transform-property)
 * [What no one told you about z-index](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) ([translated in French by @iamvdo](http://blog.iamvdo.me/post/41094013194/comprendre-z-index-et-les-contextes-dempilement))

3. Along the same lines, tests on elements that are contained within `<head>` cannot be displayed (since `<head>` is a hidden element). I need to find a way to do this.

 *Issue [#66](https://github.com/ffoodd/a11y.css/issues/66) opened by [@7studio](https://twitter.com/7studio) (again) helped with this point, thanks to [an idea](https://mathiasbynens.be/notes/css-hidden-elements) from [Mathias Bynens](https://twitter.com/mathias).

4. To avoid cases when outline could be hidden, the property [outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset) is being used in order to display it inside the element (rather than outside). Thanks to [@7studio](https://twitter.com/7studio) in [#4](https://github.com/ffoodd/a11y.css/issues/4).

## Build a custom a11y.css

### Building leveled file

You are now able to customize the file output by targeting a severity treshold. You just have to personalize the single parameter in `set-minimum-level` mixin. Levels are cumulative, and reflect theme's names:
* `error`: only errors;
* `warning`: warnings and errors;
* `obsolete`: obsolete stuff, warnings and errors;
* `advice`: every messages.

We are assuming that looking for advices means that you care about obsoletes, warnings and errors.

Credits to [@HugoGiraudel](https://twitter.com/HugoGiraudel) in [#69](https://github.com/ffoodd/a11y.css/issues/69).

### Disabling tests

It is possible to disable some specific tests if you build your own `a11y.css` file. Use the following mixins:

* `disable-errors($keys...)`
* `disable-advices($keys...)`
* `disable-warnings($keys...)`
* `disable-obsoletes($keys...)`

For instance, if you want to disable the errors about messing with tabindex and missing href, you can do:

```scss
@include disable-errors("tab-order, no-href");
```

Credits to [@HugoGiraudel](https://twitter.com/HugoGiraudel) in [#69](https://github.com/ffoodd/a11y.css/issues/113).

## Documentation

### Building SassDoc

With global SassDoc install:

```sh
$ npm install sassdoc -g
$ sassdoc sass/ --dest docs/ --verbose --config .sassdocrc
```

With local SassDoc install:

```sh
$ npm install
$ node_modules/sassdoc/bin/sassdoc sass/ --dest docs/ --verbose --config .sassdocrc
```

### Build Hologram

This one is easy. Usign command line, just `cd` to `a11y.css` then run `hologram`.
Et voilà !

To learn more about Hologram, take a look at [their GitHub repository](https://github.com/trulia/hologram)).

## Automatisation

We all have to stay up-to-date, so you'll find a [Gulp](http://gulpjs.com/) configuration file.
Some useful tasks are ready-to-run.

If you run `gulp` — which runs `gulp build` behind the scene — you'll compile Sass files (including *sourcemaps*)
and optimize the CSS output.

You can also launch `gulp docs`, which will generate the whole documentation *via* both SassDoc and Hologram.

Each task can be run individually:
* `gulp sass`
* `gulp minify`
* `gulp sassdoc`
* `gulp hologram`

And of course you can watch for changes to automatically compile Sass and optimize the CSS output using `gulp watch`.

## Credits and Acknowledgements

### Contributors

They helped a lot:
* [@HugoGiraudel](https://twitter.com/HugoGiraudel)
* [@7studio](https://twitter.com/7studio)
* [@Heydon](https://twitter.com/heydonworks)
* [@kloh-fr](https://twitter.com/klohFR)
* [@GaetanBt](https://twitter.com/GaetanBt)
* [@a5e](https://github.com/a5e)

And they took time to open a few issues:
* [@goetsu](https://twitter.com/goetsu)
* [@Twikito](https://twitter.com/twikito)
* [@olamedia](https://github.com/olamedia)
* [@bartveneman](http://bveneman.nl/)

Thank you all!

*PS: CSS best practices do not belong to this CSS file. Some selectors are ugly as hell, but we need them in order to select what we need to select.*

This project is distributed under [MIT](http://opensource.org/licenses/MIT "The MIT licence") license and [CC BY 3.0 FR](http://creativecommons.org/licenses/by/3.0/fr/).
*Copyright (c) 2013 Gaël Poupard*
