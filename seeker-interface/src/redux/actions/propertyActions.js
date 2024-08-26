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
    const response = await axios.get('/api/seeker/nearby-properties', {
      params: {
        latitude: latitude,
        longitude: longitude,
        radius: radius,
      },
    });
    dispatch(fetchPropertiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchPropertiesFailure(error.message));
  }
};
