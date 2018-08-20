import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ThemeProvider from 'linnia-brand/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

// Redux Store
import store from './store';
import AppContainer from './containers/AppContainer';

ReactDOM.render(
 <Provider store={store}>
 	<CssBaseline>
    <ThemeProvider>
      <AppContainer/>
    </ThemeProvider>
  </CssBaseline>
 </Provider>, document.getElementById('root'));
