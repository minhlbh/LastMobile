import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import FindDoctor from '../kham/screens/FindDoctor';
import Chat from '../kham/screens/Chat';
import DoctorInfo from '../kham/screens/DoctorInfo';

export default (KhamStack = StackNavigator({
    DoctorInfo: {
        screen: DoctorInfo,
        navigationOptions: {
            header: null
        }
    },
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
