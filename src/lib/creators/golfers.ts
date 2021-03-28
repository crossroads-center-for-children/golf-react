import axios from 'axios';

const root = process.env.REACT_APP_API_URL;

export async function createGolfer(
  firstName: string,
  lastName: string,
  email?: string
): Promise<string> {
  const golferId = axios
    .post(`${root}/golfers`, { firstName, lastName, email })
    .then((res) => res.data.golfer._id);

  return golferId;
}
