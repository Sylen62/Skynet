import React from 'react';
import { View, StyleSheet } from 'react-native';

const MainContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default MainContainer;
