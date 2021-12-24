import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ContextGlobal} from "./firebase.config";
import db from "./firebase.config";
import {aunty} from "./components/AppRouter/Login";
import firebase from "firebase";


ReactDOM.render(
  <React.StrictMode>
      <ContextGlobal.Provider value={{
          aunty,
          firebase,
          db
      }}>
          <App />
      </ContextGlobal.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);