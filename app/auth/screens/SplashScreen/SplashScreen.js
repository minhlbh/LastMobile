import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import images from '../../../config/images';
import {resetNavigationTo} from '../../../utils';
import {authByAsyncStorage} from '../../auth.action';

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 130,
  },
});

class Splash extends Component {

  componentDidMount() {
    const { isAuthenticated, navigation,authByAsyncStorage } = this.props;

    AsyncStorage.getItem('access_token').then((token) => {
        if(token){
            console.log(token);
            authByAsyncStorage(token);                        
            resetNavigationTo('Tabs', navigation);
        } else {
            resetNavigationTo('Intro', navigation);
        }
    })
  }

  render() {
    return (
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={images.logo}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {authByAsyncStorage})(Splash);
