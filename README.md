a11y.css
========

Pronounced « Alix ». Because it's fun.

[![GitHub version](https://badge.fury.io/gh/ffoodd%2Fa11y.css.svg)](https://badge.fury.io/gh/ffoodd%2Fa11y.css) [![npm version](https://badge.fury.io/js/a11y.css.svg)](https://badge.fury.io/js/a11y.css) [![Bower version](https://badge.fury.io/bo/a11y.css.svg)](https://badge.fury.io/bo/a11y.css) [![devDependency Status](https://david-dm.org/ffoodd/a11y.css/dev-status.svg)](https://david-dm.org/ffoodd/a11y.css#info=devDependencies) [![Build Status](https://travis-ci.org/ffoodd/a11y.css.svg?branch=master)](https://travis-ci.org/ffoodd/a11y.css) [![Code Climate](https://codeclimate.com/github/ffoodd/a11y.css/badges/gpa.svg)](https://codeclimate.com/github/ffoodd/a11y.css)

## Introduction

This CSS file intends to warn developers about possible risks and mistakes that exist in HTML code. It can also be used to roughly evaluate a site's quality by simply including it as an external stylesheet.

When hovering marked elements, a little banner should appear on top of your browser displaying what's going on.

*This file is not a replacement to a complete tool such as [OpQuast Reporting](http://reporting.opquast.com/), [Tanaguru](http://www.tanaguru.com/en/) ou [Tenon](http://tenon.io/). It only intends to show possible weaknesses. You should obviously do some manual check by hand to know whether the code should or should not be fixed.*

### Counters

CSS counters are incremented on each error/advice/warning and results are displayed with `html::after`. Since it is added through CSS, it is basically fake-content which is good since it is no more than visual indication for the developper to see what's going on. It will appear on the bottom left side of your page :).


# Usage

You can use `a11y.css` in multiple ways.

## Bookmarklet

You can easily use the latest version of this stylesheet by adding this *bookmarklet* to your bookmarks:

```
javascript:(function(){a11ycss=document.createElement('LINK');a11ycss.href='https://rawgit.com/ffoodd/a11y.css/master/css/a11y-en.css';a11ycss.rel='stylesheet';a11ycss.media='all';document.body.appendChild(a11ycss);})();
```

You can also generate your own bookmarklet (choosing language and minimum level) on [the dedicated page](http://ffoodd.github.io/a11y.css/) then directly drag it to your bookmarks. Isn't it handy?

### The CSP case

[CSP](https://www.w3.org/TR/CSP/) are awesome, but may prevent bookmarklets usage.
Let’s be honest, in theory *you should not update your CSP directives to allow bookmarklets*.

However it appears that some browsers have bugs when implementing CSP, preventing us from simply use bookmarklets.
Here are two directives you need to add, while waiting for browsers to fix their bugs:

* `script-src 'unsafe-inline'`
* `style-src https://rawgit.com/`

And you should be good! If you want to know more about bugs I mentionned
(and discover great resources to help you with CSP usage) I suggest you read
issue [#201](https://github.com/ffoodd/a11y.css/issues/201) opened and documented by the awesome [Nicolas Hoffmann](https://twitter.com/Nico3333fr).

## CSS file

You will find static `CSS` files in the `/CSS` folder.
CSS files are available in french and english, and leveled or full.
You can simply download it and add it to your usual stack, just like any `CSS`.

## Sass files

You can play with sources and easily [build your own version of `a11y.css`](https://github.com/ffoodd/a11y.css/blob/master/CUSTOMIZE.md).

## Gulp file

If you're brave enough, the `gulpfile.js` allows you to work with every brick of this project:
* `Sass` linting and compilation;
* `CSS` linting and optimization (for readability);
* Hologram and SassDoc generation.

I guess you will find your way out of this configuration file, but if not: ask me!
*Notice*: you'll need [a few Ruby `gem`](https://github.com/ffoodd/a11y.css/blob/master/Gemfile), Ì suggest Bundler and  `bundle install`.
*Note* : `a11y.css` has its own SassDoc theme: [sassdoc-theme-alix](https://github.com/ffoodd/sassdoc-theme-alix).


## *Via* `npm` or `Bower`

You can get this project by running `npm install a11y.css` or `bower install a11y.css`.

## Credits and Acknowledgements

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
* [@olivares](https://twitter.com/olivares)
* [@vibby](https://twitter.com/vibby0)
* [@accesbilis](https://twitter.com/accesbilis)

Thank you all!

This project is distributed under [MIT](http://opensource.org/licenses/MIT "The MIT licence") license and [CC BY 3.0 FR](http://creativecommons.org/licenses/by/3.0/fr/).
*Copyright (c) 2013 Gaël Poupard*
