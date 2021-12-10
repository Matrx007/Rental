import React from 'react';
import { StyleSheet } from 'react-native';

// Constants
const constants = {
  goldenGap: 16
};

// Colors
const colors = {
  accentColor: '#e82e5d',
  baseColor: '#fff'
};

// ed6607
const styles = {

  // Used in components/SimpleButton.jsx
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
    backgroundColor: '#e82e5d',
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  // Used in components/SimpleButton.jsx
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1.25,
    color: '#fff'
  },
  
  // Used to divide screen into 3 equal vertical 
  // blocks, in which elements are centered
  oneThirdSection: {
    height: '33.3%',
    flex: 1,
    direction: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 64
  },
  
  // Used to group elements vertically
  columnGroup: {
    flex: 1,
    direction: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  // Use full width
  fullWidth: {
    width: '100%'
  },
  
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000'
  },
  
  pageSubTitle: {
    fontSize: 21,
    fontWeight: '400',
    color: '#222'
  },
  
  // Applied to <Text> elements.
  // Makes text look like clickable link.
  navigationLink: {
    fontSize: 18,
    fontWeight: '700',
    margin: 4,
    color: '#000',
    letterSpacing: 1,
    paddingLeft: 12,
    borderLeftColor: colors.accentColor,
    borderLeftWidth: 3
  },
  
  fillScreen: {
    width: '100%',
    height: '100%'
  },
  
  // Used to combine elements int oone section
  // Decorated by a border on left side
  combinedSection: {
    width: '100%',
    margin: 2,
    paddingLeft: 12,
    borderLeftColor: colors.accentColor,
    borderLeftWidth: 2
  },

  combinedSectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000'
  },
  
  // Used for <TextInput> elements
  inputBox: {
    padding: 0,
    height: 40,
    color: '#000'
  },
  
  listingField: {
    borderWidth: 1.5,
    borderColor: '#d8d8d8',
    width: 230,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 0,
    borderRadius: 6,
    fontSize: 18,
    fontWeight: '500',
    color: '#000'
  },

  card: {
    borderRadius: 8,
    backgroundColor: '#f4f4f4e0',
    
    /* shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8, */
  }
};

export default {
  Styles: styles,
  Constants: constants,
  Colors: colors
};