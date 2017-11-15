import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Home from '../home/screens';
import FindDoctor from '../kham/screens/FindDoctor';
import Chat from '../kham/screens/Chat';
import ChatHistory from '../kham/screens/ChatHistory';
import CreateFastProfile from '../profiles/screens/CreateFastProfile';
import ListChuyenKhoa from '../kham/screens/ListChuyenKhoa';
import ProfileDetail from '../profiles/screens/ProfileDetail';
import EditProfile from '../profiles/screens/EditProfile';

export default (HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    ListChuyenKhoa: {
        screen: ListChuyenKhoa,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    FindDoctor: {
        screen: FindDoctor,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    Chat : {
        screen: Chat,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    ChatHistory:{
        screen :ChatHistory,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    CreateFastProfile: {
        screen: CreateFastProfile,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    ProfileDetail: {
        screen: ProfileDetail,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
}));
