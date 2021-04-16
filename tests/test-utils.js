import { createStore } from 'redux';

import rootReducer from '../reducers/bigReducer';

export const storeFactory = (initialState) => {
   return createStore(rootReducer, initialState);
}