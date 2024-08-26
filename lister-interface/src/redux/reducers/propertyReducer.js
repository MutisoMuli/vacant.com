import {
  ADD_PROPERTY,
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAILURE,
} from '../types/propertyTypes';

const initialState = {
  properties: [],
  loading: false,
  error: null,
};

export const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROPERTY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        property: [...state.properties, action.payload],
        error: null,
      };
    case ADD_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
