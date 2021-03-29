import axios from 'axios';
import { Golfer } from '../../types';

const root = process.env.REACT_APP_API_URL;

export async function createTeam(
  name: string,
  golferIds: string[],
  golfers: Golfer[],
  order: string,
  orderNumber: string
): Promise<string> {
  const teamId = axios
    .post(`${root}/teams`, { name, golferIds, golfers, order, orderNumber })
    .then((res) => res.data.team._id);

  return teamId;
}
