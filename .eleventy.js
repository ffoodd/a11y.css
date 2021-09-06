const a11yCSS = require('./a11y.css')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(a11yCSS)

  eleventyConfig.addPassthroughCopy('site/static')

  return {
    dir: {
      input: 'site',
      output: 'docs'
    },
    markdownTemplateEngine: 'njk'
  }
}
