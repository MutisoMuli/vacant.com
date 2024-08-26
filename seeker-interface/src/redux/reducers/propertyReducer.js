// src/redux/reducers/propertyReducer.js
import {
    FETCH_PROPERTIES_REQUEST,
    FETCH_PROPERTIES_SUCCESS,
    FETCH_PROPERTIES_FAILURE,
  } from '../types/propertyTypes';
  
  const initialState = {
    properties: [],
    loading: false,
    error: null,
  };
  
  const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PROPERTIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PROPERTIES_SUCCESS:
        return {
          ...state,
          loading: false,
          properties: action.payload,
        };
      case FETCH_PROPERTIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default propertyReducer;
  