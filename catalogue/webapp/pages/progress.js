// @flow
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import {spacing, grid} from '@weco/common/utils/classnames';
import ReactMarkdown from 'react-markdown';
// $FlowFixMe
import PROGRESS_NOTES from './PROGRESS_NOTES.md';

const title = 'We are working to make a more welcoming space where you can' +
              'discover more of what Wellcome Collection has to offer.';

const ProgressPage = () => (
  <PageLayout
    title={title}>
    <div className={`row ${spacing({s: 5}, {padding: ['top']})}`}>
      <div className='container'>
        <div className='grid'>
          <div className={`${grid({s: 12, m: 11, l: 8, xl: 7})}`}>
            <div className='body-text'>
              <ReactMarkdown source={PROGRESS_NOTES} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);

export default ProgressPage;
