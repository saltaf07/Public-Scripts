// @flow
import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import { type IIIFRendering } from '@weco/common/model/iiif';
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { font, classNames } from '@weco/common/utils/classnames';
import Icon from '@weco/common/views/components/Icon/Icon';
import Space from '@weco/common/views/components/styled/Space';
import DownloadLink from '@weco/catalogue/components/DownloadLink/DownloadLink';

const DownloadButton = styled.button`
  text-align: center;
  border: ${props => `1px solid ${props.theme.colors.green}`};
  border-radius: ${props => `${props.theme.borderRadiusUnit}px`};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.green};
  padding: ${props =>
    `${props.theme.spacingUnit}px ${props.theme.spacingUnit}px ${
      props.theme.spacingUnit
    }px ${props.theme.spacingUnit * 2}px`};
  display: inline-block;
  cursor: pointer;
  :focus {
    outline: none;
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
  }
  .icon {
    transition: transform 700ms;
    transform: ${props =>
      props.rotateIcon ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
  .icon__shape {
    fill: currentColor;
  }
`;
const DownloadOptions = styled.div`
  &.enhanced-styles {
    border: ${props => `1px solid ${props.theme.colors.marble}`};
    background: white;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.3);
    z-index: -1;
    margin-top: ${props => `-${props.theme.spacingUnit}px`};
    padding: ${props => `${props.theme.spacingUnit * 3}px`};
    height: none;
    opacity: 0;
    transition: opacity 400ms;
    position: absolute;
  }
  &.show {
    z-index: 1;
    opacity: 1;
  }
  li + li {
    margin-top: ${props => `${props.theme.spacingUnit * 2}px`};
  }
`;

function getFormatString(format) {
  switch (format) {
    case 'application/pdf':
      return 'PDF';
    case 'text/plain':
      return 'PLAIN';
    case 'image/jpeg':
      return 'JPG';
    case 'video/mp4':
      return 'MP4';
    case 'audio/mp3':
      return 'MP3';
  }
}

type Work = Object;
type Props = {|
  work: Work,
  downloadOptions: IIIFRendering[],
|};

const Download = ({ work, downloadOptions }: Props) => {
  const [showDownloads, setShowDownloads] = useState(true);
  const { isEnhanced } = useContext(AppContext);
  useEffect(() => {
    setShowDownloads(false);
  }, []);
  return (
    <div
      className={classNames({
        [font('hnl', 5)]: true,
        'inline-block': isEnhanced,
      })}
    >
      {downloadOptions.length > 0 && (
        <>
          {isEnhanced ? (
            <h2 className="inline">
              <DownloadButton
                className={classNames({
                  [font('hnm', 5)]: true,
                  'flex-inline': true,
                  'flex--v-center': true,
                })}
                aria-controls="downloadOptions"
                aria-expanded={showDownloads}
                rotateIcon={showDownloads}
                onClick={() => {
                  setShowDownloads(!showDownloads);
                }}
              >
                <span className="flex-inline flex--v-center">
                  <Space
                    as="span"
                    h={{ size: 's', properties: ['margin-right'] }}
                  >
                    Downloads
                  </Space>
                  <Icon name="chevron" />
                </span>
              </DownloadButton>
            </h2>
          ) : (
            <Space
              v={{
                size: 'l',
                properties: ['margin-top'],
              }}
            >
              <h2
                className={classNames({
                  [font('hnm', 5)]: true,
                  'work-details-heading': true,
                })}
              >
                Download
              </h2>
            </Space>
          )}
          <DownloadOptions
            id="downloadOptions"
            className={classNames({
              [font('hnm', 5)]: true,
              'enhanced-styles': isEnhanced,
              show: showDownloads,
            })}
          >
            <ul className="plain-list no-margin no-padding">
              {downloadOptions
                .filter(option => option.format !== 'text/plain') // We're taking out raw text for now
                .map(option => {
                  // Doing this for the action so analytics is constant, speak to Hayley about removing this
                  const action =
                    option.label === 'Download full size'
                      ? 'download large work image'
                      : option.label === 'Download small (760px)'
                      ? 'download small work image'
                      : option.label;
                  const format = getFormatString(option.format);

                  return (
                    <li key={option.label}>
                      <DownloadLink
                        isTabbable={showDownloads}
                        href={option['@id']}
                        linkText={option.label}
                        format={format}
                        trackingEvent={{
                          category: 'Button',
                          action: action,
                          label: work.id,
                        }}
                      />
                    </li>
                  );
                })}
            </ul>
          </DownloadOptions>
        </>
      )}
    </div>
  );
};

export default Download;
