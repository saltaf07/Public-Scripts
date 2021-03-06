import { font, classNames } from '../../../utils/classnames';
import { breadcrumbsLd } from '../../../utils/json-ld';
import Space, { HorizontalSpaceProperty } from '../styled/Space';
import { FunctionComponent, ReactElement } from 'react';

export type Breadcrumbs = {
  text: string;
  url?: string;
  prefix?: string;
  isHidden?: boolean;
}[];

type Props = {
  items: Breadcrumbs;
};

const Breadcrumb: FunctionComponent<Props> = ({
  items,
}: Props): ReactElement => (
  <div
    className={classNames({
      flex: true,
    })}
  >
    {items
      .filter(({ isHidden }) => !isHidden)
      .map(({ text, url, prefix }, i) => {
        const LinkOrSpanTag = url ? 'a' : 'span';
        return (
          <Space
            as={prefix ? 'b' : 'span'}
            h={{
              size: 'm',
              properties: [
                'padding-right',
                i !== 0 ? 'padding-left' : undefined,
              ].filter(Boolean) as HorizontalSpaceProperty[],
            }}
            key={text}
            className={classNames({
              [font('hnr', 5)]: true,
              'border-left-width-1 border-color-black': i !== 0,
            })}
          >
            {prefix}{' '}
            <LinkOrSpanTag
              className={classNames({
                [font('hnb', 5)]: Boolean(prefix),
              })}
              href={url}
            >
              {text}
            </LinkOrSpanTag>
          </Space>
        );
      })}
    {/* We do this so that the page doesn't bounce around if we don't have any breadcrumbs */}
    {items.length === 0 && (
      <span
        className={classNames({
          [font('hnr', 5)]: true,
          'empty-filler': true,
        })}
        style={{ lineHeight: 1 }}
      />
    )}
    {items.length > 0 && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsLd({ items })),
        }}
      />
    )}
  </div>
);
export default Breadcrumb;
