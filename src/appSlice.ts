import { createSlice } from '@reduxjs/toolkit'

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

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
  user: {
    name: 'Caretaker',
    location: {
      coordinates: {
        latitude: null,
        longitude: null
      }
    }
  },
  plants: {
    // id: {
    //   name: '',
    // ...
    // }
  },
  groups: {
    // plants: [...]
  }
}

export const counterSlice = createSlice({
  name: 'app',
  initialState: persistedState || initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    addPlant: (state: any, action: any) => {
      state.plants[uid()] = action.payload
    },
    updatePlant: (state: any, action: any) => {
      state.plants[action.payload.id] = action.payload
    },
    removePlant: (state: any, action: any) => {
      delete state.plants[action.payload.id]
    }
  },
})

// Action creators are generated for each case reducer function
export const { addPlant, updatePlant, removePlant } = counterSlice.actions

export default counterSlice.reducer