import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './config/reducers';
import { SnackbarProvider } from 'notistack';

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
              <Routes/>
            </SnackbarProvider>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;