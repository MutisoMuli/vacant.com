import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; // For Redux DevTools integration

// Import your reducers (you need to create these in the `redux/reducers` directory)
import propertyReducer from './reducers/propertyReducer';
import authReducer from './reducers/authReducer';

// Combine reducers
const rootReducer = combineReducers({
  property: propertyReducer,
  auth: authReducer,
  // Add more reducers as needed
});

// Create the Redux store with middleware and DevTools integration
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
