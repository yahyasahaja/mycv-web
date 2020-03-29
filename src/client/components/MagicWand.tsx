import React from 'react';
import styled from 'styled-components';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { textColor } from '../theme';
import { toggleTheme } from '../store/Theme/actions';

const Container = styled.div`
  font-size: 2.5rem;
  display: block;
  top: 30px;
  left: 30px;
  color: ${textColor};
  transition: 0.3s;
  position: fixed;
  cursor: pointer;
  z-index: 10;

  &:hover {
    transform: scale(1.5);
  }

  &:active {
    transform: scale(1.1);
    opacity: 0.5;
    transition: 0.1s;
  }
`;

const MagicWand = () => {
  const dispatch = useDispatch();
  const toggleThemeCallback = React.useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <Container onClick={toggleThemeCallback}>
      <FontAwesomeIcon icon={faMagic} />
    </Container>
  );
};

export default MagicWand;
