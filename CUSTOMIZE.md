Build a custom a11y.css
=======================

## Building leveled file

You are now able to customize the file output by targeting a severity treshold. You just have to personalize the single parameter in `set-minimum-level` mixin. Levels are cumulative, and reflect theme's names:
* `error`: only errors;
* `warning`: warnings and errors;
* `obsolete`: obsolete stuff, warnings and errors;
* `advice`: every messages.

We are assuming that looking for advices means that you care about obsoletes, warnings and errors.

Credits to [@HugoGiraudel](https://twitter.com/HugoGiraudel) in [#69](https://github.com/ffoodd/a11y.css/issues/69).

## Disabling tests

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

## Customizing messages

Each test has its own message, trying to explain and guide you as much as possible. All messages are [gathered in a Sass map](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L1), in both English and French. It should be quite easy for you to update the messages for internal use if you don't like them.

You can use the `attr()` CSS function in messages to show the real value of an attribute.

### Customizing colors

Errors, warnings and advices are outlined by a 4px colored border:

* red for errors;
* yellow for warnings;
* blue for obsolete stuff;
* green for advices.

Those colors are customisable through [the configuration file](https://github.com/ffoodd/a11y.css/blob/master/sass/utils/_variables.scss#L230). When hovering marked elements, a little banner should appear on top of your browser displaying what's going on.

## About selectors

Given the very long list of selectors to test, [they are splitted across several files](https://github.com/ffoodd/a11y.css/tree/master/sass/themes). Errors are in their own file, advices in their own, and so on.

*Please notice that you can build a single level file* (obsolete stuff only, for example), and adjust it to your very own issues. You may want to fix errors, or to learn from few advices.

### Cancel a selector

When the `:not()` selector cannot be precise enough, you may add a second selector to extend the `%a11y-reset` placeholder, which tries to cancel the test in your second case. However a few styles from the original page will still be overrided.

### Extend a selector to target self-closing tags and replaced elements

Generic selector like `[class]` may targetself-closing tags and replaced elements (see "Edge cases and known issues" section). Some selectors are now extended with `@void-tags` mixin, that improve selector to target those weird tags, and repeat the associated message (adding `$self-closing: true`).

### Quarantine

When a selector is not cross-browser, you may send it to quarantine as it won't invalidate other selectors.

Just switch the boolean argument `$quarantine: true`.
