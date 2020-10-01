const fs = require('fs')
const path = require('path')
const showdown = require('showdown')
const fm = require('front-matter')
const prism = require('prismjs')
const postcss = require('postcss')
const atImport = require('postcss-import')
const uglify = require('uglify-es')
const cssnano = require('cssnano')

const DIRECTORIES = {
  css: {
    input: './css/'
  },
  sass: {
    input: './sass/themes/',
    output: './src/_data/sass/'
  },
  assets: {
    css: {
      input: './src/assets/css/',
    },
    js: {
      input: './src/assets/js/'
    }
  },
  static: './src/static/'
}

DIRECTORIES.assets.css.output = DIRECTORIES.static
DIRECTORIES.assets.js.output = DIRECTORIES.static
DIRECTORIES.css.output = DIRECTORIES.static + 'css/'

const parseAssets = () => {
  /**
   * We need some of a11y.css compiled stylesheets to be available in the templates
   * 1. Avoid crash if output directory does not exists
   * 2. Then copy/paste all the files (manually for now, because of naming inconsistencies)
   */
  if (!fs.existsSync(DIRECTORIES.css.output)) {
    fs.mkdirSync(DIRECTORIES.css.output)
  }

  fs.copyFileSync(DIRECTORIES.css.input + 'a11y-en_advices-only.css', DIRECTORIES.css.output + 'a11y-en_advices-only.css')
  fs.copyFileSync(DIRECTORIES.css.input + 'a11y-en_errors-only.css', DIRECTORIES.css.output + 'a11y-en_errors-only.css')
  fs.copyFileSync(DIRECTORIES.css.input + 'a11y-en_obsolete-only.css', DIRECTORIES.css.output + 'a11y-en_obsoletes-only.css')
  fs.copyFileSync(DIRECTORIES.css.input + 'a11y-en_warnings-only.css', DIRECTORIES.css.output + 'a11y-en_warnings-only.css')

  /**
   * Process docs styles and scripts
   */
  const CSS_INPUT = DIRECTORIES.assets.css.input + 'docs.css'
  const CSS = fs.readFileSync(CSS_INPUT, 'utf8')
  const JS = fs.readFileSync(DIRECTORIES.assets.js.input + 'docs.js', 'utf8')

  // Parse and write CSS output file
  postcss([atImport, cssnano])
    .process(CSS, {
      from: CSS_INPUT
    })
    .then(result => {
      fs.writeFileSync(DIRECTORIES.assets.css.output + 'docs.css', result.css)
    })

  // Uglify and write JS output file
  fs.writeFileSync(DIRECTORIES.assets.js.output + 'docs.js', uglify.minify(JS).code)
}

const processSassDocumentation = file => {
  const inputFileExtension = path.extname(file)
  const inputFilename = path.basename(file, inputFileExtension)
  const excludeFiles = ['_all']

  // Exclude files that we don't want to process
  if (inputFileExtension !== '.scss' || excludeFiles.includes(inputFilename)) {
    return
  }

  const content = fs.readFileSync(file, 'utf8')
  const commentBlockRegex = /\/\*doc(.)*?\*\//gs

  const comments = Array.from(content.matchAll(commentBlockRegex), data => {
    return parseSassComment(data[0])
  })

  // Avoid crash if output directory does not exists
  if (!fs.existsSync(DIRECTORIES.sass.output)) {
    fs.mkdirSync(DIRECTORIES.sass.output)
  }

  // Write Eleventy data files
  fs.writeFileSync(
    `${DIRECTORIES.sass.output}/${inputFilename.replace('_', '')}.json`,
    JSON.stringify(comments, null, 2)
  )
}

const parseSassComment = comment => {
  // Remove CSS comments syntax
  comment = comment.replace(/(\/\*doc|\*\/)/g, '').trim()

  const content = fm(comment)
  let processedContent = new showdown.Converter().makeHtml(content.body)

  const htmlRegex = /(<code class="html language-html">(.[\s\S]+?)<\/code>)/gm
  let htmlContent = processedContent.match(htmlRegex)
  let processedHTML = prism.highlight(String(htmlContent), prism.languages.html, 'html')
  const cssRegex = /(<code class="css language-css">(.[\s\S]+?)<\/code>)/gm
  let cssContent = processedContent.match(cssRegex)
  let processedCSS = prism.highlight(String(cssContent), prism.languages.css, 'css')

  processedContent = processedContent.replace(htmlRegex, processedHTML)
  processedContent = processedContent.replace(cssRegex, processedCSS)

  return {
    attributes: content.attributes,
    body: processedContent
  }
}

const generateJsonDocumentation = () => {
  /**
   * Remove output directory before creating it again
   * @note This is an experimental feature and requires Node v12.10.0 at least
   * @see https://nodejs.org/api/fs.html#fs_fs_rmdirsync_path_options
   */
  fs.rmdirSync(DIRECTORIES.sass.output, { recursive: true })

  fs.readdirSync(DIRECTORIES.sass.input).forEach(file => {
    processSassDocumentation(DIRECTORIES.sass.input + file)
  })
}

module.exports = function () {
  parseAssets()
  generateJsonDocumentation()
}
