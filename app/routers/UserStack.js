import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import User from '../user/screens/User';

export default (UserStack = StackNavigator({
    User: {
        screen: User,
        navigationOptions: {
            header: null
        }
    },
}));
