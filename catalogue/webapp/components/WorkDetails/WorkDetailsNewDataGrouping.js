// @flow
import type { Node } from 'react';
import type { LicenseData } from '@weco/common/utils/get-license-info';
import type { LicenseType } from '@weco/common/model/license';

import NextLink from 'next/link';
import styled from 'styled-components';
import { font, spacing, grid, classNames } from '@weco/common/utils/classnames';
import { convertImageUri } from '@weco/common/utils/convert-image-uri';
import { worksUrl } from '../../services/catalogue/urls';
import { Fragment } from 'react';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import Icon from '@weco/common/views/components/Icon/Icon';
import License from '@weco/common/views/components/License/License';
import Divider from '@weco/common/views/components/Divider/Divider';
import CopyUrl from '@weco/common/views/components/CopyUrl/CopyUrl';
import Button from '@weco/common/views/components/Buttons/Button/Button';
import MetaUnit from '@weco/common/views/components/MetaUnit/MetaUnit';

const StyledWorkDetailsSection = styled.div`
  /* TODO: variables/functions/mixins/linting */
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  padding: 0;

  &:first-child {
    border-top: 0;
  }

  .work-details-heading,
  .work-details-body {
    grid-column: 1 / -1;
  }

  .work-details-body {
    svg,
    p:first-of-type,
    ul:first-of-type {
      margin: 0;
    }
  }

  @media (min-width: 800px) {
    .work-details-heading {
      grid-column: span 4;
    }

    .work-details-body {
      grid-column: span 6;
    }
  }
`;

type WorkDetailsSectionProps = {|
  headingText?: string,
  children: Node,
|};

const WorkDetailsSection = ({
  headingText,
  children,
}: WorkDetailsSectionProps) => {
  return (
    <StyledWorkDetailsSection>
      {headingText ? (
        <h2
          className={classNames({
            [font({ s: 'WB6', m: 'WB5' })]: true,
            [spacing({ s: 0 }, { margin: ['top'] })]: true,
            'work-details-heading': true,
          })}
        >
          {headingText}
        </h2>
      ) : (
        <div className="work-details-heading" />
      )}

      <div className="work-details-body spaced-text">{children}</div>
    </StyledWorkDetailsSection>
  );
};

type Work = Object;

type Props = {|
  work: Work,
  iiifImageLocationUrl: ?string,
  licenseInfo: ?LicenseData,
  iiifImageLocationCredit: ?string,
  iiifImageLocationLicenseId: ?LicenseType,
  encoreLink: ?string,
|};

const WorkDetails = ({
  work,
  iiifImageLocationUrl,
  licenseInfo,
  iiifImageLocationCredit,
  iiifImageLocationLicenseId,
  encoreLink,
}: Props) => {
  const singularWorkTypeLabel = work.workType.label
    ? work.workType.label.replace(/s$/g, '').toLowerCase()
    : 'item';
  const isbnIdentifiers = work.identifiers.filter(id => {
    return id.identifierType.id === 'isbn';
  });
  const showAboutSection =
    work.description ||
    work.production.length > 0 ||
    work.physicalDescription ||
    work.extent ||
    work.dimensions ||
    work.lettering ||
    work.genres.length > 0 ||
    work.language;
  const showSubjectsSection = work.subjects.length > 0;

  return (
    <div
      className={classNames({
        row: true,
        'bg-cream': true,
        [spacing({ s: 6 }, { padding: ['top', 'bottom'] })]: true,
      })}
    >
      <div className="container">
        <div className="grid">
          <div className={classNames([grid({ s: 12, m: 12, l: 10, xl: 10 })])}>
            {iiifImageLocationUrl && (
              <SpacingComponent>
                <WorkDetailsSection>
                  <div className={spacing({ s: 2 }, { margin: ['bottom'] })}>
                    <Button
                      type="tertiary"
                      url={convertImageUri(iiifImageLocationUrl, 'full')}
                      target="_blank"
                      download={`${work.id}.jpg`}
                      rel="noopener noreferrer"
                      trackingEvent={{
                        category: 'Button',
                        action: 'download large work image',
                        label: work.id,
                      }}
                      icon="download"
                      text="Download full size"
                    />
                  </div>

                  <div
                    className={`${spacing(
                      { s: 3 },
                      { margin: ['bottom'] }
                    )} ${spacing({ s: 0 }, { margin: ['top'] })}`}
                  >
                    <Button
                      type="tertiary"
                      url={convertImageUri(iiifImageLocationUrl, 760)}
                      target="_blank"
                      download={`${work.id}.jpg`}
                      rel="noopener noreferrer"
                      trackingEvent={{
                        category: 'Button',
                        action: 'download small work image',
                        label: work.id,
                      }}
                      icon="download"
                      text="Download small (760px)"
                    />
                  </div>

                  {(iiifImageLocationCredit || iiifImageLocationLicenseId) && (
                    <div className={spacing({ s: 0 }, { margin: ['top'] })}>
                      {iiifImageLocationCredit && (
                        <p
                          className={classNames([
                            font({ s: 'HNL5', m: 'HNL4' }),
                            spacing({ s: 1 }, { margin: ['bottom'] }),
                          ])}
                        >
                          Credit: {iiifImageLocationCredit}
                        </p>
                      )}
                      {iiifImageLocationLicenseId && (
                        <License
                          subject={''}
                          licenseType={iiifImageLocationLicenseId}
                        />
                      )}
                    </div>
                  )}
                </WorkDetailsSection>
              </SpacingComponent>
            )}

            {showAboutSection && (
              <Fragment>
                {iiifImageLocationUrl && (
                  <SpacingComponent>
                    <Divider extraClasses="divider--pumice divider--keyline" />
                  </SpacingComponent>
                )}

                <SpacingComponent>
                  <WorkDetailsSection
                    headingText={`About this ${singularWorkTypeLabel}`}
                  >
                    {work.description && (
                      <MetaUnit
                        headingLevel={3}
                        headingText="Description"
                        text={[work.description]}
                      />
                    )}

                    {work.production.length > 0 && (
                      <MetaUnit
                        headingLevel={3}
                        headingText="Publication/Creation"
                        text={work.production.map(
                          productionEvent => productionEvent.label
                        )}
                      />
                    )}

                    {(work.physicalDescription ||
                      work.extent ||
                      work.dimensions) && (
                      <MetaUnit
                        headingLevel={3}
                        headingText="Physical description"
                        text={[
                          [
                            work.extent,
                            work.physicalDescription,
                            work.dimensions,
                          ]
                            .filter(Boolean)
                            .join(' '),
                        ]}
                      />
                    )}

                    {work.lettering && (
                      <MetaUnit
                        headingLevel={3}
                        headingText="Lettering"
                        text={[work.lettering]}
                      />
                    )}

                    {work.genres.length > 0 && (
                      <MetaUnit
                        headingLevel={3}
                        headingText="Type"
                        links={work.genres.map(genre => {
                          const linkAttributes = worksUrl({
                            query: `"${genre.label}"`,
                            page: undefined,
                          });
                          return (
                            <NextLink key={1} {...linkAttributes}>
                              {genre.label}
                            </NextLink>
                          );
                        })}
                      />
                    )}

                    {work.language && (
                      <MetaUnit
                        headingLevel={3}
                        headingText="Language"
                        links={[work.language.label]}
                      />
                    )}
                  </WorkDetailsSection>
                </SpacingComponent>
              </Fragment>
            )}

            {showSubjectsSection && (
              <Fragment>
                <SpacingComponent>
                  <Divider extraClasses="divider--pumice divider--keyline" />
                </SpacingComponent>

                <SpacingComponent>
                  <WorkDetailsSection headingText="Subjects">
                    <MetaUnit
                      links={work.subjects.map(subject => {
                        const linkAttributes = worksUrl({
                          query: `"${subject.label}"`,
                          page: undefined,
                        });
                        return (
                          <NextLink key={1} {...linkAttributes}>
                            {subject.label}
                          </NextLink>
                        );
                      })}
                    />
                  </WorkDetailsSection>
                </SpacingComponent>
              </Fragment>
            )}

            {encoreLink && (
              <Fragment>
                <SpacingComponent>
                  <Divider extraClasses="divider--pumice divider--keyline" />
                </SpacingComponent>

                <SpacingComponent>
                  <WorkDetailsSection headingText="Find in the library">
                    <p>
                      {`This ${singularWorkTypeLabel} is available at `}
                      <a href={encoreLink}>Wellcome Library</a>
                    </p>
                  </WorkDetailsSection>
                </SpacingComponent>
              </Fragment>
            )}

            <SpacingComponent>
              <Divider extraClasses="divider--pumice divider--keyline" />
            </SpacingComponent>

            <SpacingComponent>
              <WorkDetailsSection headingText="Identifiers">
                {isbnIdentifiers.length > 0 && (
                  <MetaUnit
                    headingText="ISBN"
                    list={isbnIdentifiers.map(id => id.value)}
                  />
                )}
                <MetaUnit headingText="Share">
                  <CopyUrl
                    id={work.id}
                    url={`https://wellcomecollection.org/works/${work.id}`}
                  />
                </MetaUnit>
              </WorkDetailsSection>
            </SpacingComponent>

            {licenseInfo && (
              <Fragment>
                <SpacingComponent>
                  <Divider extraClasses="divider--pumice divider--keyline" />
                </SpacingComponent>
                <SpacingComponent>
                  <WorkDetailsSection headingText="License information">
                    <MetaUnit
                      headingLevel={3}
                      headingText="License information"
                      text={licenseInfo.humanReadableText}
                    />
                    <MetaUnit
                      headingLevel={3}
                      headingText="Credit"
                      text={[
                        `${work.title.replace(/\.$/g, '')}.${' '}
                  ${
                    iiifImageLocationCredit
                      ? `Credit: <a href="https://wellcomecollection.org/works/${
                          work.id
                        }">${iiifImageLocationCredit}</a>. `
                      : ` `
                  }
                  ${
                    licenseInfo.url
                      ? `<a href="${licenseInfo.url}">${licenseInfo.text}</a>`
                      : licenseInfo.text
                  }`,
                      ]}
                    />
                  </WorkDetailsSection>
                </SpacingComponent>
              </Fragment>
            )}

            <SpacingComponent>
              <Divider extraClasses="divider--pumice divider--keyline" />
            </SpacingComponent>

            <SpacingComponent>
              <WorkDetailsSection>
                <div className="flex flex--v-center">
                  <Icon
                    name="underConstruction"
                    extraClasses="margin-right-s2"
                  />
                  <p
                    className={`${font({
                      s: 'HNL5',
                      m: 'HNL4',
                    })} no-margin`}
                  >
                    We’re improving the information on this page.{' '}
                    <a href="/works/progress">Find out more</a>.
                  </p>
                </div>
              </WorkDetailsSection>
            </SpacingComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetails;
