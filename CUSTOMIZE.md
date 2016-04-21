Build a custom `a11y.css`
=========================

## Building leveled file

You are now able to customize the file output by targeting a severity treshold. You just have to personalize the single parameter in `set-minimum-level` mixin. Levels are cumulative, and reflect theme's names:
* `error`: only errors;
* `warning`: warnings and errors;
* `obsolete`: obsolete stuff, warnings and errors;
* `advice`: every messages.

We are assuming that looking for advices means that you care about obsoletes, warnings and errors.

Credits to [@HugoGiraudel](https://twitter.com/HugoGiraudel) in [#69](https://github.com/ffoodd/a11y.css/issues/69).

## Disabling tests

It is possible to disable some specific tests if you build your own `a11y.css` file with the `disable-tests(..)` mixin.

For instance, if you want to disable the errors about messing with tabindex and missing href, you can do:

```scss
@include disable-tests('error:tab-order', 'error:no-href');
```

You can find the exact key names in JSON files in the `locales/` folder.

Credits to [@HugoGiraudel](https://twitter.com/HugoGiraudel) in [#69](https://github.com/ffoodd/a11y.css/issues/113).

## Customizing messages

Each test has its own message, trying to explain and guide you as much as possible. All messages are [gathered in a Sass map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L1), in both English and French. It should be quite easy for you to update the messages for internal use if you don't like them.

You can use the `attr()` CSS function in messages to show the real value of an attribute.

### Customizing colors

Errors, warnings and advices are outlined by a 4px colored border:

* red for errors;
* yellow for warnings;
* blue for obsolete stuff;
* green for advices.

Those colors are customisable through [the configuration file](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L333).

## About selectors

Given the very long list of selectors to test, [they are splitted across several files](https://github.com/ffoodd/a11y.css/tree/master/sass/themes). Errors are in their own file, advices in their own, and so on.

*Please notice that you can build a single level file* (obsolete stuff only, for example), and adjust it to your very own issues. You may want to fix errors, or to learn from few advices.

### Cancel a selector

When the `:not()` selector cannot be precise enough, you may add a second selector to use the `a11y-reset` mixin, which tries to cancel the test in your second case. However a few styles from the original page will still be overrided.

```scss
button:not([type]):not([form]):not([formaction]):not([formtarget]) {
  @include error('not-form-button');
}

form button:not([type]):not([form]):not([formaction]):not([formtarget]) {
  @include a11y-reset;
}
```

### Extend a selector to target self-closing tags and replaced elements

Generic selector like `[class]` may target self-closing tags and replaced elements. Some selectors are now extended with `@void-tags` mixin, that improve selector to target those weird tags, and repeat the associated message (adding `$self-closing: true`).

```scss
:not(img):not(object):not(embed):not(svg):not(canvas)[width],
:not(img):not(object):not(embed):not(svg):not(canvas)[height] {
  @include error('dimensions');

  @include void-tags {
    @include error('dimensions', $self-closing: true);
  }
}
```

### Customise messages

Each test comes with its own message, in order to inform and help developper searching for improvement. They are in a separate json file, to make reading and writing easier. Customizing will also be much easier.

You may use the CSS `attr()` function in messages to show the real value of an attribute.

Here is an example in [`locales/en.json`](https://github.com/ffoodd/a11y.css/blob/master/locales/en.json):

```json
"advice:duplicate-roles": "ARIA role attr(role) should be unique, but this one is the second!",
```
