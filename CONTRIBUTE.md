Contributing to `a11y.css`
==========================

You can contribute to `a11y.css` by adding a language or tackling a known issue listed below.

*PS: CSS best practices do not belong to this CSS file. Some selectors are ugly as hell, but we need them in order to select what we need to select.*

## Add languages

`a11y.css` currently exists in both English and French: you'll find both files in the [css](https://github.com/ffoodd/a11y.css/tree/master/css) folder. If you want to contribute and add a new language, it is very easy to do:

1. Add the name of the language in [this list](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_mixins.scss#L10);
2. Copy [`_a11y-en.scss`](https://github.com/ffoodd/a11y.css/blob/master/sass/a11y-en.scss), rename it `_a11y-<your-language>.scss` and change the value passed to the `set-locale` mixin;
3. Update [this map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L10) with your translations.
4. Update [this map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L241) to translate theme names.
5. Run `sass --update sass:css --style=compressed` to generate the new CSS file.

Done!

## Edge cases and known issues

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
 * [What no one told you about z-index](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) ([translated in French by @iamvdo](http://blog.iamvdo.me/post/41094013194/comprendre-z-index-et-les-contextes-dempilement)).

## Automatisation

We all have to stay up-to-date, so you'll find a [Gulp](http://gulpjs.com/) configuration file.
Some useful tasks are ready-to-run.

If you run `gulp` you'll compile Sass files and prettify the CSS output.

You can also launch `gulp docs`, which will generate the whole documentation *via* both SassDoc and Hologram, or `gulp lints` which lints scss and CSS files.

Each task can be run individually:
* `gulp sass`
* `gulp css`
* `gulp scss-lint`
* `gulp css-lint`
* `gulp sassdoc`
* `gulp hologram`

And of course you can watch for changes to automatically compile Sass and optimize the CSS output using `gulp watch` — which also lints scss and CSS files after compiling.

## Documentation

### Building SassDoc

With global SassDoc install:

```sh
$ npm install sassdoc -g
$ sassdoc sass/ --dest docs/SassDoc/ --verbose --config configs/.sassdocrc
```

With local SassDoc install:

```sh
$ npm install
$ node_modules/sassdoc/bin/sassdoc sass/ --dest docs/SassDoc/ --verbose --config configs/.sassdocrc
```

### Build Hologram

This one is easy. Using command line, just `cd` to `a11y.css` then run `hologram -c configs/hologram_config.yml`.
Et voilà !

To learn more about Hologram, take a look at [their GitHub repository](https://github.com/trulia/hologram).
