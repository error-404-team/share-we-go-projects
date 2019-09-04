import React from 'react';
import ReactDOM from 'react-dom';
import vrtest from 'vrtest/client';
import webfontloader from 'webfontloader';
import { createMuiTheme } from 'share-we-go-ui/styles';
import { ThemeProvider } from 'share-we-go-styles';
import TestViewer from './TestViewer';

const theme = createMuiTheme();

// Get all the tests specifically written for preventing regressions.
const requireRegression = require.context('./tests', true, /js$/);
const regressions = requireRegression.keys().reduce((res, path) => {
  const [suite, name] = path
    .replace('./', '')
    .replace('.js', '')
    .split('/');
  res.push({
    path,
    suite: `regression-${suite}`,
    name,
    case: requireRegression(path).default,
  });
  return res;
}, []);

const blacklistSuite = [
  // Flaky
  'web-app-components-progress',

  // Internal dependencies
  'web-app-discover-more-languages',

  // Needs interaction
  'web-app-components-click-away-listener',
  'web-app-components-dialogs',
  'web-app-components-menus',
  'web-app-components-tooltips',
  'web-app-components-transitions',

  // Documentation extension
  'web-app-getting-started-templates',
  'web-app-customization-default-theme',

  // Image load issue
  'web-app-components-skeleton',
  'web-app-discover-more-team',
  'web-app-getting-started-templates-album',
  'web-app-getting-started-templates-blog',
  'web-app-getting-started-templates-sign-in-side',

  // Useless
  'web-app-', // Home
  'web-app-discover-more-showcase',
  'web-app-guides',
  'web-app-versions',
  'web-app-layouts',
  'web-app-customization-color',
];

const blacklistFilename = [
  'web-app-components-grid-list/tileData.png', // no component
  'web-app-css-in-js-basics/StressTest.png', // strange bug no time for it
  'web-app-components-steppers/SwipeableTextMobileStepper.png', // external img
  'web-app-components-steppers/TextMobileStepper.png', // external img
  'web-app-getting-started-usage/Usage.png', // codesandbox iframe
  'web-app-customization-typography/ResponsiveFontSizesChart.png', // Chart
  'web-app-components-material-icons/synonyms.png', // Not a component

  // Already tested once assembled
  'web-app-getting-started-templates-dashboard/Chart.png',
  'web-app-getting-started-templates-dashboard/Deposits.png',
  'web-app-getting-started-templates-dashboard/Orders.png',
  'web-app-getting-started-templates-dashboard/Title.png',
  'web-app-getting-started-templates-checkout/AddressForm.png',
  'web-app-getting-started-templates-checkout/PaymentForm.png',
  'web-app-getting-started-templates-checkout/Review.png',

  // Flaky
  'web-app-components-grid-list/ImageGridList.png',
  'web-app-components-icons/FontAwesome.png',
  'web-app-components-tree-view/CustomizedTreeView.png',

  // Redux isolation
  'web-app-components-chips/ChipsPlayground.png',
  'web-app-components-popover/AnchorPlayground.png',
  'web-app-components-popper/ScrollPlayground.png',
  'web-app-components-grid/InteractiveGrid.png',
  'web-app-customization-density/DensityTool.png',
];

// Also use some of the demos to avoid code duplication.
const requireDemos = require.context('web-app/src/pages', true, /js$/);
const demos = requireDemos.keys().reduce((res, path) => {
  const [name, ...suiteArray] = path
    .replace('./', '')
    .replace('.js', '')
    .split('/')
    .reverse();
  const suite = `web-app-${suiteArray.reverse().join('-')}`;

  if (blacklistSuite.includes(suite)) {
    return res;
  }

  if (blacklistFilename.includes(`${suite}/${name}.png`)) {
    return res;
  }

  if (/^web-app-premium-themes(.*)/.test(suite)) {
    return res;
  }

  res.push({
    path,
    suite,
    name,
    case: requireDemos(path).default,
  });

  return res;
}, []);

const rootEl = document.createElement('div');
rootEl.style.display = 'inline-block';

vrtest.before(() => {
  if (document && document.body) {
    document.body.appendChild(rootEl);
  }

  return new Promise((resolve, reject) => {
    webfontloader.load({
      google: {
        families: ['Roboto:300,400,500', 'Material+Icons'],
      },
      custom: {
        families: ['Font Awesome 5 Free:400,900'],
        urls: ['https://use.fontawesome.com/releases/v5.1.0/css/all.css'],
      },
      timeout: 20000,
      active: () => {
        resolve('webfontloader: active');
      },
      inactive: () => {
        reject(new Error('webfontloader: inactive'));
      },
    });
  });
});

let suite;

const tests = regressions.concat(demos);
tests.forEach(test => {
  if (!suite || suite.name !== test.suite) {
    suite = vrtest.createSuite(test.suite);
  }

  const TestCase = test.case;

  if (!TestCase) {
    return;
  }

  suite.createTest(test.name, () => {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <TestViewer>
          <TestCase />
        </TestViewer>
      </ThemeProvider>,
      rootEl,
    );
  });
});
