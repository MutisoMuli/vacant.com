const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
  };
  
  function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return { ...state, loading: true };
      case 'LOGIN_SUCCESS':
        return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
      case 'LOGIN_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'LOGOUT':
        return { ...state, user: null, token: null };
      default:
        return state;
    }
  }
  
  export default authReducer;
  