import { FC, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@material-ui/core';

import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Response } from '../../types/PayPal';

import { PayPalButtons } from '@paypal/react-paypal-js';

import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

import {
  UnknownObject,
  CreateOrderActions,
} from '@paypal/paypal-js/types/components/buttons';

import { costs } from '../../constants/register';
import { setStep } from '../../store/register';
import { handleRegistration } from '../../lib/handlers';
import { Golfer } from '../../types';
import styles from '../../sass/Register.module.scss';

const Pay: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numGolfers = useSelector(
    (state: RootState) => state.register.numGolfers
  );

  const firstName = useSelector(
    (state: RootState) => state.register.primary.firstName
  );

  const lastName = useSelector(
    (state: RootState) => state.register.primary.lastName
  );

  const teamName = useSelector((state: RootState) => state.register.teamName);

  const teammates = useSelector((state: RootState) => state.register.teammates);

  const [cost, setCost] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.REACT_APP_ENV === 'development') {
      setCost(0.01);
    } else {
      setCost(costs[numGolfers]);
    }
  }, [setCost, numGolfers]);

  useEffect(() => {
    if (cost) {
      setIsLoading(false);
    }
  }, [cost]);

  const handleNextStep = () => {
    dispatch(setStep(4));
  };

  const handlePrevStep = () => {
    if (numGolfers === 1) {
      dispatch(setStep(1));
    } else {
      dispatch(setStep(2));
    }
  };

  const createOrder = (data: UnknownObject, actions: CreateOrderActions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cost.toString(),
          },
        },
      ],
    });
  };

  const getTeammates = (): Golfer[] => {
    const res: Golfer[] = [];

    for (const { firstName, lastName } of Object.values(teammates)) {
      res.push({ firstName, lastName });
    }

    return res;
  };

  const getPrimary = (): Golfer => ({ firstName, lastName });

  const handleApprove = async (data: Response) => {
    const { orderID } = data;

    const primary = getPrimary();
    const teammates = getTeammates();

    try {
      if (orderID) {
        await handleRegistration({
          numGolfers,
          primary,
          teammates,
          teamName,
          orderNumber: orderID,
        });

        navigate('/success', {
          state: { orderID, numGolfers, primary, teammates, teamName },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return null;

  return (
    <Box className={styles.rightBox}>
      <Box style={{ marginTop: 50, width: '100%', overflowY: 'scroll' }}>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={(data: Response) => handleApprove(data)}
          style={{ color: 'blue', shape: 'pill' }}
        />
      </Box>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Button
          variant="contained"
          onClick={handlePrevStep}
          style={{
            marginRight: 10,
            backgroundColor: '#616161',
            color: theme.crossroads.dark,
          }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ marginRight: 5 }}
            size="lg"
          />
          <Typography style={{ fontWeight: 'bold' }}>Go Back</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Pay;
