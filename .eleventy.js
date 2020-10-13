const a11yCSS = require('./a11y.css')
const SassDoc = require('./sassdoc')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(a11yCSS)
  eleventyConfig.addPlugin(SassDoc)

  eleventyConfig.addPassthroughCopy('src/static')

  return {
    dir: {
      input: 'src'
    },
    markdownTemplateEngine: 'njk'
  }
}
