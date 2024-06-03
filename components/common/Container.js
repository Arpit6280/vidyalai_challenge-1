import React from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';
import PropTypes from 'prop-types';

export default function Container({ children }) {
  const { isSmallerDevice } = useWindowWidth();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.any,
};
