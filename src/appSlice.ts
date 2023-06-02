import { createSlice } from '@reduxjs/toolkit'

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('react-ts-app-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Failed to load state from local storage:', e);
    return undefined;
  }
};

const getAppState = (state: any) => {
  if (state && state.app) {
    return state.app;
  }
  return undefined;
}

const persistedState = getAppState(loadFromLocalStorage())

const initialState = {
  value: 0,
  user: {
    name: 'John Doe',
    apiKey: ''
  },
  game: {}
}

export const counterSlice = createSlice({
  name: 'app',
  initialState: persistedState || initialState,
  reducers: {
    increment: (state: any) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state: any) => {
      state.value -= 1
    },
    incrementByAmount: (state: any, action: any) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer