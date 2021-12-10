/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Text,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Global from './Global.jsx';

import ForgotPassword from './screens/ForgotPassword.jsx';
import LogIn from './screens/LogIn.jsx';
import Properties from './screens/Properties.jsx';
import SignUp from './screens/SignUp.jsx';
import HomeFeed from './screens/HomeFeed.jsx';
import Property from './screens/PropertyNew.jsx';
import NewListing from './screens/NewListing.jsx';

const App = () => {
  const [ user, setUser ] = Global.useUser();
  const [ initializing, setInitializing ] = Global.useInitializing();
  const [ lang, setLang ] = Global.useLang();
  
  const Stack = createNativeStackNavigator();
  
  console.log('App(): ', user);
  
  return (
    <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" />
        <Stack.Navigator initialRouteName="Sign up">
          { user ? (
            <> 
              <Stack.Screen name="Home Feed" component={HomeFeed} options={{headerShown: false, title: lang.homeFeed.header}} />
              <Stack.Screen name="Property" component={Property} options={{headerShown: false, title: lang.property.header}} />
              <Stack.Screen name="Properties" component={Properties} options={{headerShown: false, title: lang.properties.header}} />
              <Stack.Screen name="New Listing" component={NewListing} options={{headerShown: false, title: lang.homeFeed.header}} />
              {/* <Stack.Screen name="Property" component={Property} options={{headerShown: false, title: 'Property'}} /> */}
            </>
          ) : (
            <>
              <Stack.Screen name="Log In" component={LogIn} options={{headerShown: false, title: lang.logIn.header}} />
              <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{headerShown: false, title: lang.forgotPassword.header}} />
              <Stack.Screen name="Sign Up" component={SignUp} options={{headerShown: false, title: lang.signUp.header}} />
            </>
          ) }
        </Stack.Navigator>
    </NavigationContainer> 
  );
};

export default App;

/*

  { <NavigationContainer>
      <Stack.Navigator initialRouteName="Log in">
        { null != null ? (
          <Stack.Screen name="Properties" component={Properties} />
        ) : (
          <>
            <Stack.Screen name="Log in" component={LogIn} />
            <Stack.Screen name="Forgot Password" component={ForgotPassword} />
            <Stack.Screen name="Sign Up" component={SignUp} />
          </>
        ) }
      </Stack.Navigator>
    </NavigationContainer> }

*/