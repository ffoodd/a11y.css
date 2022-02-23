const a11yCSS = require('./a11y.css')

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPlugin(a11yCSS)

  eleventyConfig.addPassthroughCopy('site/static')
  eleventyConfig.addPassthroughCopy({'css/a11y-en_*-only.css': 'static/css'})
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)

  eleventyConfig.addWatchTarget('site/static/docs.css')
  eleventyConfig.addWatchTarget('site/static/docs.js')

  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    ghostMode: false,
    open: true,
    browser: 'firefox',
  })

  return {
    dir: {
      input: 'site',
      output: 'docs'
    },
    markdownTemplateEngine: 'njk'
  }
}
