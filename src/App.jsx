/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
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
import Property from './screens/Property.jsx';
import NewListing from './screens/NewListing.jsx';
import Profile from './screens/Profile.jsx';
import Loading from './screens/Loading.jsx';
import Search from './screens/Search.jsx';
import SearchResults from './screens/SearchResults.jsx';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Firebase from './Firebase.js';
import Description from './screens/property/Description.jsx';
import Gallery from './screens/property/Gallery.jsx';

const App = () => {
  console.disableYellowBox = false; 
  
  // Set an initializing state whilst Firebase connects
  const [ initializing, setInitializing ] = useState(true);
  const [ user, setUser ] = Global.useUser();
  const [ lang, setLang ] = Global.useLang();
  const [ userData, setUserData ] = Global.useUserData();
  const [ properties, setProperties ] = Global.useProperties();
  const [ loading, setLoading ] = Global.useLoading();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    console.log('authStateChanged:', user);
    if(user != null) {
      let data = await Firebase.getProperties();
      setProperties(Object.keys(data).map(key => {
        return {data: data[key], id: key};
      }));
    }
    setUser(user);
    let userData = await Firebase.onUserLogIn(user);
    if(user != null && userData == null) {
      Firebase.signOut();
      return;
    }
    console.log('received userData:', userData);
    setUserData(userData);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  if(initializing) return null;
  
  const Stack = createNativeStackNavigator();
  
  if(loading) return Loading();
  
  return (
    <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <Stack.Navigator initialRouteName="Sign up">
          { user ? (
            <> 
              <Stack.Screen name="Home Feed" component={HomeFeed} options={{headerShown: false, title: lang.homeFeed.header}} />
              <Stack.Screen name="Search" component={Search} options={{headerShown: true, title: lang.search.header}} />
              <Stack.Screen name="Search Results" component={SearchResults} options={{headerShown: true, title: lang.searchResults.header}} />
              <Stack.Screen name="Property" component={Property} options={{headerShown: true, title: lang.property.header}} />
              <Stack.Screen name="Properties" component={Properties} options={{headerShown: false, title: lang.properties.header}} />
              <Stack.Screen name="New Listing" component={NewListing} options={{headerShown: true, title: lang.newListing.header}} />
              <Stack.Screen name="Profile" component={Profile} options={{headerShown: true, title: lang.profile.header}} />
              <Stack.Screen name="Property Description" component={Description} options={{headerShown: true, title: lang.property.description}} />
              <Stack.Screen name="Property Gallery" component={Gallery} options={{
                headerShown: true, headerTransparent: true, headerShadowVisible: false, title: lang.property.gallery
              }} />
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