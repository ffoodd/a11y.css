const a11yCSS = require('./a11y.css')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(a11yCSS)
  eleventyConfig.addPlugin(syntaxHighlight, {
    templateFormats: ["njk", "md"]
  })

  eleventyConfig.addPassthroughCopy('src/static')

  return {
    dir: {
      input: 'src'
    },
    markdownTemplateEngine: 'njk'
  }
}
