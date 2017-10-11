import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Login from '../auth/screens/Login';
import VerifyPhone from '../auth/screens/VerifyPhone';
import ConfirmCode from '../auth/screens/ConfirmCode';
import CreateAccount from '../auth/screens/CreateAccount';

export default (LoginStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    VerifyPhone: {
        screen: VerifyPhone,
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
