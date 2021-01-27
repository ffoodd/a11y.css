const fs = require('fs')
const path = require('path')
const showdown = require('showdown')
const fm = require('front-matter')
const prism = require('prismjs')
const loadLanguages = require('prismjs/components/');
loadLanguages(['scss']);
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
  api: {
    input: './sass/utils/',
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

const processApiDocumentation = file => {
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
  if (!fs.existsSync(DIRECTORIES.api.output)) {
    fs.mkdirSync(DIRECTORIES.api.output)
  }

  return comments
}

const parseSassComment = comment => {
  // Remove CSS comments syntax
  comment = comment.replace(/(\/\*doc|\*\/)/g, '').trim()

  const content = fm(comment)
  let processedContent = new showdown.Converter({tables: true}).makeHtml(content.body)

  const markupRegex = /((<pre><code class="html language-html">)(.[\s\S]+?)(\/code><\/pre>))/gm
  const stylesRegex = /((<pre><code class="css language-css">)(.[\s\S]+?)(\/code><\/pre>))/gm
  const sassRegex = /((<pre><code class="scss language-scss">)(.[\s\S]+?)(\/code><\/pre>))/gm

  const htmlRegex = /((?<=<code class="html language-html">)(.[\s\S]+?)(?=<\/code>))/gm
  let htmlContent = processedContent.match(htmlRegex)
  htmlContent = String(htmlContent).replace(/(&lt;)+/g, '<')
  htmlContent = htmlContent.replace(/(&gt;)+/g, '>')
  let processedHTML = prism.highlight(htmlContent, prism.languages.html, 'html')

  const cssRegex = /((?<=<code class="css language-css">)(.[\s\S]+?)(?=<\/code>))/gm
  let cssContent = processedContent.match(cssRegex)
  let processedCSS = prism.highlight(String(cssContent), prism.languages.css, 'css')

  const scssRegex = /((?<=<code class="scss language-scss">)(.[\s\S]+?)(?=<\/code>))/gm
  let scssContent = processedContent.match(scssRegex)
  let processedSCSS = prism.highlight(String(scssContent), prism.languages.scss, 'scss')

  processedContent = processedContent.replace(markupRegex, `<div class="pre"><div>${htmlContent}</div><pre><code class="html language-html">${processedHTML}</code></pre></div>`)
  processedContent = processedContent.replace(stylesRegex, `<div class="pre"><pre><code class="css language-css">${processedCSS}</code></pre></div>`)
  processedContent = processedContent.replace(sassRegex, `<div class="pre"><pre><code class="scss language-scss">${processedSCSS}</code></pre></div>`)

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
  fs.rmdirSync(DIRECTORIES.api.output, { recursive: true })

  fs.readdirSync(DIRECTORIES.sass.input).forEach(file => {
    processSassDocumentation(DIRECTORIES.sass.input + file)
  })

  let contentAPI = {}
  fs.readdirSync(DIRECTORIES.api.input).forEach((file, index) => {
    contentAPI[index] = processApiDocumentation(DIRECTORIES.api.input + file)
  })

  // Write Eleventy data files
  fs.writeFileSync(
    `${DIRECTORIES.api.output}/api.json`,
    JSON.stringify(contentAPI, null, 2)
  )
}

module.exports = function () {
  parseAssets()
  generateJsonDocumentation()
}
