var fs = require('fs');
var path = require('path');

const LOCALES_DIR = './locales'
const dictionary = fs.readdirSync(LOCALES_DIR).reduce((acc, file) => {
  const lang = path.basename(file, '.json')
  const langPath = path.join(__dirname, '..', '..', LOCALES_DIR, file)
  acc[lang] = require(langPath)
  return acc
}, {})

module.exports = dictionary
