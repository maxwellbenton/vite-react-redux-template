import { configureStore } from '@reduxjs/toolkit'
import reducer from './appSlice'

const saveToLocalStorage = (state: any) => {
  try {
    const existingState = localStorage.getItem('react-ts-app-state');
    const serializedState = JSON.stringify(state);
    if (serializedState !== existingState) {
      localStorage.setItem('react-ts-app-state', serializedState);
    }
  } catch (e) {
    console.warn('Failed to save state to local storage:', e);
  }
};

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  saveToLocalStorage(store.getState());
  return result;
};

export default configureStore({
  reducer: {
    app: reducer,
  },
  middleware: [localStorageMiddleware],
});