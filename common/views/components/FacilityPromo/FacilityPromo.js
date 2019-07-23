// @flow
import { spacing, font } from '../../../utils/classnames';
import { trackEvent } from '../../../utils/ga';
import Icon from '../Icon/Icon';
import { UiImage } from '../Images/Images';
import type { ImageType } from '../../../model/image';

type Props = {|
  id: string,
  url: string,
  title: string,
  imageProps: ImageType,
  description: string,
  metaText: ?string,
  metaIcon: ?string,
|};

const sizesQueries =
  '(min-width: 1420px) 475px, (min-width: 960px) 34.32vw, (min-width: 600px) calc(50vw - 54px), calc(100vw - 36px)';

const FacilityPromo = ({
  id,
  url,
  title,
  imageProps,
  description,
  metaText,
  metaIcon,
}: Props) => {
  const uiImageProps = {
    ...imageProps,
    sizesQueries,
  };
  return (
    <a
      data-component="FacilityPromo"
      onClick={() => {
        trackEvent({
          category: 'FacilityPromo',
          action: 'follow link',
          label: title,
        });
      }}
      id={id}
      href={url}
      className="plain-link promo-link"
    >
      <div>
        <div className="rounded-corners overflow-hidden">
          <UiImage {...uiImageProps} />
        </div>

        <h2
          className={`"promo-link__title ${font('wb', 4)} ${spacing(
            { s: 2 },
            { margin: ['top'] }
          )}`}
        >
          {title}
        </h2>
        <p className={`${font('hnl', 4)} no-margin no-padding`}>
          {description}
        </p>

        {metaText && (
          <div className={`${spacing({ s: 3 }, { padding: ['top'] })}`}>
            <div className={`${font('hnm', 4)} flex flex--v-center`}>
              {metaIcon && (
                <Icon name={metaIcon} extraClasses="margin-right-s1" />
              )}
              <span>{metaText}</span>
            </div>
          </div>
        )}
      </div>
    </a>
  );
};
export default FacilityPromo;
