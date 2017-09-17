import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
//import Signup from '../screens/Signup';
import Login from '../auth/screens/Login';
// import InputCode from '../screens/Signup/InputCode';
// import ForgetPass from '../screens/ForgetPass';
// import ConfirmFP from '../screens/ForgetPass/ConfirmFP';
// import InputPhone from '../screens/Login/InputPhone';

export default (LoginStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
}));
