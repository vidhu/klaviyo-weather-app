import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

export default class SubscriptionService {
  static async subscribeUser(email, city) {
    try {
      const res = await axios.post(`${BASE_URL}/subscribe`, {
        email,
        city
      });
      return res.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
}
