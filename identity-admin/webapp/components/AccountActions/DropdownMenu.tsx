import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Chevron } from '../Icons/Chevron';
import { Container, Menu, MenuButton } from './DropdownMenu.style';

type DropdownMenuProps = {
  deleteModalRef: MutableRefObject<HTMLDivElement | null>;
  children: React.ReactNode;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  deleteModalRef,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(wasOpen => !wasOpen);
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      isOpen &&
      !dropdownRef.current?.contains(target) &&
      !deleteModalRef.current?.contains(target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <Container ref={dropdownRef}>
      <MenuButton onClick={toggleOpen}>
        Account actions{' '}
        <Chevron
          fill="currentColor"
          height="24"
          width="24"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          }}
        />
      </MenuButton>
      {isOpen && <Menu>{children}</Menu>}
    </Container>
  );
};
