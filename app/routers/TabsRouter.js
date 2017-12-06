import React, { Component } from 'react';
import { TabNavigator } from "react-navigation";
import HomeStack from './HomeStack';
import CalendarStack from './CalendarStack';
import HoSoStack from './HoSoStack';
import UserStack from './UserStack';
import { Icon } from 'react-native-elements';

const Tabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Trang chủ',
      tabBarIcon: ({ tintColor }) => <Icon name="home"  color={tintColor}  size={28}/>
    },
  },
  HoSo: {
    screen: HoSoStack,
    navigationOptions: {
      tabBarLabel: 'Hồ sơ',
      tabBarIcon: ({ tintColor }) => <Icon name="format-list-bulleted"  color={tintColor} size={28}/>
    },
  },
  Calendar: {
    screen: CalendarStack,
    navigationOptions: {
      tabBarLabel: 'Lịch',
      tabBarIcon: ({ tintColor }) => <Icon type='material-community' name="calendar-blank" color={tintColor} size={28}/>
    },
  },
  User: {
    screen: UserStack,
    navigationOptions: {
      tabBarLabel: 'Tài khoản',
      tabBarIcon: ({ tintColor }) => <Icon name="person" color={tintColor} size={28}/>
    },
  },
}, {
    tabBarPosition: 'bottom',
    lazy: true,   
    swipeEnabled :false, 
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#CCC',
      showIcon: true,
      animationEnabled : true,
      style: {
        backgroundColor: '#FFF',
        paddingTop: 0,
        height: 55
      },
      labelStyle: {
        fontSize: 10,
      },
      indicatorStyle: {
        backgroundColor: 'black',
      },
    }
  });

export default Tabs;