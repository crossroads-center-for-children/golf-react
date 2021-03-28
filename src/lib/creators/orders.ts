import axios from 'axios';

const root = process.env.REACT_APP_API_URL;

export async function createOrder(number: string): Promise<string> {
  const orderId = axios
    .post(`${root}/orders`, { number })
    .then((res) => res.data.order._id);

  return orderId;
}
