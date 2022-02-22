const a11yCSS = require('./a11y.css')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(a11yCSS)

  eleventyConfig.addPassthroughCopy('site/static')
  eleventyConfig.addPassthroughCopy({'css/a11y-en_*-only.css': 'static/css'})
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: 'site',
      output: 'docs'
    },
    markdownTemplateEngine: 'njk'
  }
}
