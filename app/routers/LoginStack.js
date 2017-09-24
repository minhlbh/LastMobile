import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Login from '../auth/screens/Login';
import Register from '../auth/screens/Register';

export default (LoginStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    }
}));
