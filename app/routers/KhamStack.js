import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import FindDoctor from '../kham/screens/FindDoctor';

export default (KhamStack = StackNavigator({
    FindDoctor: {
        screen: FindDoctor,
        navigationOptions: {
            header: null
        }
    },
}));
