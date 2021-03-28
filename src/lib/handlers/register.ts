import { createGolfer, createOrder, createTeam } from '../creators';
import { Golfer } from '../../types';

interface Props {
  numGolfers: number;
  primary: Golfer;
  teammates: Golfer[];
  teamName: string;
  orderNumber: string;
}

export async function handleRegistration(props: Props): Promise<void> {
  const golfers: Golfer[] = [props.primary, ...props.teammates];
  const golferIds: string[] = [];

  try {
    for (const golfer of golfers) {
      if (golfer.firstName && golfer.lastName) {
        const golferId = await createGolfer(golfer.firstName, golfer.lastName);
        golferIds.push(golferId);
      }
    }

    const orderId = await createOrder(props.orderNumber);

    await createTeam(props.teamName, golferIds, orderId);
  } catch (err) {
    console.log(err);
  }
}
