import { getDotenvSync } from '@karmaniverous/get-dotenv';
import NextBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';
import webpack from 'webpack';
import withLess from 'next-with-less';

const webpackReplace = (pattern, replace) =>
  new webpack.NormalModuleReplacementPlugin(pattern, (resource) => {
    const replacement = resource.request.replace(pattern, replace);

    // console.log(`Webpack Replace ${resource.request} with ${replacement}`);

    resource.request = replacement;
  });

// Import package.json to get version number.
import packagejson from './package.json' assert { type: 'json' };

const nextConfig = {
  env: {
    ...getDotenvSync({
      env: process.env.ENV ?? 'dev',
      paths: ['./env'],
    }),
    NEXT_PUBLIC_NPM_PACKAGE_VERSION: packagejson.version,
  },
  lessLoaderOptions: {
    lessOptions: { math: 'always' },
  },

  redirects: async () => {
    return [];
  },

  webpack: (config) => {
    config.resolve.alias['../../theme.config$'] = path.join(
      config.context,
      '/semantic-ui/theme.config'
    );

    if (process.env.NODE_ENV === 'development') {
      config.resolve.alias['../../semantic-ui/semantic-ui'] = path.join(
        config.context,
        '/semantic-ui'
      );

      config.plugins.push(
        webpackReplace(/^.+(\/themes\/.*)$/, 'semantic-ui-less$1')
      );
    }

    return config;
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const plugins = [withLess, withBundleAnalyzer];

export default plugins.reduce((config, plugin) => plugin(config), nextConfig);
