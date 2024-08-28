// index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import propertyReducer from './propertyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
  // Add more reducers here if needed
});

export default rootReducer;
