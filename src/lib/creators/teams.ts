import axios from 'axios';

const root = process.env.REACT_APP_API_URL;

export async function createTeam(
  name: string,
  golfers: string[],
  order: string
): Promise<string> {
  const teamId = axios
    .post(`${root}/teams`, { name, golfers, order })
    .then((res) => res.data.team._id);

  return teamId;
}
