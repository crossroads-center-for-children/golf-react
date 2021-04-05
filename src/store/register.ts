import { createAction, createReducer } from '@reduxjs/toolkit';

import { Teammate, Teammates } from '../types';

interface RegisterState {
  step: number;
  orderIsComplete: boolean;
  teamName: string;
  primary: Teammate;
  numGolfers: number;
  teammates: Teammates;
}

export const addPrimary = createAction<Teammate>('register/addPrimary');
export const setNumGolfers = createAction<number>('register/setNumGolfers');
export const setTeamName = createAction<string>('register/setTeamName');
export const setTeammates = createAction<Teammates>('register/setTeammates');
export const setStep = createAction<number>('register/setStep');
export const setOrderIsComplete = createAction<boolean>(
  'register/setOrderIsComplete'
);

const initialState = {
  teamName: '',

  step: 1,

  orderIsComplete: false,

  primary: {
    id: 1,
    firstName: '',
    lastName: '',
  },

  numGolfers: 0,

  teammates: {
    2: {
      id: 2,
      firstName: '',
      lastName: '',
    },
    3: {
      id: 3,
      firstName: '',
      lastName: '',
    },
    4: {
      id: 4,
      firstName: '',
      lastName: '',
    },
  },
} as RegisterState;

const registerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTeamName, (state, action) => {
      state.teamName = action.payload;
    })
    .addCase(setStep, (state, action) => {
      state.step = action.payload;
    })
    .addCase(setOrderIsComplete, (state, action) => {
      state.orderIsComplete = action.payload;
    })
    .addCase(addPrimary, (state, action) => {
      state.primary = action.payload;
    })
    .addCase(setNumGolfers, (state, action) => {
      state.numGolfers = action.payload;
    })
    .addCase(setTeammates, (state, action) => {
      state.teammates = action.payload;
    });
});

export default registerReducer;
