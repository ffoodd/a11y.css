const a11yCSS = require('./a11y.css')

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPlugin(a11yCSS)

  eleventyConfig.addPassthroughCopy('site/static')
  eleventyConfig.addPassthroughCopy({
    'css/a11y-en_errors-only.css': 'static/css/a11y-en_errors-only.css',
    'css/a11y-en_warnings-only.css': 'static/css/a11y-en_warnings-only.css',
    'css/a11y-en_obsoletes-only.css': 'static/css/a11y-en_obsoletes-only.css',
    'css/a11y-en_advices-only.css': 'static/css/a11y-en_advices-only.css',
    'node_modules/a11y-syntax-highlighting/dist/prism/a11y-light.min.css': 'static/css/a11y-light.min.css'
  })
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)
  eleventyConfig.addShortcode('version', () => `${Date.now()}`)
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
