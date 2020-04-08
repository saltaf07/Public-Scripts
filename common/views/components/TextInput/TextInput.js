// @flow
import { forwardRef, useContext } from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import { classNames } from '../../../utils/classnames';

const TextInputWrap = styled.div.attrs({
  className: classNames({
    'flex relative': true,
  }),
})`
  font-size: ${props => (props.big ? '20px' : '16px')};

  &:focus-within {
    label {
      font-size: 14px;
      transform: translateY(0%);
      top: 4px;
    }
  }
  overflow: hidden;
  border-radius: 6px;

  ${props =>
    props.hasErrorBorder &&
    `
    box-shadow: 0 0 0 1px ${props.theme.colors.red};
  `}
`;

const TextInputLabel = styled.label.attrs({
  className: classNames({
    absolute: true,
  }),
})`
  /* Styles for browsers that don't support :focus-within (<=IE11) */
  font-size: 14px;
  transform: translateY(0%);
  top: 4px;

  /* IE doesn't support :focus-within, but you can't test for :focus-within
  using @supports. Fortunately, IE doesn't support @supports, so this only
  targets browsers that support @suports (> IE11) */
  @supports (display: block) {
    font-size: inherit;
    transform: translateY(-50%);
    top: 50%;
  }

  white-space: nowrap;
  left: 15px;
  transition: top 125ms ease-in, font-size 125ms ease-in,
    transform 125ms ease-in;
  pointer-events: none;
  color: ${props => props.theme.colors.silver};

  ${props =>
    (!props.isEnhanced || props.hasValue) &&
    `
    @supports (display: block) {
      top: 4px;
      transform: translateY(0);
      font-size: 14px;
    }
  `}
`;

const TextInputInput = styled.input.attrs(props => ({
  type: props.type || 'text',
}))`
  padding: 27px 40px 8px 15px;
  appearance: none;
  border: 0;
  height: 100%;
  border: 1px solid ${props => props.theme.colors.pumice};
  border-radius: 6px;
  font-size: inherit;
  width: 100%;

  &:focus {
    outline: 0;
  }

  &:-ms-clear {
    display: none;
  }

  ${props =>
    props.hasErrorBorder &&
    `
      border-color: ${props.theme.colors.red};
    `}
`;

const TextInputCheckmark = styled.span.attrs({
  className: classNames({
    absolute: true,
  }),
})`
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  line-height: 0;
`;

const TextInputErrorMessage = styled.span.attrs({
  className: classNames({
    'font-hnm': true,
  }),
})`
  font-size: 14px;
  margin-top: 10px;
  padding-left: 15px;
  color: ${props => props.theme.colors.red};
`;

type Props = {
  label: string,
  value: string,
  handleInput: (event: Event) => void,
  name: ?string,
  type: ?string,
  pattern: ?string,
  required: ?boolean,
  placeholder: ?string,
  errorMessage: ?string,
  isValid: ?boolean,
  setIsValid: ?(value: boolean) => void,
  showValidity: ?boolean,
  setShowValidity: ?(value: boolean) => void,
  autoFocus: ?boolean,
  big: ?boolean,
};

// $FlowFixMe (forwardRef)
const TextInput = forwardRef(
  (
    {
      label,
      type,
      value,
      name,
      pattern,
      required,
      errorMessage,
      handleInput,
      isValid,
      setIsValid,
      showValidity,
      setShowValidity,
      autoFocus,
      big,
    }: Props,
    ref // eslint-disable-line
  ) => {
    const { isEnhanced } = useContext(AppContext);

    function onInput(event) {
      handleInput(event);
      setIsValid && setIsValid(event.currentTarget.validity.valid);
      setShowValidity && setShowValidity(false);
    }

    function onBlur(event) {
      setIsValid && setIsValid(event.currentTarget.validity.valid);
      setShowValidity && setShowValidity(!!value && true);
    }

    return (
      <div>
        <TextInputWrap
          value={value}
          hasErrorBorder={!isValid && showValidity}
          big={big}
        >
          <TextInputLabel isEnhanced={isEnhanced} hasValue={!!value}>
            {label}
          </TextInputLabel>
          <TextInputInput
            ref={ref}
            name={name}
            required={required}
            value={value}
            pattern={pattern}
            onInput={onInput}
            onBlur={onBlur}
            hasErrorBorder={!isValid && showValidity}
            type={type}
            autoFocus={autoFocus}
          />
          {isValid && showValidity && (
            <TextInputCheckmark>
              <Icon name={`check`} extraClasses={`icon--green`} />
            </TextInputCheckmark>
          )}
        </TextInputWrap>
        {errorMessage && !isValid && showValidity && (
          <TextInputErrorMessage>{errorMessage}</TextInputErrorMessage>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
