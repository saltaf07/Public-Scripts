// @flow
import { Fragment } from 'react';
import { classNames, font } from '../../../utils/classnames';
import Control from '../Buttons/Control/Control';
import Space from '../styled/Space';

type Link = {|
  +pathname: string,
  +query: Object,
|};

type LinkProps = {|
  href: Link,
  as: Link,
|};

type PageChangeFunction = (event: Event, page: number) => Promise<void>;

type Props = {|
  query?: string,
  currentPage: number,
  pageSize: number,
  totalResults: number,
  link: LinkProps,
  onPageChange: PageChangeFunction,
|};

const Paginator = ({
  query,
  currentPage,
  pageSize,
  totalResults,
  link,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const next = currentPage < totalPages ? currentPage + 1 : null;
  const prev = currentPage > 1 ? currentPage - 1 : null;

  const prevLink = prev
    ? {
        href: {
          ...link.href,
          query: {
            ...link.href.query,
            page: prev,
          },
        },
        as: {
          ...link.as,
          query: {
            ...link.as.query,
            page: prev,
          },
        },
      }
    : null;

  const nextLink = next
    ? {
        href: {
          ...link.href,
          query: {
            ...link.href.query,
            page: next,
          },
        },
        as: {
          ...link.as,
          query: {
            ...link.as.query,
            page: next,
          },
        },
      }
    : null;

  return (
    <Fragment>
      <div className={`flex flex--v-center ${font('hnm', 3)}`}>
        {totalResults} result{totalResults !== 1 ? 's' : ''}
        {query && ` for “${query}”`}
      </div>
      <div
        className={classNames({
          pagination: true,
          'float-r': true,
          'flex-inline': true,
          'flex--v-center': true,
          'font-pewter': true,
          [font('hnl', 5)]: true,
        })}
      >
        <div id="sort-select-portal"></div>
        {prevLink && prev && (
          <Space as="span" h={{ size: 'm', properties: ['margin-right'] }}>
            <Control
              link={prevLink}
              clickHandler={event => {
                onPageChange(event, prev);
              }}
              type="light"
              extraClasses={classNames({
                'icon--180': true,
              })}
              icon="arrow"
              text={`Previous (page ${prev})`}
            />
          </Space>
        )}

        <span>
          Page {currentPage} of {totalPages}
        </span>

        {nextLink && next && (
          <Space as="span" h={{ size: 'm', properties: ['margin-left'] }}>
            <Control
              link={nextLink}
              clickHandler={event => {
                onPageChange(event, next);
              }}
              type="light"
              icon="arrow"
              text={`Next (page ${next})`}
            />
          </Space>
        )}
      </div>
    </Fragment>
  );
};
export default Paginator;
