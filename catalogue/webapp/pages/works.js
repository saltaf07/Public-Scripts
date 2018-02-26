// @flow

import fetch from 'isomorphic-unfetch';
import {font, grid, spacing, classNames} from '@weco/common/utils/classnames';
import criticalCss from '@weco/common/styles/critical.scss';
import DefaultPageLayout from '@weco/common/views/components/DefaultPageLayout/DefaultPageLayout';
import PageDescription from '@weco/common/views/components/PageDescription/PageDescription';
import InfoBanner from '@weco/common/views/components/InfoBanner/InfoBanner';
import Icon from '@weco/common/views/components/Icon/Icon';
import SearchBox from '@weco/common/views/components/SearchBox/SearchBox';
import StaticWorksContent from '@weco/common/views/components/StaticWorksContent/StaticWorksContent';
import Promo from '@weco/common/views/components/Promo/Promo';
import Pagination, {PaginationFactory} from '@weco/common/views/components/Pagination/Pagination';
import {Fragment, Component} from 'react';
import Router from 'next/router';

type Props = {|
  query: {| query?: string, page?: string |},
  works: {| results: [], totalResults: number |},
  pagination: Object,
  handleSubmit: () => void
|}

const WorksComponent = ({
  query,
  works,
  pagination,
  handleSubmit
}: Props) => (
  <DefaultPageLayout
    title='Image catalogue search | Wellcome Collection'
    description='Search through the Wellcome Collection image catalogue'
  >

    <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
    <PageDescription title='Search our images' extraClasses='page-description--hidden' />
    <InfoBanner text={`Coming from Wellcome Images? All freely available images have now been moved to the Wellcome Collection website. Here we're working to improve data quality, search relevance and tools to help you use these images more easily`} cookieName='WC_wellcomeImagesRedirect' />

    <div className={classNames([
      'row bg-cream',
      spacing({s: 3, m: 5}, {padding: ['top']}),
      spacing({s: 3, m: 4, l: 6}, {padding: ['bottom']})
    ])}>
      <div className='container'>
        <div className='grid'>
          <div className={grid({s: 12, m: 12, l: 12, xl: 12})}>
            <div className={classNames([
              'flex flex--h-space-between flex--v-center flex--wrap',
              spacing({s: 2}, {margin: ['bottom']})
            ])}>
              <h2 className={classNames([
                font({s: 'WB6', m: 'WB4'}),
                spacing({s: 2}, {margin: ['bottom']}),
                spacing({s: 4}, {margin: ['right']}),
                spacing({s: 0}, {margin: ['top']})
              ])}>Search our images</h2>
              <div className='flex flex--v-center'>
                <Icon name='underConstruction' extraClasses='margin-right-s2' />
                <p className='no-margin'>We’re improving how search works. <a href='/progress'>Find out more</a>.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='grid'>
          <div className={grid({s: 12, m: 10, l: 8, xl: 8})}>
            <SearchBox
              action=''
              id='search-works'
              name='query'
              query={decodeURIComponent(query.query || '')}
              autofocus={true}
              onSubmit={handleSubmit} />

            {!query.query
              ? <p className={classNames([
                spacing({s: 4}, {margin: ['top']}),
                font({s: 'HNL4', m: 'HNL3'})
              ])}>Find thousands of Creative Commons licensed images from historical library materials and museum objects to contemporary digital photographs.</p>
              : <p className={classNames([
                spacing({s: 2}, {margin: ['top', 'bottom']}),
                font({s: 'LR3', m: 'LR2'})
              ])}>{works.totalResults !== 0 ? works.totalResults : 'No'} results for &apos;{decodeURIComponent(query.query)}&apos;
              </p>
            }
          </div>
        </div>
      </div>
    </div>

    {!query.query &&
      <StaticWorksContent />
    }

    {query.query &&
      <Fragment>
        <div className={`row ${spacing({s: 3, m: 5}, {padding: ['top']})}`}>
          <div className="container">
            <div className="grid">
              <div className="grid__cell">
                <div className="flex flex--h-space-between flex--v-center">
                  {pagination && pagination.range &&
                    <Fragment>
                      <div className={`flex flex--v-center font-pewter ${font({s: 'LR3', m: 'LR2'})}`}>
                        Showing {pagination.range.beginning} - {pagination.range.end}
                      </div>
                      <Pagination
                        prevPage={pagination.prevPage}
                        currentPage={pagination.currentPage}
                        pageCount={pagination.pageCount}
                        nextPage={pagination.nextPage}
                        nextQueryString={pagination.nextQueryString}
                        prevQueryString={pagination.prevQueryString} />
                    </Fragment>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`row ${spacing({s: 4}, {padding: ['top']})}`}>
          <div className="container">
            <div className="grid">
              {works.results.map(result => (
                <div key={result.id} className={grid({s: 6, m: 4, l: 3, xl: 2})}>
                  <Promo
                    sizes='(min-width: 1340px) 178px, (min-width: 960px) calc(25vw - 52px), (min-width: 600px) calc(33.24vw - 43px), calc(50vw - 27px)'
                    id={result.id}
                    contentType='work'
                    image={{
                      contentUrl: result.thumbnail && result.thumbnail.url,
                      width: 300,
                      height: 300,
                      alt: ''
                    }}
                    datePublished={result.createdDate && result.createdDate.label}
                    isConstrained={true}
                    title={result.title}
                    defaultSize={180}
                    url={`/works/${result.id}${getQueryParamsForWork(query)}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    }
  </DefaultPageLayout>
);

class Works extends Component<Props> {
  handleSubmit: Function;
  static getInitialProps: Function;

  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event: any) {
    event.preventDefault();

    const queryString = encodeURIComponent(event.target[0].value);

    // Update the URL, which in turn will update props
    Router.push({
      pathname: '/works',
      query: {query: queryString, page: '1'}
    });
  }

  render() {
    return (
      <WorksComponent
        query={this.props.query}
        works={this.props.works}
        pagination={this.props.pagination}
        handleSubmit={this.handleSubmit} />
    );
  }
}

Works.getInitialProps = async ({ req, query }) => {
  const res = await fetch(`https://api.wellcomecollection.org/catalogue/v1/works${getInitialQueryParams(query)}`);
  const json = await res.json();
  const currentPage = query.page || 1;
  const pagination = PaginationFactory.fromList(json.results, Number(json.totalResults) || 1, Number(currentPage) || 1, json.pageSize || 1, {query: query.query});

  return {
    works: json,
    query: query,
    pagination: pagination
  };
};

export default Works;

function getQueryParamsForWork(query: {}) {
  return Object.keys(query).reduce((acc, currKey, index) => {
    return `${acc}${index > 0 ? '&' : ''}${currKey}=${query[currKey]}`;
  }, '?');
}

function getInitialQueryParams(query) {
  const defaults = '?includes=identifiers,thumbnail,items';
  const extra = Object.keys(query).reduce((acc, currKey) => {
    return `${acc}&${currKey}=${query[currKey]}`;
  }, '');

  return `${defaults}${extra}`;
}
