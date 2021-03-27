import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import {
  faDirections,
  faCalendar,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@material-ui/core/styles';

import { Countdown } from '../../components';
import styles from '../../sass/Splash.module.scss';

const Splash: FC = () => {
  const theme = useTheme();
  const [background, setBackground] = useState('bg1');
  const [queue, setQueue] = useState(['bg1', 'bg2', 'bg3']);

  useEffect(() => {
    const changeBackground = () => {
      const nextQueue = queue;
      const nextBackground = queue[0];
      nextQueue.shift();
      nextQueue.push(nextBackground);

      setQueue(nextQueue);
      setBackground(nextBackground);
    };

    const interval = setInterval(changeBackground, 10 * 1000);

    return () => clearInterval(interval);
  });

  return (
    <Box className={styles[background]}>
      <Paper className={styles.paper}>
        <Box>
          <a href="https://fb.me/e/1k2YZ7n65" target="_blank" rel="noreferrer">
            <FontAwesomeIcon
              icon={faCalendar}
              size="lg"
              style={{ color: theme.crossroads.red }}
            />
          </a>
          <Typography
            variant="caption"
            style={{
              textAlign: 'left',
              marginLeft: 10,
              color: theme.crossroads.dark,
              fontWeight: 'bold',
            }}
          >
            Monday, May 24, 2021
          </Typography>
        </Box>

        <Box style={{ marginTop: 10, width: '100%' }}>
          <Typography
            variant="h2"
            style={{
              fontWeight: 'bold',
              color: theme.crossroads.primary,
              textAlign: 'center',
              fontSize: '3.5rem',
            }}
          >
            19th Annual
          </Typography>

          <Typography
            variant="body2"
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: theme.crossroads.dark,
            }}
          >
            {`Benefiting the Crossroads Center for Children`}
          </Typography>
        </Box>

        <Box className={styles.countdownBox}>
          <Countdown />
        </Box>

        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            marginTop: 10,
          }}
        >
          <Button
            fullWidth
            size="large"
            variant="contained"
            style={{
              backgroundColor: theme.crossroads.blue,
              color: 'white',
            }}
            href="/register"
          >
            <Typography style={{ fontWeight: 'bold' }}>Register Now</Typography>
          </Button>
        </Box>

        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            width: '100%',
          }}
        >
          <a
            href="https://www.facebook.com/edisongolf"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="lg"
              style={{ marginRight: 5, color: theme.crossroads.blue }}
            />
          </a>

          <a
            href="https://goo.gl/maps/coLqUM42jLi4neJY9"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faDirections}
              size="lg"
              style={{ marginRight: 5, color: theme.crossroads.green }}
            />
          </a>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            size="lg"
            style={{ marginRight: 10, color: theme.crossroads.red }}
          />
          <Box>
            <Typography
              style={{ color: theme.crossroads.dark, fontWeight: 'bold' }}
              variant="h6"
            >
              The Edison Club
            </Typography>
            <Typography
              style={{ color: theme.crossroads.dark, fontWeight: 'bold' }}
              variant="caption"
            >{`
          891 Riverview Rd,
          Rexford, NY 12148
          `}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Splash;
