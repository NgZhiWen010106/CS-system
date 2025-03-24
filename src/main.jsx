import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@material-tailwind/react";

//redux
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';

// reducers
import authReducer from './redux/reducers/authReducer';
import filefolderReducer from './redux/reducers/filefolderReducer';

const reducers = combineReducers({
  auth: authReducer,
  filefolders: filefolderReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    
      <App />
    
    </Provider>
  </React.StrictMode>,
)
