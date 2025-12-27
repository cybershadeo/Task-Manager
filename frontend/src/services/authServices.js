import api from './api';


/**
 * Register user
 * @param {object} userData - { username, email, password }
 */

export const register = async (userData) => {
    const response = await api.post('/user/signup', userData);
    const data = await response.data || {}

    const token = data.accessToken ?? data.token ?? null;
    const user = typeof data.user === 'object' ? data.user : null;

    return { token, user, raw: data};
};




/**
 * Login user
 * @param {Object} credentials - { username, password }
 */
export const login = async (credentials) => {
  const response = await api.post('/user/signin', credentials);
  const data = response.data || {};

  const token = data.accessToken ?? data.token ?? null;
  const user = typeof data.user === 'object' ? data.user : null;

  return { token , user, raw: data };
};


/**
 * Logout user
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}