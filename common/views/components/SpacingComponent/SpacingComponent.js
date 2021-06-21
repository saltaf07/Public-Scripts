// @flow

import type { Node } from 'react';
import styled from 'styled-components';
import { classNames } from '@weco/common/utils/classnames';

const SpacingComponentEl = styled.div.attrs(props => ({
  className: classNames({
    'spacing-component': true,
    'spacing-component--text': props.isText,
  }),
}))`
  &:empty,
  & + .spacing-component {
    margin-top: ${props => props.theme.spaceAtBreakpoints.small.l}px;

    ${props => props.theme.media.medium`
      margin-top: ${props => props.theme.spaceAtBreakpoints.medium.l}px;
    `}

    ${props => props.theme.media.medium`
      margin-top: ${props => props.theme.spaceAtBreakpoints.large.l}px;
    `}
  }

  &.spacing-component--text + .spacing-component--text {
    margin-top: 1.55em;
  }
`;

type Props = {|
  isText?: boolean,
  children?: Node,
|};

const SpacingComponent = ({ isText, children }: Props) => {
  return <SpacingComponentEl isText={isText}>{children}</SpacingComponentEl>;
};

export default SpacingComponent;
