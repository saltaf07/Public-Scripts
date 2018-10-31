// @flow
import {Component} from 'react';
import {asHtml} from '../../../services/prismic/parsers';
import {parseVenuesToOpeningHours} from '../../../services/prismic/opening-times';
import DefaultPageLayout from '../DefaultPageLayout/DefaultPageLayout';
import ErrorPage from '../BasePage/ErrorPage';
import type Moment from 'moment';
import type {ComponentType} from 'react';
import type {OgType, SiteSection, JsonLdObject} from '../DefaultPageLayout/DefaultPageLayout';
import type {GroupedVenues, OverrideType} from '../../../model/opening-hours';

const isServer = typeof window === 'undefined';
// As this is a store, it's mutable
const clientStore = isServer ? null : new Map();
const serverStore = isServer ? new Map() : null;

export function pageStore(prop: string) {
  const val = isServer
    ? serverStore && serverStore.get(prop)
    : clientStore && clientStore.get(prop);

  return val || {};
}

function parseOpeningHours(openingTimes) {
  const galleriesLibrary = openingTimes && openingTimes.placesOpeningHours.filter(venue => {
    return venue.name.toLowerCase() === 'galleries' || venue.name.toLowerCase() === 'library';
  });
  const restaurantCafeShop = openingTimes && openingTimes.placesOpeningHours.filter(venue => {
    return venue.name.toLowerCase() === 'restaurant' || venue.name.toLowerCase() === 'café' || venue.name.toLowerCase() === 'shop';
  });
  const groupedVenues = {
    galleriesLibrary: {
      title: 'Venue',
      hours: galleriesLibrary
    },
    restaurantCafeShop: {
      title: 'Eat & Shop',
      hours: restaurantCafeShop
    }
  };

  return {
    collectionOpeningTimes: openingTimes,
    groupedVenues: groupedVenues,
    upcomingExceptionalOpeningPeriods: openingTimes.upcomingExceptionalOpeningPeriods
  };
}

type Props = {|
  title: string,
  description: string,
  type: OgType,
  canonicalUrl: string,
  imageUrl: string,
  pageJsonLd: JsonLdObject,
  siteSection: SiteSection,
  analyticsCategory: string,
  openingTimes: {
    // TODO: Flow fix
    collectionOpeningTimes: any,
    groupedVenues: GroupedVenues,
    upcomingExceptionalOpeningPeriods: {dates: Moment[], type: OverrideType}[]
  },
  toggles: any,
  globalAlert: any, // TODO
  statusCode: ?number,
  oEmbedUrl?: string
|}

// TODO: Make this universally available
type GetInitialPropsClientProps = {
  path: string,
  query: { [string]: any },
  jsonPageRes: Response, // Fetch Response
  asPath: string,
  err: Error,
  req: null,
  res: null
}

type GetInitialPropsServerProps = {|
  path: string,
  query: { [string]: any },
  jsonPageRes: null,
  asPath: string,
  req: Request,
  res: Response,
  err: Error
|}

export type GetInitialPropsProps = GetInitialPropsServerProps | GetInitialPropsClientProps

type NextComponent = {
  getInitialProps?: (props: GetInitialPropsProps) => any
} & $Subtype<ComponentType<any>>

const PageWrapper = (Comp: NextComponent) => {
  return class Global extends Component<Props> {
    static async getInitialProps(context: GetInitialPropsProps) {
      const globalAlertData = context.query.globalAlert;
      const globalAlert = {
        text: asHtml(globalAlertData.text),
        isShown: globalAlertData.isShown === 'show'
      };

      // There's a lot of double checking here, which makes me think we've got
      // the typing wrong.
      const toggles = context.req
        ? context.query.toggles
        : clientStore && clientStore.get('toggles');

      const openingTimes = context.req
        ? parseOpeningHours(parseVenuesToOpeningHours(context.query.openingTimes))
        : clientStore && clientStore.get('openingTimes');

      if (serverStore) {
        serverStore.set('toggles', toggles);
        serverStore.set('openingTimes', openingTimes);
      }

      return {
        openingTimes,
        toggles,
        globalAlert,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(context) : null)
      };
    }

    constructor(props: Props) {
      super(props);

      if (clientStore && !clientStore.get('toggles')) {
        clientStore.set('toggles', props.toggles);
      }
      if (clientStore && !clientStore.get('openingTimes')) {
        clientStore.set('openingTimes', props.openingTimes);
      }
    }

    render() {
      const {
        title,
        description,
        type,
        canonicalUrl,
        imageUrl,
        pageJsonLd,
        siteSection,
        analyticsCategory,
        openingTimes,
        globalAlert,
        oEmbedUrl,
        ...props
      } = this.props;

      if (this.props.statusCode && this.props.statusCode !== 200) {
        return <DefaultPageLayout
          title={`${this.props.statusCode}`}
          description='Nothing to see here, literally, nothing'
          type='website'
          canonicalUrl='https://wellcomecollection.org'
          imageUrl='https://iiif.wellcomecollection.org/image/V0021348.jpg/full/760,/0/default.jpg'
          pageJsonLd={{'@type': 'WebPage'}}
          siteSection='error'
          analyticsCategory='error'
          openingTimes={openingTimes}
          globalAlert={globalAlert}>
          <ErrorPage errorStatus={this.props.statusCode} />
        </DefaultPageLayout>;
      }

      return (
        <DefaultPageLayout
          title={title}
          description={description}
          type={type}
          canonicalUrl={canonicalUrl}
          imageUrl={imageUrl}
          pageJsonLd={pageJsonLd}
          siteSection={siteSection}
          analyticsCategory={analyticsCategory}
          openingTimes={openingTimes}
          globalAlert={globalAlert}
          oEmbedUrl={oEmbedUrl}>
          <Comp {...props} />
        </DefaultPageLayout>
      );
    }
  };
};

export default PageWrapper;
