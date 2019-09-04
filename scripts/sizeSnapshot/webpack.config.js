const fse = require('fs-extra');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const workspaceRoot = path.join(__dirname, '..', '..');

async function getSizeLimitBundles() {
  const nextDir = path.join(workspaceRoot, 'web-app/.next');
  const buildId = await fse.readFile(path.join(nextDir, 'BUILD_ID'), 'utf8');

  const dirname = path.join(nextDir, 'static/chunks');
  const [main] = (await fse.readdir(dirname)).reduce((result, filename) => {
    if (filename.length === 31) {
      return [...result, { path: `${dirname}/${filename}` }];
    }

    return result;
  }, []);

  return [
    {
      name: 'share-we-go-ui/Paper',
      webpack: true,
      path: 'packages/share-we-go-ui/build/Paper/index.js',
    },
    {
      name: 'share-we-go-ui/Paper.esm',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/Paper/index.js',
    },
    {
      name: 'share-we-go-ui',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/index.js',
    },
    {
      name: 'share-we-go-ui/styles/createMuiTheme',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/styles/createMuiTheme.js',
    },
    {
      name: 'share-we-go-lab',
      webpack: true,
      path: 'packages/share-we-go-lab/build/esm/index.js',
    },
    {
      name: 'share-we-go-styles',
      webpack: true,
      path: 'packages/share-we-go-styles/build/esm/index.js',
    },
    {
      name: 'share-we-go-system',
      webpack: true,
      path: 'packages/share-we-go-system/build/esm/index.js',
    },
    {
      name: 'colorManipulator',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/styles/colorManipulator.js',
    },
    {
      // why we use esm here: https://github.com/mui-org/share-we-go-ui/pull/13391#issuecomment-459692816
      name: 'Button',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/Button/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-modal
      // vs https://bundlephobia.com/result?p=@reach/dialog
      name: 'Modal',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/Modal/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-popper
      name: 'share-we-go-ui/Popper',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/Popper/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-responsive
      // vs https://bundlephobia.com/result?p=react-media
      name: 'share-we-go-ui/useMediaQuery',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/useMediaQuery/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-focus-lock
      name: 'share-we-go-ui/TrapFocus',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/Modal/TrapFocus.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-textarea-autosize
      // vs https://bundlephobia.com/result?p=react-autosize-textarea
      name: 'share-we-go-ui/Textarea',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/TextareaAutosize/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=rc-slider
      name: 'Slider',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/Slider/index.js',
    },
    {
      name: 'Rating',
      webpack: true,
      path: 'packages/share-we-go-lab/build/esm/Rating/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-portal
      name: 'Portal',
      webpack: true,
      path: 'packages/share-we-go-ui/build/esm/Portal/index.js',
    },
    {
      name: 'web-app.main',
      webpack: false,
      path: path.relative(workspaceRoot, main.path),
    },
    {
      name: 'web-app.landing',
      webpack: false,
      path: path.relative(workspaceRoot, path.join(nextDir, `static/${buildId}/pages/index.js`)),
    },
  ];
}

module.exports = async function webpackConfig() {
  const entries = await getSizeLimitBundles();
  const entry = entries.reduce((acc, bundle) => {
    acc[bundle.name] = path.join(workspaceRoot, bundle.path);
    return acc;
  }, {});

  const config = {
    entry,
    // ideally this would be computed from the bundles peer dependencies
    externals: /^(react|react-dom)$/,
    mode: 'production',
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'build'),
    },
    plugins: [new CompressionPlugin()],
    resolve: {
      alias: {
        'share-we-go-ui': path.join(workspaceRoot, 'packages/share-we-go-ui/build'),
        'share-we-go-lab': path.join(workspaceRoot, 'packages/share-we-go-lab/build'),
        'share-we-go-styles': path.join(workspaceRoot, 'packages/share-we-go-styles/build'),
        'share-we-go-system': path.join(workspaceRoot, 'packages/share-we-go-system/build'),
        'share-we-go-utils': path.join(workspaceRoot, 'packages/share-we-go-utils/build'),
      },
    },
  };

  return config;
};
