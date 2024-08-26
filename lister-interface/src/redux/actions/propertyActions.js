import axios from 'axios';
import {
  ADD_PROPERTY,
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAILURE,
} from '../types/propertyTypes';

export const addProperty = (propertyData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_PROPERTY });

    // Configure the form data for the property including images
    const formData = new FormData();
    Object.keys(propertyData).forEach((key) => {
      if (key === 'images') {
        propertyData[key].forEach((file) => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, propertyData[key]);
      }
    });

    // Get the token from the state (assuming you're storing it in Redux)
    const { auth: { token } } = getState();

    // Make an API call to save the property details
    const response = await axios.post(
      'http://localhost:5000/api/properties',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token, // Include the token in the headers
        },
      }
    );

    dispatch({
      type: ADD_PROPERTY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PROPERTY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
