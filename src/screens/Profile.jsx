import React from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { useState } from 'react';

import Styles from '../Styles.jsx';
import Global from '../Global.jsx';
import * as Firebase from '../Firebase.js';

import SimpleButton from '../components/SimpleButton.jsx';

// This is a navigators's screen
const Profile = ({ navigation }) => {
  const [loading, setLoading] = Global.useLoading();
  
  function signOut() {
    setLoading(true);  
    Firebase.signOut(() => setLoading(false));
  }
  
  return (
    <View style={[ Styles.Styles.fillScreen, { padding: 32, backgroundColor: '#0000' } ]}>
      <SimpleButton title={"Sign out"} onPress={signOut}/>
    </View>
  );
}
export default Profile;