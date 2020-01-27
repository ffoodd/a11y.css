---
layout: "templates/page"
---

# a11y.css

## Introduction

Pronounced "Alix".

This <abbr title="Cascading StyleSheet" aria-label="Cascading StyleSheet">CSS</abbr> file intends to warn developers about <b>possible risks and mistakes</b> that exist in HTML code. It can also be used to roughly evaluate a site's quality by simply including it as an external stylesheet.

## How to use?

### WebExtension

Either you're using <a href="https://addons.mozilla.org/en-GB/firefox/addon/a11ycss/" target="_blank" rel="noopener noreferrer">Firefox&nbsp;<span class="sr-only">(external link)</span>{% include "icons/external-link.svg" %}</a> or <a href="https://chrome.google.com/webstore/detail/a11ycss/iolfinldndiiobhednboghogkiopppid?hl=fr" target="_blank" rel="noopener noreferrer">Chrome&nbsp;<span class="sr-only">(external link)</span>{% include "icons/external-link.svg" %}</a>, you're invited to install and use a11y.css's webextension.

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

The main caveat consists of <abbr title="Content Security Policy" aria-label="Content Security Policy">CSP</abbr> HTTP headers blocking unsafe / external script — mostly due to browsers bugs and inconsistencies. But many <abbr title="Cross Origin Resource Sharing" aria-label="Cross Origin Resource Sharing">CORS</abbr> policies might prevent a bookmarklet from working…

But also note that the bookmarklet might take a couple of seconds to load since it basically injects the `a11y.css` stylesheet within the <abbr title="Document Object Model" aria-label="Document Object Model">DOM</abbr> of the page you're browsing. It might be a bit slow at first because it is being downloaded from GitHub, but it's the price to pay to keep it <b>up-to-date</b>.

## Contribution

If you want to get involved in this project, be sure to [take a look at its wiki](https://github.com/ffoodd/a11y.css/wiki). I'll be pleased to read your issues or pull requests!
