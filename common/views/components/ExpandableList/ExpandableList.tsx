import { useEffect, useState, useRef, FunctionComponent } from 'react';
import { font, classNames } from '@weco/common/utils/classnames';
import styled from 'styled-components';

const ShowHideButton = styled.button.attrs({
  className: classNames({
    'plain-button no-margin no-padding': true,
    [font('hnl', 5)]: true,
  }),
})`
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
type Props = {
  listItems: string[]; // TODO List of reactNodes []
};
const ExpandableList: FunctionComponent<Props> = ({ listItems }: Props) => {
  const firstThreeListItems = listItems.slice(0, 3);
  const remainingListItems = listItems.slice(3);
  const [
    isShowingRemainingListItems,
    setIsShowingRemainingListItems,
  ] = useState(false);
  const firstOfRemainingListItemRef = useRef<HTMLAnchorElement>(null);
  const showHideItemsRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isShowingRemainingListItems) {
      firstOfRemainingListItemRef?.current?.focus();
    } else {
      showHideItemsRef?.current?.focus();
    }
  }, [isShowingRemainingListItems]);

  return listItems.length > 0 ? (
    <>
      <ul
        className={classNames({
          'plain-list no-margin no-padding': true,
        })}
      >
        {firstThreeListItems.map((
          item,
          index // TODO way of getting better key?
        ) => (
          <li
            className={classNames({
              [font('hnl', 5)]: true,
            })}
            key={index}
          >
            {item}
          </li>
        ))}
        {isShowingRemainingListItems && (
          <>
            {remainingListItems.map((item, index) => (
              <li
                className={classNames({
                  [font('hnl', 5)]: true,
                })}
                key={index}
              >
                {/* if item is a link then add href and index 0 */}
                {item}
              </li>
            ))}
          </>
        )}
      </ul>
      {remainingListItems.length > 0 && (
        <ShowHideButton
          ref={showHideItemsRef}
          onClick={() =>
            setIsShowingRemainingListItems(!isShowingRemainingListItems)
          }
        >
          {isShowingRemainingListItems
            ? '- Show less'
            : `+ ${remainingListItems.length} more`}
        </ShowHideButton>
      )}
    </>
  ) : null;
};

export default ExpandableList;
