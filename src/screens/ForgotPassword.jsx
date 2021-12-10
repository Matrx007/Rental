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
import Global from '../Global.jsx';

import SimpleButton from '../components/SimpleButton.jsx';

// This is a navigator's screen
const ForgotPassword = ({ navigation }) => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [lang, setLang] = Global.useLang();

  function sendEMail() {

  }
  
  return (
    <View style={[ Styles.Styles.fillScreen, { backgroundColor: '#0000' } ]}>
      <View style={[ Styles.Styles.oneThirdSection, {  paddingHorizontal: 32 } ]}>
        <Text style={ Styles.Styles.pageTitle }>{lang.forgotPassword.title}</Text>
        <Text style={ Styles.Styles.pageSubTitle }>{lang.forgotPassword.subtitle}</Text>
      </View>

      <View style={[ Styles.Styles.oneThirdSection, {  paddingHorizontal: 32 } ]}>
        <View style={[ Styles.Styles.combinedSection, { marginBottom: 8 } ]}>
          <Text style={ Styles.Styles.combinedSectionHeader }>{lang.forgotPassword.emailField}</Text>
          <TextInput
            placeholder="Aa"
            onChangeText={(forgotPasswordEmail) => setForgotPasswordEmail(forgotPasswordEmail)}
            value={forgotPasswordEmail}
            style={Styles.Styles.inputBox}
            placeholderTextColor='#0008'
            />
        </View>
          
          <SimpleButton title={lang.forgotPassword.submit} onPress={sendEMail}/>
      </View>
      
      <View style={Styles.Styles.oneThirdSection}>
        <TouchableOpacity onPress={() => navigation.replace('Log In')}>
          <Text style={ Styles.Styles.navigationLink }>{lang.forgotPassword.goToLogin}</Text>
        </TouchableOpacity>
      </View> 
    </View> 
  );
}
export default ForgotPassword;