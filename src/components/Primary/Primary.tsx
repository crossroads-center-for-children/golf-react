import { FC, useEffect, useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Paper,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Typography,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';

import {
  addPrimary,
  setStep,
  setTeamName,
  setNumGolfers,
} from '../../store/register';

import { useTheme } from '@material-ui/core/styles';

import styles from '../../sass/Register.module.scss';

interface Select {
  name?: string | undefined;
  value: any;
}

const Primary: FC = () => {
  const numGolfersFromState = useSelector(
    (state: RootState) => state.register.numGolfers
  );

  const firstNameFromState = useSelector(
    (state: RootState) => state.register.primary.firstName
  );

  const lastNameFromState = useSelector(
    (state: RootState) => state.register.primary.lastName
  );

  const teamNameFromState = useSelector(
    (state: RootState) => state.register.teamName
  );

  const theme = useTheme();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [team, setTeam] = useState('');
  const [golfers, setGolfers] = useState(numGolfersFromState);

  const menuItems = [
    { value: 1, label: 'One Golfer $140 USD' },
    { value: 2, label: 'Two Golfers $280 USD' },
    { value: 3, label: 'Three Golfers $420 USD' },
    { value: 4, label: 'Four Golfers $540 USD' },
  ];

  const isDisabled = () => {
    return !(firstName && lastName && team && golfers);
  };

  const getButtonText = () => {
    return golfers === 0
      ? 'Next Step'
      : golfers === 1
      ? 'Make Payment'
      : 'Add Teammates';
  };

  const handleNextStep = () => {
    const nextStep = 1 + (golfers === 1 ? 2 : 1);

    const primary = { id: 1, firstName, lastName };

    dispatch(setTeamName(team));
    dispatch(setStep(nextStep));
    dispatch(addPrimary(primary));
    dispatch(setNumGolfers(golfers));
  };

  const handleSelectNumGolfers = (e: ChangeEvent<Select>) => {
    console.log('hitting', e);
    const golfers = e.target.value;

    setGolfers(golfers);
  };

  useEffect(() => {
    setFirstName(firstNameFromState);
    setLastName(lastNameFromState);
    setGolfers(numGolfersFromState);
    setTeam(teamNameFromState);
  }, [
    firstNameFromState,
    lastNameFromState,
    numGolfersFromState,
    teamNameFromState,
  ]);

  return (
    <Box className={styles.rightBox}>
      {/* <Paper className={styles.paper}> */}
      <Typography
        variant="h4"
        style={{ fontWeight: 'bold', color: theme.crossroads.dark }}
      >
        Register
      </Typography>

      <Box className={styles.formControlsBox}>
        <TextField
          fullWidth
          variant="outlined"
          label="Your First Name"
          value={firstName}
          placeholder="Tiger"
          onChange={(e) => setFirstName(e.target.value)}
          style={{ marginTop: 20 }}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Your Last Name"
          value={lastName}
          placeholder="Woods"
          style={{ marginTop: 20 }}
          onChange={(e) => setLastName(e.target.value)}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Team Name"
          value={team}
          placeholder="Team Tiger"
          onChange={(e) => setTeam(e.target.value)}
          style={{ marginTop: 20 }}
        />

        <FormControl style={{ width: '100%', marginTop: 20 }}>
          <InputLabel id="label" style={{ marginLeft: 15 }}>
            Number of Golfers
          </InputLabel>
          <Select
            labelId="label"
            style={{ width: '100%' }}
            defaultValue={golfers}
            onChange={handleSelectNumGolfers}
            variant="outlined"
          >
            {menuItems.map(({ label, value }) => (
              <MenuItem key={label} value={value} style={{ width: '100%' }}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleNextStep}
          fullWidth
          size="large"
          disabled={isDisabled()}
          style={{
            marginTop: 20,
            color: isDisabled()
              ? theme.crossroads.dark
              : theme.crossroads.light,
            fontWeight: 'bold',
            backgroundColor: isDisabled()
              ? theme.crossroads.secondary
              : theme.crossroads.blue,
          }}
        >
          {getButtonText()}
        </Button>
      </Box>
      {/* </Paper> */}
    </Box>
  );
};

export default Primary;
