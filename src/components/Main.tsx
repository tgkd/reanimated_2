import React from 'react';
import { View, StyleSheet } from 'react-native';

//import AnimatedScroll from './AnimatedScroll';
import AnimatedCard from './AnimatedCard';

export default function Main() {
  return (
    <View style={styles.container}>
      <AnimatedCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
});
