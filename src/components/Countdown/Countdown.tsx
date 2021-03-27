import React, { FC } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ReactCountdown from 'react-countdown';

interface RendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const Countdown: FC = () => {
  const theme = useTheme();
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: RendererProps) => {
    if (completed) {
      return (
        <Box>
          <Typography>Tournament has started!</Typography>
        </Box>
      );
    }
    return (
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            variant="caption"
            style={{ color: theme.crossroads.dark, fontWeight: 'bold' }}
          >
            Days
          </Typography>
          <Typography
            variant="h2"
            style={{
              fontWeight: 'bold',
              color: theme.crossroads.red,
              fontSize: '4.5rem',
            }}
          >
            {days}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            style={{ color: theme.crossroads.dark, fontWeight: 'bold' }}
          >
            Hours
          </Typography>
          <Typography
            variant="h2"
            style={{
              fontWeight: 'bold',
              color: theme.crossroads.red,
              fontSize: '4.5rem',
            }}
          >
            {hours}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            style={{ color: theme.crossroads.dark, fontWeight: 'bold' }}
          >
            Minutes
          </Typography>
          <Typography
            variant="h2"
            style={{
              fontWeight: 'bold',
              color: theme.crossroads.red,
              fontSize: '4.5rem',
            }}
          >
            {minutes}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            style={{ color: theme.crossroads.dark, fontWeight: 'bold' }}
          >
            Seconds
          </Typography>
          <Typography
            variant="h2"
            style={{
              fontWeight: 'bold',
              color: theme.crossroads.red,
              fontSize: '4.5rem',
            }}
          >
            {seconds}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <ReactCountdown
        date={new Date('05/24/2021 08:00:00')}
        renderer={renderer}
      />
    </Box>
  );
};

export default Countdown;
