import { createSlice } from '@reduxjs/toolkit'
import { AppData, User, Plant, Garden, Guild, Group, PlantEvent } from './types'

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

const initialState: AppData = {
  user: {
    name: 'Caretaker',
    location: {
      coordinates: {
        latitude: null,
        longitude: null
      }
    },
    settings: {
      dateFormat: 'MM/DD/YYYY',
      defaultIsOutdoor: null,
      defaultWateringFrequency: null,
      defaultSunNeeds: null
    }
  } as User,
  plants: {
    // id: { name: ..., ... }
  } as Array<Plant>,
  selectedPlantId: null,
  eventsLastCreatedAt: 0,
  gardens: {
    // id: { plantIds: [...], name: ..., ... }
  } as Array<Garden>,
  groups: {
    // id: { plantIds: [...], name: ..., ... }
  } as Array<Group>,
  guilds: {
    // id: { plantIds: [...], name: ..., ... }
  } as Array<Guild>,
  events: [
    // { id: ..., type: 'water', plantId: '123', date: '2020-01-01', severity: 'low' }
  ] as Array<PlantEvent>
}

export const counterSlice = createSlice({
  name: 'app',
  initialState: { ...initialState, ...persistedState},
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    addPlant: (state: any, action: any) => {
      // console.log('ADDING PLANT', action.payload)
      state.plants[action.payload.id] = action.payload
    },
    setSelectedPlant: (state: any, action: any) => {
      // console.log('SETTING SELECTED PLANT ID', action.payload.id)
      state.selectedPlantId = action.payload.id
    },
    clearSelectedPlant: (state: any) => {
      state.selectedPlantId = null
    },
    updatePlant: (state: any, action: any) => {
      // console.log('UPDATING PLANT', action.payload)
      state.plants[action.payload.id] = action.payload
    },
    removePlant: (state: any, action: any) => {
      // console.log('REMOVING PLANT BY ID', action.payload.id)
      delete state.plants[action.payload.id]
    },
    updateEvents: (state: any, action: any) => {
      console.log('UPDATING EVENTS', action.payload)
      state.events = action.payload
    },
    updateEventsLastCreatedAt: (state: any) => {
      console.log('UPDATING EVENTS LAST CREATED AT')
      state.eventsLastCreatedAt = Date.now()
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  addPlant, 
  setSelectedPlant, 
  clearSelectedPlant, 
  updatePlant, 
  removePlant,
  updateEvents,
  updateEventsLastCreatedAt
} = counterSlice.actions

export default counterSlice.reducer