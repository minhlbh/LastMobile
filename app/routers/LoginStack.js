import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Login from '../auth/screens/Login';
import Register from '../auth/screens/Register';
import ConfirmCode from '../auth/screens/ConfirmCode';
import CreateAccount from '../auth/screens/CreateAccount';

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
    },
    ConfirmCode: {
        screen: ConfirmCode,
        navigationOptions: {
            header: null
        }
    },
    CreateAccount: {
        screen: CreateAccount,
        navigationOptions: {
            header: null
        }
    },
}));
