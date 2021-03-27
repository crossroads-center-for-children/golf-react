import { FC, useState, ChangeEvent } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@material-ui/core/styles';

import { RootState } from '../../store';
import { setStep, setTeammates } from '../../store/register';
import { MapOfTeammates } from '../../types';
import styles from '../../sass/Register.module.scss';

const Teammates: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const numGolfers = useSelector(
    (state: RootState) => state.register.numGolfers
  );

  const teamName = useSelector((state: RootState) => state.register.teamName);

  const [mapOfTeammates, setMapOfTeammates] = useState<MapOfTeammates>({
    2: { id: 2, firstName: '', lastName: '' },
    3: { id: 3, firstName: '', lastName: '' },
    4: { id: 4, firstName: '', lastName: '' },
  });

  const [updates, setUpdates] = useState(0);

  const handleNextStep = () => {
    dispatch(setStep(3));
    dispatch(setTeammates(mapOfTeammates));
  };

  const handlePrevStep = () => {
    dispatch(setStep(1));
  };

  const getFirstName = (id: keyof MapOfTeammates) => {
    return mapOfTeammates[id].firstName;
  };

  const getLastName = (id: keyof MapOfTeammates) => {
    return mapOfTeammates[id].lastName;
  };

  const getId = (num: number) => num + 2;

  const changeFirstName = (id: keyof MapOfTeammates) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const nextMapOfTeammates = mapOfTeammates;
    nextMapOfTeammates[id].firstName = e.target.value;
    setMapOfTeammates(nextMapOfTeammates);
    setUpdates(updates + 1);
  };

  const changeLastName = (id: keyof MapOfTeammates) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const nextMapOfTeammates = mapOfTeammates;
    nextMapOfTeammates[id].lastName = e.target.value;
    setMapOfTeammates(nextMapOfTeammates);
    setUpdates(updates + 1);
  };

  const isLoading = () => {
    return !(numGolfers && teamName);
  };

  const isDisabled = () => {
    if (numGolfers === 2) {
      return Boolean(
        !mapOfTeammates[2].firstName || !mapOfTeammates[2].lastName
      );
    }

    if (numGolfers === 3) {
      return Boolean(
        !mapOfTeammates[2].firstName ||
          !mapOfTeammates[2].lastName ||
          !mapOfTeammates[3].firstName ||
          !mapOfTeammates[3].lastName
      );
    }

    return Boolean(
      !mapOfTeammates[2].firstName ||
        !mapOfTeammates[2].lastName ||
        !mapOfTeammates[3].firstName ||
        !mapOfTeammates[3].lastName ||
        !mapOfTeammates[4].firstName ||
        !mapOfTeammates[4].lastName
    );
  };

  const getPlaceholderFirstName = (idx: number) => {
    interface Map {
      [n: number]: string;
    }

    const map: Map = {
      2: 'Arnold',
      3: 'Lee',
      4: 'Phil',
    };

    return map[idx + 2];
  };

  const getPlaceholderLastName = (idx: number) => {
    interface Map {
      [n: number]: string;
    }

    const map: Map = {
      2: 'Palmer',
      3: 'Trevino',
      4: 'Mickelson',
    };

    return map[idx + 2];
  };

  if (isLoading()) return null;

  return (
    <Box className={styles.rightBox}>
      <Paper className={styles.paper}>
        <Typography
          variant="h4"
          style={{ fontWeight: 'bold', color: theme.crossroads.dark }}
        >
          {teamName}
        </Typography>

        <Box style={{ marginTop: 20 }}>
          {new Array(numGolfers - 1).fill({}).map((teammate, idx) => (
            <Box
              key={teammate}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 10,
              }}
            >
              <Typography
                variant="caption"
                style={{ marginBottom: 10 }}
              >{`Teammate ${idx + 1}`}</Typography>

              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  value={getFirstName(getId(idx))}
                  placeholder={getPlaceholderFirstName(idx)}
                  onChange={changeFirstName(getId(idx))}
                  style={{ marginRight: 5 }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  label="Last Name"
                  value={getLastName(getId(idx))}
                  placeholder={getPlaceholderLastName(idx)}
                  onChange={changeLastName(getId(idx))}
                  style={{ marginLeft: 5 }}
                />
              </Box>
            </Box>
          ))}
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
              backgroundColor: theme.crossroads.secondary,
            }}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ marginRight: 5, color: '#bdbdbd' }}
              size="lg"
            />
            <Typography style={{ fontWeight: 'bold', color: '#bdbdbd' }}>
              Go Back
            </Typography>
          </Button>

          <Button
            variant="contained"
            onClick={handleNextStep}
            disabled={isDisabled()}
            style={{
              color: isDisabled()
                ? theme.crossroads.dark
                : theme.crossroads.light,
              backgroundColor: isDisabled()
                ? theme.crossroads.secondary
                : theme.crossroads.blue,
              marginLeft: 10,
            }}
          >
            <Typography style={{ fontWeight: 'bold' }}>Make Payment</Typography>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="lg"
              style={{ marginLeft: 5 }}
            />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Teammates;
