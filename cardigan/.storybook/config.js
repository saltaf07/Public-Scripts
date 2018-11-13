import { default as React, Fragment } from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import styleguideSass from '../../common/styles/styleguide.scss';
import nonCriticalSass from '../../common/styles/non-critical.scss';

function loadStories() {
  const components = require.context('../stories/components', true, /\.js$/);
  const global = require.context('../stories/global', true, /\.js$/);
  const docs = require.context('../stories/docs', true, /\.js$/);
  const wip = require.context('../stories/wip', true, /\.js$/);

  components.keys().forEach((filename) => components(filename));
  global.keys().forEach((filename) => global(filename));
  docs.keys().forEach((filename) => docs(filename));
  wip.keys().forEach((filename) => wip(filename));
}

addDecorator(withKnobs);
addDecorator(checkA11y);
addDecorator(withInfo({
  header: false,
  inline: true,
  source: false,
  propTables: false
}));

const styles = {
  padding: '30px',
};
const CenterDecorator = (storyFn) => (
  <Fragment>
    <style id='styleguide-sass'>
      {styleguideSass}
    </style>
    <style id='non-critical-sass'>
      {nonCriticalSass}
    </style>
    <div style={styles} className='enhanced'>
      { storyFn() }
    </div>
  </Fragment>
);
addDecorator(CenterDecorator);

const AppJsDecorator = (storyFn) => {
  const appJs = document.getElementById('app-js');
  const script = document.createElement('script');
  script.src = 'js/app.js';
  appJs.parentElement.removeChild(appJs);
  script.id = 'app-js';
  document.head.appendChild(script);
  return storyFn();
};
addDecorator(AppJsDecorator);


setOptions({
  name: 'Cardigan',
  url: 'https://cardigan.wellcomecollection.org',
  addonPanelInRight: true,
  hierarchySeparator: /\//,
  sortStoriesByKind: true
});

configure(loadStories, module);
