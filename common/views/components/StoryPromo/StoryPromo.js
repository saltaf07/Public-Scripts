// @flow
import type { Article } from '../../../model/articles';
import { spacing, font, classNames } from '../../../utils/classnames';
import { trackEvent } from '../../../utils/ga';
import { getPositionInSeries, getArticleColor } from '../../../model/articles';
import { UiImage } from '../Images/Images';
import LabelsList from '../LabelsList/LabelsList';
import PartNumberIndicator from '../PartNumberIndicator/PartNumberIndicator';

type Props = {|
  item: Article,
  position: number,
  hidePromoText?: boolean,
  hasTransparentBackground?: boolean,
  sizesQueries?: string,
|};

const StoryPromo = ({
  item,
  position,
  hidePromoText = false,
  hasTransparentBackground = false,
  sizesQueries = `(min-width: 1420px) 386px, (min-width: 960px) calc(28.64vw - 15px), (min-width: 600px) calc(50vw - 54px), calc(100vw - 36px)`,
}: Props) => {
  const positionInSeries = getPositionInSeries(item);
  return (
    <a
      onClick={() => {
        trackEvent({
          category: 'StoryPromo',
          action: 'follow link',
          label: `${item.id} | position: ${position}`,
        });
      }}
      href={(item.promo && item.promo.link) || `/articles/${item.id}`}
      className={classNames({
        'story-promo': true,
        'plain-link': true,
        'promo-link': true,
        'bg-cream': !hasTransparentBackground,
        'rounded-corners': true,
        'overflow-hidden': true,
        'flex-ie-block': true,
        'flex--column': true,
      })}
    >
      <div className="relative story-promo__image">
        {/* FIXME: Image type tidy */}
        {item.promoImage && (
          // $FlowFixMe
          <UiImage
            {...item.promoImage}
            sizesQueries={sizesQueries}
            showTasl={false}
          />
        )}

        {item.labels.length > 0 && (
          <div style={{ position: 'absolute', bottom: 0 }}>
            <LabelsList labels={item.labels} />
          </div>
        )}
      </div>

      <div
        className={classNames({
          'story-promo__text': true,
          'flex flex--column flex-1': true,
          'flex--h-space-between': !hasTransparentBackground,
          [spacing({ s: 2 }, { padding: ['top'] })]: true,
          [spacing(
            { s: hasTransparentBackground ? 0 : 2 },
            { padding: ['left', 'right'] }
          )]: true,
          [spacing({ s: 4 }, { padding: ['bottom'] })]: true,
        })}
      >
        <div>
          {positionInSeries && (
            <PartNumberIndicator
              number={positionInSeries}
              color={getArticleColor(item)}
            />
          )}
          <h2
            className={`
            promo-link__title
            ${font({ s: 'WB5' })}
            ${spacing({ s: 0 }, { margin: ['top'] })}
            ${spacing({ s: 1 }, { margin: ['bottom'] })}
          `}
          >
            {item.title}
          </h2>
          {!hidePromoText && (
            <div
              className={classNames({
                'inline-block': true,
                [font({ s: 'HNL4' })]: true,
                [spacing({ s: 1 }, { margin: ['bottom'] })]: true,
              })}
            >
              {item.promoText}
            </div>
          )}
        </div>

        <div>
          {item.series.length > 0 && (
            <div className={spacing({ s: 4 }, { margin: ['top'] })}>
              {item.series.map(series => (
                <p
                  key={series.title}
                  className={`${font({ s: 'HNM5' })} no-margin`}
                >
                  <span className={font({ s: 'HNL5' })}>Part of</span>{' '}
                  {series.title}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default StoryPromo;
