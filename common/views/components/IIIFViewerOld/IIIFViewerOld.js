// @flow
import styled from 'styled-components';
import { classNames, spacing, font } from '@weco/common/utils/classnames';
import NextLink from 'next/link';
import { itemUrl } from '@weco/common/services/catalogue/urls';
import { type IIIFCanvas } from '@weco/common/model/iiif';
import Paginator, {
  type PaginatorRenderFunctionProps,
  type PropsWithoutRenderFunction as PaginatorPropsWithoutRenderFunction,
} from '@weco/common/views/components/RenderlessPaginator/RenderlessPaginator';
import Control from '@weco/common/views/components/Buttons/Control/Control';
import IIIFResponsiveImage from '@weco/common/views/components/IIIFResponsiveImage/IIIFResponsiveImage';
import ImageViewer from '@weco/common/views/components/ImageViewer/ImageViewer';
import {
  convertIiifUriToInfoUri,
  iiifImageTemplate,
} from '@weco/common/utils/convert-image-uri';
import { imageSizes } from '../../../utils/image-sizes';

const IIIFViewerPaginatorButtons = styled.div.attrs(props => ({
  className: classNames({
    'flex absolute flex--h-center': true,
  }),
}))`
  right: ${props => props.theme.spacingUnit}px;
  bottom: ${props => (props.isThumbs ? '50%' : props.theme.spacingUnit + 'px')};
  transform: ${props => (props.isThumbs ? 'translateY(50%)' : null)};

  ${props =>
    props.isThumbs &&
    `
    @media (min-width: ${props.theme.sizes.medium}px) {
      bottom: ${props.theme.spacingUnit}px;
      left: 50%;
      transform: translateX(-50%) translateY(0%);

      .control__inner {
        transform: rotate(90deg);
      }
    }
  `}
`;

const IIIFViewerThumbNumber = styled.span.attrs(props => ({
  className: classNames({
    'line-height-1': true,
    'absolute bg-charcoal font-white': true,
    [font({ s: 'LR3' })]: true,
  }),
}))`
  top: ${props => props.theme.spacingUnit}px;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 2px 0;
  z-index: 1;
`;

const IIIFViewerThumb = styled.div.attrs(props => ({
  className: classNames({
    'relative flex flex--v-center': true,
    [spacing({ s: 1 }, { padding: ['top', 'right', 'bottom', 'left'] })]: true,
  }),
}))`
  height: 100%;
  width: 20%;
  margin-right: ${props => props.theme.spacingUnit}px;

  &:last-child {
    margin: 0;
  }

  @media (min-width: ${props => props.theme.sizes.medium}px) {
    height: 25%;
    width: 100%;
    margin-right: 0;
  }
`;

const IIIFViewerThumbs = styled.div.attrs(props => ({
  className: classNames({
    'flex flex--h-center relative bg-smoke': true,
  }),
}))`
  height: 20%;
  width: 100%;
  padding: 0 100px 0 0;

  @media (min-width: ${props => props.theme.sizes.medium}px) {
    height: 100%;
    flex-direction: column;
    width: 25%;
    padding: 0 0 ${props => props.theme.spacingUnit * 10}px;
  }
`;

const IIIFViewerMain = styled.div.attrs(props => ({
  className: classNames({
    'relative bg-charcoal font-white': true,
    [spacing({ s: 4 }, { padding: ['top'] })]: true,
    [spacing({ s: 1 }, { padding: ['right', 'left'] })]: true,
    [spacing({ s: 10 }, { padding: ['bottom'] })]: true,
  }),
}))`
  height: 80%;
  width: 100%;

  @media (min-width: ${props => props.theme.sizes.medium}px) {
    height: 100%;
    width: 75%;
  }
`;

const IIIFViewerXOfY = styled.span.attrs(props => ({
  className: classNames({
    'absolute font-white': true,
    [spacing({ s: 1 }, { margin: ['left', 'right'] })]: true,
    [font({ s: 'LR3' })]: true,
  }),
}))`
  top: ${props => props.theme.spacingUnit}px;
  left: 50%;
  transform: translateX(-50%);
`;

const IIIFViewerThumbLink = styled.a.attrs(props => ({
  className: classNames({
    'block h-center': true,
  }),
}))`
  height: 100%;

  img {
    border: 3px solid
      ${props => (props.isActive ? props.theme.colors.white : 'transparent')};
    transition: border-color 200ms ease;
  }
`;

const IIIFViewer = styled.div.attrs(props => ({
  className: classNames({
    'flex flex--wrap': true,
  }),
}))`
  width: 100vw;
  height: 90vh;
  flex-direction: row-reverse;

  img {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    overflow: scroll;
  }
`;

const IIIFViewerImageWrapper = styled.div.attrs(props => ({
  className: classNames({
    absolute: true,
  }),
}))`
  top: 30px;
  right: 0;
  bottom: 60px;
  left: 0;
`;

type IIIFCanvasThumbnailProps = {|
  canvas: IIIFCanvas,
  lang: string,
|};

const IIIFCanvasThumbnail = ({ canvas, lang }: IIIFCanvasThumbnailProps) => {
  const thumbnailService = canvas.thumbnail.service;
  const urlTemplate = iiifImageTemplate(thumbnailService['@id']);
  const smallestWidth = thumbnailService.sizes[0].width;
  const srcSet = thumbnailService.sizes
    .map(({ width }) => {
      return `${urlTemplate({ size: `${width},` })} ${width}w`;
    })
    .join(',');

  return (
    <IIIFResponsiveImage
      lang={lang}
      width={canvas.width}
      height={canvas.height}
      src={urlTemplate({ size: `${smallestWidth},` })}
      srcSet={srcSet}
      alt=""
      sizes={`(min-width: 600px) 200px, 100px`}
      isLazy={false}
    />
  );
};

const XOfY = ({ currentPage, totalPages }: PaginatorRenderFunctionProps) => (
  <IIIFViewerXOfY>
    {currentPage} of {totalPages}
  </IIIFViewerXOfY>
);

const PaginatorButtons = ({
  currentPage,
  totalPages,
  prevLink,
  nextLink,
}: PaginatorRenderFunctionProps) => {
  return (
    <div
      className={classNames({
        'flex flex--v-center flex--h-center': true,
      })}
    >
      {prevLink && (
        <Control
          scroll={false}
          replace={true}
          link={prevLink}
          type="light"
          icon="arrow"
          text="Previous page"
          extraClasses={classNames({
            [spacing({ s: 1 }, { margin: ['right'] })]: true,
            'icon--180': true,
          })}
        />
      )}
      {nextLink && (
        <Control
          scroll={false}
          replace={true}
          link={nextLink}
          type="light"
          icon="arrow"
          text="Next page"
          extraClasses={classNames({
            icon: true,
          })}
        />
      )}
    </div>
  );
};

type IIIFViewerProps = {|
  mainPaginatorProps: PaginatorPropsWithoutRenderFunction,
  thumbsPaginatorProps: PaginatorPropsWithoutRenderFunction,
  currentCanvas: ?IIIFCanvas,
  lang: string,
  canvasOcr: ?string,
  navigationCanvases: ?(IIIFCanvas[]),
  workId: string,
  query: ?string,
  workType: ?(string[]),
  itemsLocationsLocationType: ?(string[]),
  pageIndex: number,
  sierraId: string,
  pageSize: number,
  canvasIndex: number,
  iiifImageLocationUrl: ?string,
  imageUrl: ?string,
|};

const IIIFViewerComponent = ({
  mainPaginatorProps,
  thumbsPaginatorProps,
  currentCanvas,
  lang,
  canvasOcr,
  navigationCanvases,
  workId,
  query,
  workType,
  itemsLocationsLocationType,
  pageIndex,
  sierraId,
  pageSize,
  canvasIndex,
  iiifImageLocationUrl,
  imageUrl,
}: IIIFViewerProps) => {
  const mainImageService = {
    '@id': currentCanvas ? currentCanvas.images[0].resource.service['@id'] : '',
  };

  const urlTemplate =
    mainImageService['@id'] && iiifImageTemplate(mainImageService['@id']);
  const srcSet =
    urlTemplate &&
    imageSizes(2048)
      .map(width => {
        return `${urlTemplate({ size: `${width},` })} ${width}w`;
      })
      .join(',');

  return (
    <IIIFViewer>
      <IIIFViewerMain>
        <Paginator {...mainPaginatorProps} render={XOfY} />
        <IIIFViewerImageWrapper>
          {iiifImageLocationUrl && imageUrl && (
            <ImageViewer
              infoUrl={iiifImageLocationUrl}
              src={imageUrl}
              id={imageUrl}
              width={800}
              srcSet={''}
              canvasOcr={null}
              lang={null}
            />
          )}
          {mainImageService['@id'] && currentCanvas && (
            <ImageViewer
              id="item-page"
              infoUrl={convertIiifUriToInfoUri(mainImageService['@id'])}
              src={urlTemplate && urlTemplate({ size: '640,' })}
              srcSet={srcSet}
              width={currentCanvas.width}
              height={currentCanvas.height}
              canvasOcr={canvasOcr}
              lang={lang}
            />
          )}
        </IIIFViewerImageWrapper>
        <IIIFViewerPaginatorButtons>
          <Paginator {...mainPaginatorProps} render={PaginatorButtons} />
        </IIIFViewerPaginatorButtons>
      </IIIFViewerMain>

      <IIIFViewerThumbs>
        {imageUrl && (
          <IIIFViewerThumb key={imageUrl}>
            <Paginator
              {...thumbsPaginatorProps}
              render={({ rangeStart }) => (
                <NextLink
                  {...itemUrl({
                    workId,
                    page: pageIndex + 1,
                    sierraId,
                    langCode: lang,
                    canvas: pageSize * pageIndex + 1,
                  })}
                  scroll={false}
                  replace
                  passHref
                >
                  <IIIFViewerThumbLink isActive={true}>
                    <IIIFViewerThumbNumber>
                      <span className="visually-hidden">image </span>
                      {1}
                    </IIIFViewerThumbNumber>
                    <IIIFResponsiveImage
                      lang={lang}
                      width={100}
                      height={200}
                      src={imageUrl}
                      srcSet={''}
                      alt=""
                      sizes={`(min-width: 600px) 200px, 100px`}
                      isLazy={false}
                    />
                  </IIIFViewerThumbLink>
                </NextLink>
              )}
            />
          </IIIFViewerThumb>
        )}
        {navigationCanvases &&
          navigationCanvases.map((canvas, i) => (
            <IIIFViewerThumb key={canvas['@id']}>
              <Paginator
                {...thumbsPaginatorProps}
                render={({ rangeStart }) => (
                  <NextLink
                    {...itemUrl({
                      workId,
                      page: pageIndex + 1,
                      sierraId,
                      langCode: lang,
                      canvas: pageSize * pageIndex + (i + 1),
                    })}
                    scroll={false}
                    replace
                    passHref
                  >
                    <IIIFViewerThumbLink
                      isActive={canvasIndex === rangeStart + i - 1}
                    >
                      <IIIFViewerThumbNumber>
                        <span className="visually-hidden">image </span>
                        {rangeStart + i}
                      </IIIFViewerThumbNumber>
                      <IIIFCanvasThumbnail canvas={canvas} lang={lang} />
                    </IIIFViewerThumbLink>
                  </NextLink>
                )}
              />
            </IIIFViewerThumb>
          ))}
        <IIIFViewerPaginatorButtons isThumbs={true}>
          <Paginator {...thumbsPaginatorProps} render={PaginatorButtons} />
        </IIIFViewerPaginatorButtons>
      </IIIFViewerThumbs>
    </IIIFViewer>
  );
};

export default IIIFViewerComponent;
