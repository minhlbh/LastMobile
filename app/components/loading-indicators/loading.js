import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';


type Props = {
  animating: boolean,
  text: string,
  center: boolean,
  color: string
};
const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
  },
});

export const Loading= ({ animating, text, center, color } : Props) =>
  <View style={[styles.loadingContainer, center && styles.center]}>
    <ActivityIndicator
      animating={animating}
      style={styles.loadingIcon}
      size="small"
      color={color}
    />
    {text &&
      <Text style={styles.text}>
        {text}
      </Text>}
  </View>;
