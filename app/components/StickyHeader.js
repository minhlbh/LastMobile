import React, { Component } from 'react';
import {View, StyleSheet, Dimensions } from 'react-native';
import {
     Icon,Text
} from 'react-native-elements';
import {colors} from '../config/styles';

export  class StickyHeader extends Component {
    render(){
        return(
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.viewHeader}>
                    <Text style={styles.generalText}>{this.props.name}</Text>
                </View>
                <View style={{ flex: 4/4, flexDirection: 'row', justifyContent: 'flex-end' }}>
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
                </View>
            </View>
        )
        
    }
}

//const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles= StyleSheet.create({
    divider: {
        marginTop: 10,
        marginBottom: 40,
    },
    textDividerTitle: {
        marginTop: 15,
        color: colors.dark,
        fontWeight: 'bold',
    },
    textdivider:{
        color:'#546CA8',
        marginTop: 15,
    },
    generalText:{
        color:'black', 
        fontWeight:'bold',
        fontSize: 18
    },
    infoText:{
        fontSize:13
    },
    viewHeader:{
        marginLeft: (deviceWidth/3)
    }
})