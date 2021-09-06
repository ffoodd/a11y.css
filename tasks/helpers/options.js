module.exports = {
  source: './sass/**/*.scss',
  destination: './css',
  webextension: './webextension/**/*',
  webextensioncsssource: './css/a11y-*_*.css',
  webextensioncsslang: './css/webextension/show-lang.css',
  webextensionmvcsssource: './css/a11y-!(*[*_]*).css',
  webextensioncssdest: './webextension/css',
  webextensionpolyfill: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
  autoprefixer: { browsers: ['last 1 versions'] },
  scsslint: { config: '.scsslint.yml' },
  locales: ['en','fr','ru','zh','pt-br', 'gr', 'ar'],
  localesdest: 'sass/locales/'
};
