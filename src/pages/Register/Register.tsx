import React, { FC, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

import styles from '../../sass/Register.module.scss';
import { RootState } from '../../store';
import { Primary, Teammates, Pay } from '../../components';

const Register: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const step = useSelector((state: RootState) => state.register.step);

  useEffect(() => {
    if (step === 4) {
      navigate('crossroadcenter.org');
    }
  }, [navigate, step]);

  return (
    <Box
      style={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Box
        style={{
          backgroundColor: theme.crossroads.darkBlue,
        }}
        className={styles.leftBox}
      >
        <Box className={styles.image}></Box>
      </Box>

      {step === 1 ? <Primary /> : step === 2 ? <Teammates /> : <Pay />}
    </Box>
  );
};

export default Register;
