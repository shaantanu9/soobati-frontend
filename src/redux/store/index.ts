import {configureStore} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';
import {persistReducer, persistStore} from 'redux-persist';
import rootReducer from '../features';
// import otherReducer from './features/otherSlice'; // Example additional reducer
const storage = new MMKV();

const persistConfig = {
  key: 'root',
  storage: {
    setItem: (key: any, value: any) => Promise.resolve(storage.set(key, value)),
    getItem: (key: any) => Promise.resolve(storage.getString(key) ?? ''),
    removeItem: (key: any) => Promise.resolve(storage.delete(key)),
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middlewares: Middleware[] = [
//   ...getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
//   thunk,
// ];

export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disabling serializability checks
    }).concat(),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
