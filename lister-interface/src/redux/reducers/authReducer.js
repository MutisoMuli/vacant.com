// authReducer.js
const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          token: action.payload.token,
          isAuthenticated: true,
          user: action.payload.user,
          loading: false,
        };
      case 'USER_LOADED':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          loading: false,
        };
      case 'AUTH_ERROR':
      case 'LOGIN_FAIL':
      case 'SIGNUP_FAIL':
      case 'LOGOUT':
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          user: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  