import React from 'react';
import styled from 'styled-components';

const Icon = styled.span`
  width: 1em;
  height: 1em;
  font-size: 1.5rem;
  line-height: 1;
`;

export type Props = {
  icon: string;
  className?: string;
};

export const MDIcon = (props: Props) => {
  const { className = '', icon } = props;

  return <Icon className={`${className} mdi mdi-${icon}`} />;
};

export default React.memo(MDIcon);
