import { env } from './.env';

export const environment = {
  production: true,
  hmr: true,
  version: env.npm_package_version + '-dev',
  chuckNorrisServerUrl: 'https://api.chucknorris.io',
  github: {
    url: {
      api: 'https://api.github.com',
      common: 'https://github.com',
      avatar: 'https://avatars0.githubusercontent.com',
    },
    searchUsers: {
      pages: 10,
      perPage: 500,
    },
  },
  defaultLanguage: 'pt-BR',
  supportedLanguages: ['en-US', 'fr-FR', 'pt-BR'],
};
