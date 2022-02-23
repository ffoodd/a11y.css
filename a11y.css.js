const fs = require('fs')
const path = require('path')
const showdown = require('showdown')
const fm = require('front-matter')
const prism = require('prismjs')
const loadLanguages = require('prismjs/components/');
loadLanguages(['scss', 'css-extras']);

const DIRECTORIES = {
  css: {
    input: './css/'
  },
  sass: {
    input: './sass/themes/',
    output: './site/_data/sass/'
  },
  api: {
    input: './sass/utils/',
    output: './site/_data/sass/'
  },
  assets: {
    js: {
      input: './site/assets/js/'
    }
  },
  static: './site/static/'
}

DIRECTORIES.assets.js.output = DIRECTORIES.static
DIRECTORIES.css.output = DIRECTORIES.static + 'css/'

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
  let processedContent = new showdown.Converter({
    tables: true,
    customizedHeaderId: true,
    ghCompatibleHeaderId: true
  }).makeHtml(content.body)

  const headingsRegex = /(<h([2-5]).*>(.*)<\/h[2-5]>)/gim
  processedContent = processedContent.replace(headingsRegex, `<h$2>$3</h$2>`)

  // HTML code blocks
  const markupRegex = /((<pre><code class="html language-html">)(.[\s\S]+?)(\/code><\/pre>))/gm
  const htmlRegex = /((?<=<code class="html language-html">)(.[\s\S]+?)(?=<\/code>))/gm
  let htmlContent = processedContent.match(htmlRegex)
  htmlContent = String(htmlContent).replace(/(&lt;)+/g, '<')
  htmlContent = htmlContent.replace(/(&gt;)+/g, '>')
  let processedHTML = prism.highlight(htmlContent, prism.languages.html, 'html')
  processedContent = processedContent.replace(markupRegex, `<div class="pre"><div>${htmlContent}</div><pre><code class="html language-html" data-language="Example">${processedHTML}</code></pre></div>`)

  // CSS code blocks
  const stylesRegex = /((<pre><code class="css language-css">)(.[\s\S]+?)(\/code><\/pre>))/gm
  const cssRegex = /((?<=<code class="css language-css">)(.[\s\S]+?)(?=<\/code>))/gm
  let cssContent = processedContent.match(cssRegex)
  let processedCSS = prism.highlight(String(cssContent), prism.languages.css, 'css-extras')
  processedContent = processedContent.replace(stylesRegex, `<div class="pre"><pre><code class="css language-css" data-language="CSS">${processedCSS}</code></pre></div>`)

  // SCSS code blocks
  const scssBlockRegex = /((<pre><code class="scss language-scss">)(.[\s\S]+?)(\/code><\/pre>))/gm
  const scssRegex = /((?<=<code class="scss language-scss">)(.[\s\S]+?)(?=<\/code>))/gm
  let scssContent = processedContent.match(scssRegex)
  scssContent = String(scssContent).replace(/(&amp;)+/g, '&')
  let processedSCSS = prism.highlight(String(scssContent), prism.languages.scss, 'scss')
  processedContent = processedContent.replace(scssBlockRegex, `<div class="pre"><pre><code class="scss language-scss" data-language="Sass">${processedSCSS}</code></pre></div>`)

  // Sass code blocks
  const sassBlockRegex = /((<pre><code class="sass language-sass">)(.[\s\S]+?)(\/code><\/pre>))/gm
  const sassRegex = /((?<=<code class="sass language-sass">)(.[\s\S]+?)(?=<\/code>))/gm
  const sassContent = processedContent.match(sassRegex)
  let processedSASS = prism.highlight(String(sassContent), prism.languages.scss, 'scss')
  processedContent = processedContent.replace(sassBlockRegex, `<div class="pre"><pre><code class="scss language-scss" data-language="Sass">${processedSASS}</code></pre></div>`)

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
  fs.rmSync(DIRECTORIES.sass.output, { recursive: true, force: true })
  fs.rmSync(DIRECTORIES.api.output, { recursive: true, force: true })

  fs.readdirSync(DIRECTORIES.sass.input).forEach(file => {
    processSassDocumentation(DIRECTORIES.sass.input + file)
  })

  let contentAPI = []
  fs.readdirSync(DIRECTORIES.api.input).forEach((file) => {
    if (['_all'].includes(path.basename(file, '.scss'))) {
      return
    }

    contentAPI = contentAPI.concat(processApiDocumentation(DIRECTORIES.api.input + file))
  })

  // Write Eleventy data files
  fs.writeFileSync(
    `${DIRECTORIES.api.output}/api.json`,
    JSON.stringify(contentAPI, null, 2)
  )
}

module.exports = function () {
  generateJsonDocumentation()
}
