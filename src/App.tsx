import type {PropsWithChildren} from 'react';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from './Navigation';
import useInternetConnection from './hooks/useInternetConnection';
import {store} from './redux/store';

import * as eva from '@eva-design/eva';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {ApplicationProvider} from '@ui-kitten/components';
import customTheme from './utils/kittentheme';
export type RootStackParamList = {
  BottomTabs: undefined;
  Details: {itemId: number};
  Login: undefined;
  OTPScreen: undefined;
  WelcomeScreen: undefined;
  Listing: {
    userData: any;
  };
  AccountDetails: {userData: any};
  SingleUserDetail: {userData: any};
};

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App() {
  const {isConnected, retry} = useInternetConnection();

  if (!isConnected) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No internet connection</Text>
        <TouchableOpacity onPress={retry}>
          <Text>App Only work when connected to internet</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <ApplicationProvider
          {...eva}
          // theme={eva.light}
          theme={customTheme}>
          <AppNavigator />
        </ApplicationProvider>
      </BottomSheetModalProvider>
    </Provider>
  );
}

export default App;
