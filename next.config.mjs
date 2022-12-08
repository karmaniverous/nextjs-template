export default {
  redirects: async () => {
    return [];
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const plugins = [withLess, withBundleAnalyzer];

export default plugins.reduce((config, plugin) => plugin(config), nextConfig);
