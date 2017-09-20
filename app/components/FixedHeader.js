import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
    Icon, Text
} from 'react-native-elements';
import { colors } from '../config/styles';
export class FixedHeader extends Component {
    render() {
        return (

            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', position: 'absolute' }}>
                <View style={{ flex: 1 }}>
                    {this.props.icon0 &&
                        <Icon
                            style={{ marginRight: 10 }}
                            name={this.props.icon0}
                            onPress={this.props.goBack}
                        />
                    }
                </View>
                <View>
                    {this.props.icon1 &&
                        <Icon
                            style={{ marginRight: 10 }}
                            name={this.props.icon1}
                            onPress={() => this.props.handleIconPress1()}
                        />
                    }
                </View>
                <View>
                    {this.props.icon2 &&
                        <Icon
                            name={this.props.icon2}
                            onPress={() => this.props.handleIconPress2()}
                        />
                    }
                </View>
            </View>
        )
    }
}