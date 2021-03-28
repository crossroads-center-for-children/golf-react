import { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTimeout } from 'react-use';
import { useNavigate, useLocation } from 'react-router-dom';
import { costs } from '../../constants/register';
import { Golfer } from '../../types';

interface Props {
  orderID: string;
  numGolfers: number;
  primary: Golfer;
  teammates: Golfer[];
  teamName: string;
}

export default function Success(): JSX.Element | null {
  const navigate = useNavigate();
  const location = useLocation();
  const [isReady] = useTimeout(5000);

  const {
    orderID,
    numGolfers,
    primary,
    teammates,
    teamName,
  } = location.state as Props;

  const getNamesOfTeammates = (): string => {
    const namesOfTeammates: string[] = [];

    for (const { firstName, lastName } of teammates) {
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

      <Typography>{`Order Id: ${orderID}`}</Typography>
      <Typography>{`Total: $${costs[numGolfers]}`}</Typography>

      <Typography>{`Team name: ${teamName}`}</Typography>
      <Typography>{`Number of golfers: ${numGolfers}`}</Typography>

      <Typography>{`First name: ${primary.firstName}`}</Typography>
      <Typography>{`Last name: ${primary.lastName}`}</Typography>

      {numGolfers === 1 ? null : (
        <Typography>{`Teammates: ${getNamesOfTeammates()}`}</Typography>
      )}

      <Typography>Redirecting to Crossroads Center for Children...</Typography>
    </Box>
  );
}
