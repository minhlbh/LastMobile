import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Doctor from '../doctor/screens/Doctor';

export default (DoctorStack = StackNavigator({
    Doctor: {
        screen: Doctor,
        navigationOptions: {
            header: null
        }
    },
}));
