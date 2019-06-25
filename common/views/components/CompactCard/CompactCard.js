// @flow
import { type Element, type ElementProps, type Node } from 'react';
import {
  grid,
  font,
  spacing,
  conditionalClassNames,
  classNames,
} from '../../../utils/classnames';
import { trackEvent } from '../../../utils/ga';
import DateRange from '../DateRange/DateRange';
import EventDateRange from '../EventDateRange/EventDateRange';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import LabelsList from '../LabelsList/LabelsList';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import PartNumberIndicator from '../PartNumberIndicator/PartNumberIndicator';
import ImageType from '../Image/Image';
import { type ColorSelection } from '../../../model/color-selections';

type Props = {|
  url: ?string,
  title: string,
  labels: ElementProps<typeof LabelsList>,
  description: ?string,
  urlOverride: ?string,
  extraClasses?: string,
  partNumber: ?number,
  color: ?ColorSelection,
  Image: ?Element<typeof ImageType | typeof ImagePlaceholder>,
  DateInfo: ?(Element<typeof DateRange> | Element<typeof EventDateRange>),
  StatusIndicator: ?Element<typeof StatusIndicator>,
  ExtraInfo?: ?Node,
|};

const CompactCard = ({
  url,
  title,
  labels,
  description,
  urlOverride,
  extraClasses,
  partNumber,
  color,
  Image,
  DateInfo,
  StatusIndicator,
  ExtraInfo,
}: Props) => {
  const textGridSizes = Image
    ? { s: 9, m: 9, l: 9, xl: 9 }
    : { s: 12, m: 12, l: 12, xl: 12 };

  const Tag = url ? 'a' : 'div';
  return (
    <Tag
      href={urlOverride || url}
      className={conditionalClassNames({
        grid: true,
        'card-link': Boolean(url),
        [spacing({ s: 3 }, { padding: ['bottom', 'top'] })]: true,
        [extraClasses || '']: Boolean(extraClasses),
      })}
      onClick={() => {
        trackEvent({
          category: 'CompactCard',
          action: 'follow link',
          label: title,
        });
      }}
    >
      {Image && (
        <div className={grid({ s: 3, m: 3, l: 3, xl: 3 })}>{Image}</div>
      )}
      <div className={grid(textGridSizes)}>
        {labels.labels.length > 0 && (
          <div>
            <LabelsList {...labels} />
          </div>
        )}
        {partNumber && (
          <PartNumberIndicator number={partNumber} color={color} />
        )}
        <div
          className={classNames({
            'card-link__title': true,
            [font({ s: 'WB5' })]: true,
            [spacing({ s: 0 }, { margin: ['top'] })]: true,
          })}
        >
          {title}
        </div>
        {DateInfo}
        {StatusIndicator}
        {ExtraInfo}
        {description && (
          <div className="spaced-text">
            <p className={font({ s: 'HNL4' })}>{description}</p>
          </div>
        )}
      </div>
    </Tag>
  );
};

export default CompactCard;
