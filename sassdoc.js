const fs = require('fs')
const path = require('path')
const showdown = require('showdown')
const fm = require('front-matter')

const DIRECTORIES = {
  sassdoc: {
    input: './sass/utils/',
    output: './src/_data/sassdoc/'
  }
}

const processSassDoc = file => {
  const inputFileExtension = path.extname(file)
  const inputFilename = path.basename(file, inputFileExtension)
  const excludeFiles = ['_all']

  // Exclude files that we don't want to process
  if (inputFileExtension !== '.scss' || excludeFiles.includes(inputFilename)) {
    return
  }

  const content = fs.readFileSync(file, 'utf8')
  const commentBlockRegex = /\/\/\//gs

  const comments = Array.from(content.matchAll(commentBlockRegex), data => {
    return parseSassDoc(data[0])
  })

  // Avoid crash if output directory does not exists
  if (!fs.existsSync(DIRECTORIES.sassdoc.output)) {
    fs.mkdirSync(DIRECTORIES.sassdoc.output)
  }

  // Write Eleventy data files
  fs.writeFileSync(
    `${DIRECTORIES.sassdoc.output}/${inputFilename.replace('_', '')}.json`,
    JSON.stringify(comments, null, 2)
  )
}

const parseSassDoc = comment => {
  // Remove SassDoc comments syntax
  comment = comment.replace(/(\/\/\/)/g, '').trim()

  const content = fm(comment)
  let processedContent = new showdown.Converter().makeHtml(content.body)

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
  fs.rmdirSync(DIRECTORIES.sassdoc.output, { recursive: true })

  fs.readdirSync(DIRECTORIES.sassdoc.input).forEach(file => {
    processSassDoc(DIRECTORIES.sassdoc.input + file)
  })
}

module.exports = function () {
  generateJsonDocumentation()
}
