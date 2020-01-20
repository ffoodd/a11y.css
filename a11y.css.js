const fs = require('fs')
const path = require('path')
const showdown = require('showdown')
const fm = require('front-matter')

const INPUT_DIRECTORY = './sass/themes/'
const OUTPUT_DIRECTORY = './src/_data/sass/'

const processSassDocumentation = (file) => {
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
  if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY)
  }

  // Write Eleventy data files
  fs.writeFileSync(
    `${OUTPUT_DIRECTORY}/${inputFilename.replace('_', '')}.json`,
    JSON.stringify(comments, null, 2)
  )
}

const parseSassComment = comment => {
  // Remove CSS comments syntax
  comment = comment.replace(/(\/\*doc|\*\/)/g, '').trim()

  const content = fm(comment)

  return {
    attributes: content.attributes,
    body: new showdown.Converter().makeHtml(content.body)
  }
}

const generateJsonDocumentation = () => {
  /**
   * Remove output directory before creating it again
   * @note This is an experimental feature and requires Node v12.10.0 at least
   * @see https://nodejs.org/api/fs.html#fs_fs_rmdirsync_path_options
   */
  fs.rmdirSync(OUTPUT_DIRECTORY, { recursive: true })

  fs.readdirSync(INPUT_DIRECTORY).forEach(file => {
    processSassDocumentation(INPUT_DIRECTORY + file)
  })
}

module.exports = function () {
  generateJsonDocumentation()
}
