/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { loadUser } from './actions/auth';
import { get_employees } from './actions/employee';
import store from './store';
// ----------------------------------------------------------------------

export default function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  React.useEffect(() => {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(loadUser());
      store.dispatch(get_employees());
    }
  }, []);
  const routing = useRoutes(Router(isAuthenticated));

  return (
    <Provider store={store}>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        {routing}
      </ThemeConfig>
    </Provider>
  );
}
