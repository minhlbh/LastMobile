import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Calendar from '../calendar/screens/calendar-tab' ;

export default (CalendarStack = StackNavigator({
    Calendar: {
        screen: Calendar,
        navigationOptions: {
            title: 'Lịch khám chữa',
            headerTitleStyle : { 
                alignSelf: 'center',     
            },
            headerStyle: { backgroundColor: '#fff', elevation:0 },
        }
    },
}));
