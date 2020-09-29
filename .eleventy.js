const a11yCSS = require('./a11y.css')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(a11yCSS)

  eleventyConfig.addPassthroughCopy('src/static')

  return {
    dir: {
      input: 'src'
    },
    markdownTemplateEngine: 'njk'
  }
}
