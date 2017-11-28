import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import TuVan from '../tuVan/screens/TuVan';

export default (TuVanStack = StackNavigator({
    TuVan: {
        screen: TuVan,
        navigationOptions: {
            header: null
        }
    },
}));
