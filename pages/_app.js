import React from 'react';
import { WindowWidthProvider } from '../components/hooks/useWindowWidth';
import PropTypes from 'prop-types';

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default App;
