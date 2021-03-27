import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@material-ui/core';

import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Response } from '../../types/PayPal';

import { PayPalButtons } from '@paypal/react-paypal-js';

import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@material-ui/core/styles';

import {
  UnknownObject,
  CreateOrderActions,
} from '@paypal/paypal-js/types/components/buttons';

import { costs } from '../../constants/register';
import { setStep } from '../../store/register';

import styles from '../../sass/Register.module.scss';

const Pay: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const numGolfers = useSelector(
    (state: RootState) => state.register.numGolfers
  );

  const cost = costs[numGolfers];

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

  const handleApprove = async (data: Response) => {
    const res = await data;
    console.log(res);
  };

  const isLoading = () => {
    return Boolean(!numGolfers);
  };

  if (isLoading()) {
    return null;
  }

  return (
    <Box className={styles.rightBox}>
      <Typography>{cost}</Typography>
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
            backgroundColor: theme.crossroads.teal,
          }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ marginRight: 5, color: 'white' }}
            size="lg"
          />
          <Typography style={{ fontWeight: 'bold', color: 'white' }}>
            Go Back
          </Typography>
        </Button>

        <Button
          variant="contained"
          onClick={handleNextStep}
          style={{
            backgroundColor: theme.crossroads.blue,
            marginLeft: 10,
          }}
        >
          <Typography style={{ fontWeight: 'bold', color: 'white' }}>
            Finish
          </Typography>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="lg"
            style={{ marginLeft: 5, color: 'white' }}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default Pay;
