import { HTMLString } from '../../../services/prismic/types';
import { font, classNames } from '../../../utils/classnames';
import { ReactElement, FunctionComponent } from 'react';
import PrismicHtmlBlock from '../PrismicHtmlBlock/PrismicHtmlBlock';
import Space from '../styled/Space';

type Props = {
  caption: HTMLString;
  preCaptionNode?: ReactElement;
  width?: number | null | undefined;
};

const Caption: FunctionComponent<Props> = ({
  caption,
  preCaptionNode,
  width,
}: Props) => {
  return (
    <Space
      v={{
        size: 'm',
        properties: ['margin-top'],
      }}
      as="figcaption"
      style={width ? { width: `${width}px` } : undefined}
      className={classNames({
        [font('lr', 6)]: true,
        'caption h-center': true,
      })}
    >
      <div
        className={classNames({
          'overflow-hidden': true,
        })}
        style={{ maxWidth: '55em' }}
      >
        {preCaptionNode}
        <Space
          h={{ size: 'm', properties: ['padding-left'] }}
          className={`border-left-width-1`}
          style={{ borderColor: 'currentColor' }}
        >
          <PrismicHtmlBlock html={caption} />
        </Space>
        <style>{'.caption p { display: inline; }'}</style>
      </div>
    </Space>
  );
};

export default Caption;
