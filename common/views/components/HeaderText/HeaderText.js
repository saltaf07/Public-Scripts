// @flow

import { font, spacing } from '../../../utils/classnames';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import type { Node, Element } from 'react';

type Props = {|
  Breadcrumb: ?Element<typeof Breadcrumb>,
  Heading: ?Node,
  DateInfo: ?Node,
  InfoBar: ?Node,
  Description: ?Node,
|};

const HeaderText = ({
  Breadcrumb,
  Heading,
  DateInfo,
  Description,
  InfoBar,
}: Props) => {
  return (
    <div className={spacing({ s: 2 }, { padding: ['top'] })}>
      <div className={spacing({ s: 3, m: 4 }, { margin: ['top', 'bottom'] })}>
        {Breadcrumb}
      </div>
      {Heading}

      {DateInfo && <div className={`${font('hnl', 4)}`}>{DateInfo}</div>}

      {Description && (
        <div
          className={`${font('hnm', 4)} ${spacing(
            { s: 3 },
            { margin: ['top'] }
          )} first-para-no-margin`}
        >
          {Description}
        </div>
      )}

      {InfoBar && (
        <div
          className={`${font('hnm', 4)} ${spacing(
            { s: 3 },
            { margin: ['top', 'bottom'] }
          )}`}
        >
          {InfoBar}
        </div>
      )}
    </div>
  );
};

export default HeaderText;
