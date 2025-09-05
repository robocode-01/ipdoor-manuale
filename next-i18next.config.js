/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en', 'de', 'es', 'nl', 'fr']
  },
  defaultNS: 'common',
  ns: ['common'],
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};
