import React, { Component } from "react";
import { StackNavigator, TabNavigator} from "react-navigation";
import TuVanTab from '../hoSo/screens/tuvan-tab';
import HoSoTab from '../hoSo/screens/hoso-tab';
import BacSiTab from '../hoSo/screens/bacsi-tab';


const Tabs = TabNavigator({
    TuVanTab: {
      screen: TuVanTab,
      navigationOptions: {
        tabBarLabel: 'Lịch sử tư vấn',
        title: 'Header title'
      },
    },
    HoSoTab: {
        screen: HoSoTab,
        navigationOptions: {
          tabBarLabel: 'Hồ sơ của tôi',
        },
      },
    BacSiTab: {
        screen: BacSiTab,
        navigationOptions: {
          tabBarLabel: 'Bác sĩ của tôi',
        },
      },
  }, {
      tabBarPosition: 'top',
      lazy: true,   
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: '#CCC',
        animationEnabled : true,
        style: {
          backgroundColor: '#FFF',
          paddingTop: 0,
        },
        labelStyle: {
          fontSize: 13,
        },
        indicatorStyle: {
          backgroundColor: 'black',
        },
        scrollEnabled : true
      }
    });

export default (HoSoStack = StackNavigator({
    HoSo: {
        screen: Tabs,
        navigationOptions: {
            title: 'Hồ sơ',
            headerTitleStyle : { 
                alignSelf: 'center',     
            }
        }
    },
}));

