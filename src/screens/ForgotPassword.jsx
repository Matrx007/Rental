import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import { useState } from 'react';

import Styles from '../Styles.jsx';

import SimpleButton from '../components/SimpleButton.jsx';

// This is a navigator's screen
const ForgotPassword = ({ navigation }) => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  
  function sendEMail() {

  }
  
  return (
    <View style={[ Styles.Styles.fillScreen, { backgroundColor: '#0000' } ]}>
      <View style={[ Styles.Styles.oneThirdSection, {  paddingHorizontal: 32 } ]}>
        <Text style={ Styles.Styles.pageTitle }>Can't log in?</Text>
        <Text style={ Styles.Styles.pageSubTitle }>Recover your password</Text>
      </View>

      <View style={[ Styles.Styles.oneThirdSection, {  paddingHorizontal: 32 } ]}>
        <View style={[ Styles.Styles.combinedSection, { marginBottom: 8 } ]}>
          <Text style={ Styles.Styles.combinedSectionHeader }>E-MAIL</Text>
          <TextInput
            placeholder="Aa"
            onChangeText={(forgotPasswordEmail) => setForgotPasswordEmail(forgotPasswordEmail)}
            value={forgotPasswordEmail}
            style={Styles.Styles.inputBox}
            placeholderTextColor='#0008'
            />
        </View>
          
          <SimpleButton title="Send e-mail" onPress={sendEMail}/>
      </View>
      
      <View style={Styles.Styles.oneThirdSection}>
        <TouchableOpacity onPress={() => navigation.replace('Log In')}>
          <Text style={ Styles.Styles.navigationLink }>Nevermind, figured it out</Text>
        </TouchableOpacity>
      </View> 
    </View> 
  );
}
export default ForgotPassword;