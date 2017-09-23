import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import FindDoctor from '../kham/screens/FindDoctor';
import Chat from '../kham/screens/Chat';

export default (KhamStack = StackNavigator({
    FindDoctor: {
        screen: FindDoctor,
        navigationOptions: {
            header: null
        }
    },
    Chat : {
        screen: Chat,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    }
}));
