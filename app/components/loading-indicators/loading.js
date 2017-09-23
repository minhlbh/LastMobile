import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';


const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  loadingIcon: {
    height: 80,
  },
  text: {
    //...fonts.fontPrimary,
  },
});

export const Loading= ({ animating, text, center } = this.props) =>
  <View style={[styles.loadingContainer, center && styles.center]}>
    <ActivityIndicator
      animating={animating}
      style={styles.loadingIcon}
      size="small"
    />
    {text &&
      <Text style={styles.text}>
        {text}
      </Text>}
  </View>;
