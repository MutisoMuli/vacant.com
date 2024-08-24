import axios from 'axios';
import {
  ADD_PROPERTY,
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAILURE,
} from '../types/propertyTypes';

export const addProperty = (propertyData) => async (dispatch) => {
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

    // Make an API call to save the property details
    const response = await axios.post(
      '/api/properties', // Replace with your API endpoint
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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
