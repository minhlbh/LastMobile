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
            {/* <View style={{ flex: 1 / 3, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View>
                    {this.props.icon1 &&
                        <Icon
                            style={{ marginRight: 10 }}
                            name={this.props.icon1}
                            onPress={() =>this.props.handleIconPress1()}
                        />
                    }
                </View>
                <View>
                    {this.props.icon2 &&
                        <Icon
                            name={this.props.icon2} 
                            onPress={() =>this.props.handleIconPress2()}
                        />
                    }
                </View>
            </View> */}
        </View>
        )
        
    }
}