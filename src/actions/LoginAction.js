import axios from 'axios';
import * as NavigationService from '../navigation/navigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

const storeUser = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('userData', jsonValue);
  } catch (e) {
    console.warn(e);
  }
};
const updateUrl = async (url) => {
  try {
    await AsyncStorage.setItem('baseUrl', url);
  } catch (e) {
    console.warn(e);
  }
};
export const changeUrl = ({ url }) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_URL',
      payload: url,
    });
    updateUrl(url);
    showMessage({
      message: `Url Updated: ${url}`,
      type: 'success',
    });
  };
};

export const updateCapabilities = ({ data }) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_CAPABILITIES',
      payload: data,
    });
  };
};

export const loginRememberedUser = ({ userData }) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_USER_SUCCESS',
      payload: userData,
    });

    axios.get('/api/v1/user/capabilities').then((response) => {
      if (response.status !== 401) {
        dispatch({
          type: 'CHANGE_CAPABILITIES',
          payload: response.data,
        });
      }
    });
    NavigationService.navigate('MainNavigation');
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({
      type: 'LOAD_SPINNER',
    });
    NavigationService.navigate('Loading');

    axios
      .post('/api/v1/auth/sign_in', { email, password })
      .then((response) => {
        if (response.status === 401) {
          dispatch({
            type: 'LOGIN_FAILED',
          });
        } else {
          let data = response.data;
          data.client = response.headers.client;
          data.uid = response.headers.uid;
          data['access-token'] = response.headers['access-token'];
          dispatch({
            type: 'LOGIN_USER_SUCCESS',
            payload: data,
          });
          storeUser(data);
          axios.get('/api/v1/user/capabilities').then((capResponse) => {
            if (capResponse.status !== 401) {
              dispatch({
                type: 'CHANGE_CAPABILITIES',
                payload: capResponse.data,
              });
            }
          });
          NavigationService.navigate('MainNavigation');
          showMessage({
            message: `Hello: ${data.data.name}`,
            type: 'success',
          });
          dispatch({
            type: 'STOP_SPINNER',
          });
        }
      })
      .catch(function (_error) {
        dispatch({
          type: 'LOGIN_FAILED',
        });
        NavigationService.navigate('SignIn');
      });
  };
};

export const registerUser = ({ name, email, password, confirmPassword }) => {
  return (dispatch) => {
    dispatch({
      type: 'LOAD_SPINNER',
    });
    NavigationService.navigate('Loading');

    axios
      .post('/api/v1/auth', {
        email: email,
        name: name,
        password: password,
        password_confirmation: confirmPassword,
      })
      .then((response) => {
        if (response.status === 401) {
          /* empty */
        } else {
          let data = response.data;
          data.client = response.headers.client;
          data.uid = response.headers.uid;
          data['access-token'] = response.headers['access-token'];
          dispatch({
            type: 'LOGIN_USER_SUCCESS',
            payload: data,
          });
          NavigationService.navigate('MainNavigation');
        }
      })
      .catch(function (_error) {
        dispatch({
          type: 'LOGIN_FAILED',
        });
        NavigationService.navigate('SignInNavigation');
      });
  };
};
export const setLoading = ({ loading = true }) => {
  return (dispatch) => {
    if (loading) {
      dispatch({
        type: 'LOAD_SPINNER',
      });
      NavigationService.navigate('Loading');
    } else {
      dispatch({
        type: 'STOP_SPINNER',
      });
      NavigationService.navigate('Loading');
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOAD_SPINNER',
    });
    NavigationService.navigate('Loading');

    storeUser(null);
    axios.delete('/api/v1/auth/sign_out').then((response) => {
      if (response.status === 401) {
        dispatch({
          type: 'LOGOUT_FAILED',
        });
      } else {
        let data = {};
        data.uid = '';
        data.client = '';
        data['access-token'] = '';
        dispatch({
          type: 'LOGOUT_USER_SUCCESS',
          payload: data,
        });
        NavigationService.navigate('SignIn');
      }
    });
    dispatch({
      type: 'STOP_SPINNER',
    });
  };
};

export const getCapabilities = () => {
  return (dispatch) => {
    axios.get('/api/v1/user/capabilities').then((response) => {
      dispatch({
        type: 'CHANGE_CAPABILITIES',
        payload: response.data,
      });
    });
  };
};

export const removeSession = () => {
  return (dispatch) => {
    storeUser(null);
    dispatch({
      type: 'REMOVE_SESSION',
    });
    NavigationService.navigate('SignIn');
  };
};
