export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOAD = 'LOAD';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAIL = 'LOAD_FAIL';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

const initialState = {
  isAuthenticated: false,
  user: null,
  loaded: false
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log('LOGIN:', action);
      return {
        ...state,
        loggingIn: true,
        loaded: false
      };
    case LOGIN_SUCCESS:
      // console.log('LOGIN_SUCCESS:', action.result);
      return {
        ...state,
        loggingIn: false,
        loaded: true,
        user: action.result.data,
        // isAuthenticated: !!action.result.data.access_token
      };
    case LOGIN_FAIL:
      console.log('LOGIN_FAIL:', action.result);
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };

    case LOAD:
      console.log('LOAD:', action);
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      // console.log('LOAD_SUCCESS:', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.data,
        // isAuthenticated: !!action.result.data.access_token,
        isAuthenticated: true
      };
    case LOAD_FAIL:
      console.log('LOAD_FAIL:', action);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        user: null,
        isAuthenticated: false
      };

    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
        isAuthenticated: false
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error,
        user: null,
        isAuthenticated: false
      };

    default:
      return state;
  }
}


export function isLoaded(globalState) {
  return globalState.sign && globalState.sign.isAuthenticated;
}

// export function load(access_token) {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: (client) => client.get('/user', { params: { access_token }})
//   };
// }

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/user')
  };
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/login', { data: { email, password }})
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.post('/auth/logout')
  };
}