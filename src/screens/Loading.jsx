import React from 'react';
import {
  View,
  Text,
  StatusBar
} from 'react-native';

import Styles from '../Styles.jsx';

// This is a navigators's screen
const Loading = () => {

  return (
    <View style={[ Styles.Styles.fillScreen, { flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: '#fff' } ]}>
      <StatusBar translucent backgroundColor="transparent" />
      <Text style={{color: '#000', fontWeight: '900', fontSize: 36, textAlign: 'center'}}>Rental</Text>
    </View>
  );
}
export default Loading;