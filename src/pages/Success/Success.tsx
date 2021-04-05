import { Box, Typography } from '@material-ui/core';
import { useTimeout } from 'react-use';
import { useLocation } from 'react-router-dom';
import { costs } from '../../constants/register';
import { Golfer } from '../../types';

interface Props {
  successData: SuccessData;
}

interface SuccessData {
  orderID: string;
  numGolfers: number;
  primary: Golfer;
  teammates: Golfer[];
  teamName: string;
}

export default function Success(): JSX.Element | null {
  const location = useLocation();
  const [isReady] = useTimeout(5000);

  const { successData } = location.state as Props;

  const getNamesOfTeammates = (): string => {
    const namesOfTeammates: string[] = [];

    for (const { firstName, lastName } of successData.teammates) {
      if (firstName && lastName) {
        namesOfTeammates.push(`${firstName} ${lastName}`);
      }
    }

    return namesOfTeammates.join(', ');
  };

  if (isReady()) {
    window.location.href = 'http://crossroadcenter.org/2021-golf/';
  }

  return (
    <Box>
      <Typography variant="h5" style={{ fontWeight: 'bold' }}>
        {`Success!`}
      </Typography>

      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        Details
      </Typography>

      <Typography>{`Order Id: ${successData.orderID}`}</Typography>
      <Typography>{`Total: $${costs[successData.numGolfers]}`}</Typography>

      <Typography>{`Team name: ${successData.teamName}`}</Typography>
      <Typography>{`Number of golfers: ${successData.numGolfers}`}</Typography>

      <Typography>{`First name: ${successData.primary.firstName}`}</Typography>
      <Typography>{`Last name: ${successData.primary.lastName}`}</Typography>

      {successData.numGolfers === 1 ? null : (
        <Typography>{`Teammates: ${getNamesOfTeammates()}`}</Typography>
      )}

      <Typography>Redirecting to Crossroads Center for Children...</Typography>
    </Box>
  );
}
