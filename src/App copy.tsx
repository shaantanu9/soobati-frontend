/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { Header } from 'react-native/Libraries/NewAppScreen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState();

  useEffect(() => {
    console.log('useEffect line 41')
    GoogleSignin.configure({
      webClientId:'909275939123-a9392ios219dbnk5b4o0m68khp1f3l2a.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
    isSignedIn();
  }, []);

  const singIn = async () => {
    console.log('sign in line 50')
    try {
      await GoogleSignin.hasPlayServices();
      const user= await GoogleSignin.signIn();
      console.log(user)
      // setUser({...userInfo});
    } catch (error: any) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      }
    }
  };

  const isSignedIn = async () => {
    console.log('isSignedIn line 69')
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please login');
    }
    setLoggedIn(isSignedIn);
  };

  const getCurrentUserInfo = async () => {
    console.log('getCurrentUserInfo line 81')
    try {
      const userInfo:any = await GoogleSignin.signInSilently();
      setUser(userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('User has not signed in yet');
      } else {
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  const signOut = async () => {
    console.log('signOut line 96')
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({});

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          {!user?.idToken ? (
            <GoogleSigninButton
              onPress={singIn}
              // className="google-signin-button"
              style={{width: 192, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
            />
          ) : (
            <TouchableOpacity onPress={signOut}>
              <Text>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
