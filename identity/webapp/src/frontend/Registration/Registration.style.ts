import CheckboxRadio from '@weco/common/views/components/CheckboxRadio/CheckboxRadio';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const ExternalLink = styled.a`
  white-space: nowrap;
`;

const AlertBox = styled.div.attrs({ role: 'alert', className: 'font-hnl' })`
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  & svg {
    stroke: currentColor;
    fill: currentColor;
  }
`;

export const ErrorAlert = styled(AlertBox)`
  background-color: rgba(224, 27, 47, 0.1);
  color: #d1192c;
`;

export const SuccessMessage = styled(AlertBox)`
  background-color: rgba(0, 120, 108, 0.1);
  color: #00786c;
`;

export const Checkbox = styled(CheckboxRadio).attrs({ type: 'checkbox' })``;

export const CheckboxLabel = styled.span`
  margin-left: 0.333em;
`;

const FullWidthElementBase = css`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InProgress = styled.div.attrs({ role: 'progressbar' })`
  ${FullWidthElementBase}
  border-radius: 6px;
  background-color: #333;
  color: white;
  user-select: none;
`;

export const Cancel = styled(Link).attrs({ children: 'Cancel', to: '#cancel' })`
  ${FullWidthElementBase}
`;