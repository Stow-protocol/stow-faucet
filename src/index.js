import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ThemeProvider from '@stowprotocol/brand/ThemeProvider';
import Favicon from '@stowprotocol/brand/Favicon';
import CssBaseline from '@material-ui/core/CssBaseline';

// Redux Store
import store from './store';
import AppContainer from './containers/AppContainer';

ReactDOM.render(
 <Provider store={store}>
	<CssBaseline>
		<Favicon />
	  <ThemeProvider>
	    <AppContainer/>
	  </ThemeProvider>
	</CssBaseline>
</Provider>, document.getElementById('root'));
