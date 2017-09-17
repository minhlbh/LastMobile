import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Profiles from '../profiles/screens/Profiles';

export default (ProfileStack = StackNavigator({
    Profiles: {
        screen: Profiles,
        navigationOptions: {
            header: null
        }
    },
}));
