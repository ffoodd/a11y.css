Contributing to a11y.css
========================

You can contribute to a11y.css by adding a language or tackling a known issue listed below.

*PS: CSS best practices do not belong to this CSS file. Some selectors are ugly as hell, but we need them in order to select what we need to select.*

## Add languages

a11y.css currently exists in both English and French: you'll find both files in the [css](https://github.com/ffoodd/a11y.css/tree/master/css) folder. If you want to contribute and add a new language, it is very easy to do:

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
 * [What no one told you about z-index](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) ([translated in French by @iamvdo](http://blog.iamvdo.me/post/41094013194/comprendre-z-index-et-les-contextes-dempilement))

3. Along the same lines, tests on elements that are contained within `<head>` cannot be displayed (since `<head>` is a hidden element). I need to find a way to do this.

 *Issue [#66](https://github.com/ffoodd/a11y.css/issues/66) opened by [@7studio](https://twitter.com/7studio) (again) helped with this point, thanks to [an idea](https://mathiasbynens.be/notes/css-hidden-elements) from [Mathias Bynens](https://twitter.com/mathias).

4. To avoid cases when outline could be hidden, the property [outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset) is being used in order to display it inside the element (rather than outside). Thanks to [@7studio](https://twitter.com/7studio) in [#4](https://github.com/ffoodd/a11y.css/issues/4).

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

To learn more about Hologram, take a look at [their GitHub repository](https://github.com/trulia/hologram).


## Technical structure
### Counters

CSS counters are incremented on each error/advice/warning and results are displayed with `html::after`. Since it is added through CSS, it is basically fake-content which is good since it is no more than visual indication for the user to see what's going on.

*Note: this counter takes into account possible issues with elements within `<head>` tag. Related messages are not displayed, but they do increment the counter correctly, as any other issue.*
