module.exports = {
  source: './sass/**/*.scss',
  destination: './css',
  hologramsource: './docs/Hologram/test-assets',
  hologramhtmlsource: './docs/Hologram/tests/*.html',
  hologramhtmldest: './docs/Hologram/tests/',
  sassdochtmlsource: './docs/SassDoc/**/*.html',
  sassdochtmldest: './docs/SassDoc/',
  webextension: './webextension/**/*',
  webextensioncsssource: './css/a11y-*_*.css',
  webextensioncssdest: './webextension/css',
  autoprefixer: { browsers: ['last 2 versions'] },
  scsslint: { config: 'configs/.scsslint.yml' },
  sassdoc: {
    dest: 'docs/SassDoc',
    theme: 'alix',
    display: {
      access: ['public'],
      alias: false,
      watermark: true
    },
    groups: {
      'undefined': 'Configuration',
      'languages': 'Translation'
    },
    basePath: 'https://github.com/ffoodd/a11y.css/tree/master/sass'
  }
};
