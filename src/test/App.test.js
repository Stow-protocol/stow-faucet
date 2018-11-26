import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ThemeProvider from '@stowprotocol/brand/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

// Redux Store
import store from '../store';
import AppContainer from '../containers/AppContainer';

it('renders without crashing', () => {
  ReactDOM.render(
    (<Provider store={store}>
      <CssBaseline>
       <ThemeProvider>
         <AppContainer/>
       </ThemeProvider>
     </CssBaseline>
  </Provider>), document.getElementById('root') || document.createElement('div')
  );
});