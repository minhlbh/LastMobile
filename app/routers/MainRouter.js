import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Tabs from './TabsRouter';
import LoginStack from './LoginStack';
import Intro from '../auth/screens/Intro';

export default (StackNav = StackNavigator({ 
    Intro:{
        screen: Intro,
        navigationOptions: {
            header: null
        }
    },
    LoginStack: {
        screen: LoginStack,
        navigationOptions: {
            header: null
        }
    },
    Tabs: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
}));