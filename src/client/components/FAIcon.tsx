import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { textColor } from '../theme';

const Icon = styled.a`
  font-size: 3rem;
  display: block;
  padding: 10px 20px;
  color: ${textColor};
  transition: 0.3s;

  &:hover {
    transform: scale(1.5);
  }

  &:active {
    transform: scale(1.1);
    opacity: 0.5;
    transition: 0.1s;
  }
`;

type Props = {
  icon: IconDefinition;
  link: string;
};

const FAIcon = (props: Props) => {
  const { icon, link = '' } = props;
  return (
    <Icon href={link} target="_blank">
      <FontAwesomeIcon icon={icon} />
    </Icon>
  );
};

export default FAIcon;
