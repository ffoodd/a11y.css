import a11yCSS from './a11y.css.js'

export default function (eleventyConfig) {
	eleventyConfig.setUseGitIgnore(false)

	eleventyConfig.addPlugin(a11yCSS)

	eleventyConfig.addPassthroughCopy('site/static')
	eleventyConfig.addPassthroughCopy({
		'node_modules/a11y-syntax-highlighting/dist/prism/a11y-light.min.css': 'static/css/a11y-light.min.css'
	})
	eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)
	eleventyConfig.addShortcode('version', () => `${Date.now()}`)
	eleventyConfig.addWatchTarget('site/static/css/docs.css')
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
