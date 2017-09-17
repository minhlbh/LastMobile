import React, { Component } from 'react';
import { TabNavigator } from "react-navigation";
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import DoctorStack from './DoctorStack';
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
  Doctor: {
    screen: DoctorStack,
    navigationOptions: {
      tabBarLabel: 'Bác sĩ',
      tabBarIcon: ({ tintColor }) => <Icon name="user-md" type='font-awesome' color={tintColor} size={28}/>
    },
  },
  Profiles: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Tìm bệnh án',
      tabBarIcon: ({ tintColor }) => <Icon name="search" color={tintColor} size={28}/>
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
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#CCC',
      showIcon: true,
      style: {
        backgroundColor: '#FFF',
        paddingTop: 0,
        height: 60
      },
      labelStyle: {
        fontSize: 9,
      },
      indicatorStyle: {
        backgroundColor: 'black',
      },
    }
  });

export default Tabs;