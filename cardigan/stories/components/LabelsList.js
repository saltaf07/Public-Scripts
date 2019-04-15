import { storiesOf } from '@storybook/react';
import LabelsList from '../../../common/views/components/LabelsList/LabelsList';

const stories = storiesOf('Components', module);
stories.add('LabelsList', () => (
  <LabelsList
    labels={[
      { url: null, text: 'Gallery tour' },
      { url: null, text: 'Audio described' },
    ]}
  />
));
