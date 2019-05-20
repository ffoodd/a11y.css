a11y.css
========

Pronounced *Alix*. Because it’s simpler.

[![GitHub version](https://badge.fury.io/gh/ffoodd%2Fa11y.css.svg)](https://badge.fury.io/gh/ffoodd%2Fa11y.css)
[![Build Status](https://travis-ci.org/ffoodd/a11y.css.svg?branch=master)](https://travis-ci.org/ffoodd/a11y.css)

## Introduction

Pronounced "Alix".

This CSS file intends to warn developers about *possible risks and mistakes* that exist in HTML code. It can also be used to roughly evaluate a site's quality by simply including it as an external stylesheet.

When activating the stylesheet, a tip should appear beside each incriminated elements, displaying what’s going on.

*This file is not a replacement to a complete tool such as [aXe](https://www.deque.com/products/axe/), [Tanaguru](http://www.tanaguru.com/en/) or [Tenon](http://tenon.io/). It only intends to show possible weaknesses. You should obviously do some manual check by hand to know whether the code should or should not be fixed.*


## How to use?

### WebExtension

Either you're using [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/a11ycss/) or [Chrome](https://chrome.google.com/webstore/detail/a11ycss/iolfinldndiiobhednboghogkiopppid?hl=en), you're invited to install and use a11y.css's webextension.

It provides some nice features not included in the main CSS file (for now), such as:

* force focus visibility;
* show lang attributes;
* check images' alternatives by displaying them;
* increase text spacings.

As a WebExtension, it also enables to:

* toggle CSS and change level on the fly, 
* remember settings for each tab,
* automatically update in the background.

### Bookmarklet

You can also use the form on the left sidebar to define the minimum level and language, in order to generate a custom bookmarklet. Then simply drag the green button to your bookmarks, and you're done! You're now able to use a11y.css on every page you visit by simply clicking on this bookmark.

#### Bookmarklet's caveats

The main caveat consists of CSP HTTP headers blocking unsafe / external script — mostly due to browsers bugs and inconsistencies. But many CORS policies might prevent a bookmarklet from working…

But also note that the bookmarklet might take a couple of seconds to load since it basically injects the `a11y.css` stylesheet within the DOM of the page you're browsing. It might be a bit slow at first because it is being downloaded from GitHub, but it's the price to pay to keep it *up-to-date*.

## Contribution & customisation

If you want to get involved in this project, be sure to [take a look at its wiki](https://github.com/ffoodd/a11y.css/wiki) (also [available in French](https://github.com/ffoodd/a11y.css/wiki/Introduction)). I'll be pleased to read your issues or pull requests!
