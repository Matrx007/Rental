import React from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import { useState } from 'react';

import Styles from '../Styles.jsx';

import SimpleButton from '../components/SimpleButton.jsx';

// This is a navigator's screen
const SignUp = ({ navigation }) => {
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  
  const styles = {
    columnCenterLayout: {
      direction: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: '400'
    },
    pageSubTitle: {
      fontSize: 21,
      fontWeight: '400'
    },
    signupLink: {
      fontSize: 16,
      fontWeight: '700'
    }
  };
  
  function signUp() {
    // TODO: firebase.signup(callback: navigation.replace(..))
    navigation.replace('Properties');
  }

  function skipLogIn() {

  }

  return (
    <View style={[ Styles.Styles.fillScreen, { backgroundColor: '#0000' } ]}>
      
      <View style={ Styles.Styles.oneThirdSection }>
        <Text style={ Styles.Styles.pageTitle }>Welcome to Rental!</Text>
        <Text style={ Styles.Styles.pageSubTitle }>Sign up</Text>
      </View>
      
      <View style={[ Styles.Styles.oneThirdSection, {  paddingHorizontal: 32 } ]}>
        <View style={[ Styles.Styles.combinedSection, { marginBottom: 8 } ]}>
          <Text style={ Styles.Styles.combinedSectionHeader }>E-MAIL</Text>
          <TextInput
            placeholder="Aa"
            onChangeText={(signupEmail) => setSignupEmail(signupEmail)}
            value={signupEmail}
            style={Styles.Styles.inputBox}
            placeholderTextColor='#0008'
            />
        </View>
        
        <View style={Styles.Styles.combinedSection}>
          <Text style={ Styles.Styles.combinedSectionHeader }>PASSWORD</Text>
          <TextInput
            placeholder="Aa"
            secureTextEntry={true}
            onChangeText={(signupPassword) => setSignupPassword(signupPassword)}
            value={signupPassword}
            style={Styles.Styles.inputBox}
            placeholderTextColor='#0008'
            />
        </View>
          
          <SimpleButton title="Log in" onPress={signUp}/>
      </View>
      
      <View style={Styles.Styles.oneThirdSection}>
        <View>
          <TouchableOpacity onPress={() => navigation.replace('Log In')}>
            <Text style={ Styles.Styles.navigationLink }>Already have an account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={skipLogIn}>
            <Text style={ Styles.Styles.navigationLink }>Skip signing up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default SignUp;