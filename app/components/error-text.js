import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import {Icon} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  text: {
     color: 'red',
     fontSize: 18,
     textAlign: 'center'
  },
  viewDirection:{
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center',
  }
});

export const ErrorText= ({  error, center } = this.props) =>
  <View style={[styles.loadingContainer, center && styles.center]}>
    {error &&
        <View style={styles.viewDirection}>
            <Icon 
                name="error" 
                color='red'
                size={18}
            />
            <Text style={styles.text}>
                {error}
            </Text>
        </View>
    }
  </View>;
