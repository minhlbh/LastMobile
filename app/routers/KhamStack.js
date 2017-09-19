import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import FindDoctor from '../kham/screens/FindDoctor';
import FoundDoctor from '../kham/screens/FoundDoctor';

export default (KhamStack = StackNavigator({
    FindDoctor: {
        screen: FindDoctor,
        navigationOptions: {
            header: null
        }
    },
    FoundDoctor: {
        screen: FoundDoctor,
        navigationOptions: {
            header: null
        }
    }
}));
