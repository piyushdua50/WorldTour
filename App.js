import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { init } from './helpers/db';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducers';

export default function App() {

  init().then(() => {
    console.log("Connection Initialised to the Database............");
  }).catch(err => {
    console.log("Error in connecting to the Database...............");
    console.log(err);
  });

  const rootReducer = combineReducers({
    places: placesReducer
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  )
};