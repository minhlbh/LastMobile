import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Home from '../home/screens';
import KhamStack from './KhamStack';
import ChatHistory from '../kham/screens/ChatHistory';

export default (HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Kham: {
        screen: KhamStack,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    ChatHistory:{
        screen :ChatHistory,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    }
}));
