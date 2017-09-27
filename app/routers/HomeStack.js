import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Home from '../home/screens';
import KhamStack from './KhamStack';
import ChatHistory from '../kham/screens/ChatHistory';
import CreateFastProfile from '../profiles/screens/CreateFastProfile';

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
    },
    CreateFastProfile: {
        screen: CreateFastProfile,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    }
}));
