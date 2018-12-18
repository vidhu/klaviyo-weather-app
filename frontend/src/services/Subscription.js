import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api`;

/**
 * Subscribes email to the given city
 * @param {String} email 
 * @param {String} city 
 */
const subscribeUser = async (email, city) => {
  try {
    const res = await axios.post(`${BASE_URL}/subscribe`, {
      email,
      city
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export default {
  subscribeUser
};
