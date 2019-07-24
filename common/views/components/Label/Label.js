// @flow
import { font, spacing } from '../../../utils/classnames';
import type { Label as LabelType } from '../../../model/labels';

export type Props = {|
  label: LabelType,
|};

const Label = ({ label }: Props) => {
  const HtmlTag = label.url ? 'a' : 'span';

  return (
    <HtmlTag
      href={label.url}
      className={`
      line-height-1
      ${
        label.url
          ? 'plain-link font-white bg-green bg-hover-black'
          : 'font-black bg-yellow'
      }
      ${font('hnm', 6)}
      ${spacing({ s: 1 }, { padding: ['top', 'bottom', 'left', 'right'] })}
    `}
      style={{ display: 'block', whiteSpace: 'nowrap' }}
    >
      {label.text}
    </HtmlTag>
  );
};

export default Label;
