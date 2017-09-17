import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Tabs from './TabsRouter';
import LoginStack from './LoginStack';

export default (StackNav = StackNavigator({ 
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