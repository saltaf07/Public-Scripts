// @flow
import type { Card as CardType } from '@weco/common/model/card';
import { font, classNames } from '../../../utils/classnames';
import { trackEvent } from '../../../utils/ga';
import { UiImage } from '../Images/Images';
import LabelsList from '../LabelsList/LabelsList';
import Space from '../styled/Space';

type Props = {|
  item: CardType,
|};

const Card = ({ item }: Props) => {
  return (
    <a
      href={item.link}
      className="plain-link promo-link bg-cream rounded-corners overflow-hidden flex-ie-block flex--column"
      onClick={() => {
        trackEvent({
          category: 'Card',
          action: 'follow link',
          label: `${item.title || ''}`,
        });
      }}
    >
      <div className="relative">
        {item.image && (
          <UiImage
            {...item.image}
            sizesQueries="(min-width: 1420px) 386px, (min-width: 960px) calc(28.64vw - 15px), (min-width: 600px) calc(33.24vw - 43px), calc(100vw - 36px)"
            showTasl={false}
          />
        )}
        {item.format && (
          <div style={{ position: 'absolute', bottom: 0 }}>
            <LabelsList labels={[{ url: null, text: item.format.title }]} />
          </div>
        )}
      </div>

      <Space
        v={{
          size: 'm',
          properties: ['padding-top', 'padding-bottom'],
        }}
        h={{ size: 'm', properties: ['padding-left', 'padding-right'] }}
        className={classNames({
          'flex flex--column flex-1 flex--h-space-between': true,
        })}
      >
        <div>
          {item.title && (
            <Space
              v={{
                size: 's',
                properties: ['margin-bottom'],
              }}
              as="h2"
              className={classNames({
                'promo-link__title': true,
                [font('wb', 3)]: true,
              })}
            >
              {item.title}
            </Space>
          )}

          {item.description && (
            <p className={`${font('hnl', 5)} no-padding no-margin`}>
              {item.description}
            </p>
          )}
        </div>
      </Space>
    </a>
  );
};

export default Card;
