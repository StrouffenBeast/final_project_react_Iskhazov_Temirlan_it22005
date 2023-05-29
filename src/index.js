import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../src/components/Data/dataReducer';



const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer);

root.render(
    <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);


