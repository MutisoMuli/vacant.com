export const login = (userData) => ({
    type: 'LOGIN_SUCCESS',
    payload: userData,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  