//rootReducer.js
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { propertyReducer } from './propertyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
});

export default rootReducer;
