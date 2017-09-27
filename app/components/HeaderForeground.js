import React, { Component } from 'react';
import {View, TouchableOpacity } from 'react-native';
import {
     Icon,Text
} from 'react-native-elements';


export class HeaderForeground extends Component {
    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: 1, }}>
                <TouchableOpacity>
                    <Text h3 style={{ color: 'black' , fontWeight :'bold'  }}>{this.props.name}</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
        
    }
}