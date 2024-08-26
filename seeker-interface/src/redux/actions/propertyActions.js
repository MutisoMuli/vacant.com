import axios from 'axios';

// Action Types
export const FETCH_PROPERTIES_REQUEST = 'FETCH_PROPERTIES_REQUEST';
export const FETCH_PROPERTIES_SUCCESS = 'FETCH_PROPERTIES_SUCCESS';
export const FETCH_PROPERTIES_FAILURE = 'FETCH_PROPERTIES_FAILURE';

// Action Creators
export const fetchPropertiesRequest = () => ({
  type: FETCH_PROPERTIES_REQUEST,
});

export const fetchPropertiesSuccess = (properties) => ({
  type: FETCH_PROPERTIES_SUCCESS,
  payload: properties,
});

export const fetchPropertiesFailure = (error) => ({
  type: FETCH_PROPERTIES_FAILURE,
  payload: error,
});

// Async Action to Fetch Properties
export const fetchProperties = (latitude, longitude, radius) => async (dispatch) => {
  dispatch(fetchPropertiesRequest());
  try {
    const API_URL = 'http://localhost:5000/api/seeker/id?=2'; // Make sure this matches your backend port
    const response = await axios.get(`${API_URL}/seeker/nearby-properties`, {
      params: {
        latitude: latitude,
        longitude: longitude,
        radius: radius,
      },
    });
    dispatch(fetchPropertiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchPropertiesFailure(error.message));
    console.error('Error fetching nearby properties:', error);
  }
};