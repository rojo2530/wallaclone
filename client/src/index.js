import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'bulma/css/bulma.css';
import './index.css';
import App from './App';
import { configureStore } from './store';
import { restoreUser, saveUser, deleteStorage } from './utils/storage';
import { initialState } from './store/reducers';
import api from './utils/api';
import { I18nextProvider } from "react-i18next";
import i18n from './locales/i18n';

const { getAdverts, getAdvertDetail, createAdvert, updateAdvert, registerUser, checkToken} = api();

//Cargamos el Store con el usuario si esta logueado y hay token llamando a /apiv1/checkToken

checkToken()
  .then(userConnected => {
    const preloadedState = { ...initialState, user: userConnected || {} };
    const store = configureStore( 
    {services: {getAdverts, getAdvertDetail, createAdvert, updateAdvert, registerUser} })
    (preloadedState);

//Cualquier cambio en el store lo guardamos en el localstorage
  store.subscribe(() => {
    const { user } = store.getState();
    //Si el objeto user esta vacío, por ejemplo cuando hacemos un logout , lo eliminamos del localstorage
    if (Object.entries(user).length === 0) {
      return deleteStorage();
    }
    saveUser(user);
  });
//Envolvemos a la app en el contexto de i18n
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <App store={store} />
    </I18nextProvider>, 
    document.getElementById('root')
  );
}).catch (error => {
  const preloadedState = { ...initialState };
    const store = configureStore( 
    {services: {getAdverts, getAdvertDetail, createAdvert, updateAdvert, registerUser} })
    (preloadedState);

//Cualquier cambio en el store lo guardamos en el localstorage
  store.subscribe(() => {
    const { user } = store.getState();
    //Si el objeto user esta vacío, por ejemplo cuando hacemos un logout , lo eliminamos del localstorage
    if (Object.entries(user).length === 0) {
      return deleteStorage();
    }
    saveUser(user);
  });
//Envolvemos a la app en el contexto de i18n
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <App store={store} />
    </I18nextProvider>, 
    document.getElementById('root')
  );
});

  

