module.exports = {
  source: './sass/**/*.scss',
  destination: './css',
  hologramsource: './docs/Hologram/test-assets',
  hologramhtmlsource: './docs/Hologram/tests/*.html',
  hologramhtmldest: './docs/Hologram/tests/',
  sassdochtmlsource: './docs/SassDoc/**/*.html',
  sassdochtmldest: './docs/SassDoc/',
  autoprefixer: { browsers: ['last 1 version'] },
  scsslint: { config: 'configs/.scsslint.yml' },
  locales: ['en','fr','ru','zh','pt-br', 'gr', 'ar'],
  localesdest: 'sass/locales/',
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
