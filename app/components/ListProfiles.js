import  React, { Component } from 'react';
import {View,StyleSheet ,FlatList} from 'react-native';
import {
     Avatar,List,ListItem, Divider,Text
} from 'react-native-elements';

// {
//     name: 'Tạo mới hồ sơ',
//     avatar_url: 'https://www.computerhope.com/jargon/p/plus.gif',
//     color: '#546CA8'
// }
export class ListProfiles extends Component{
    _keyExtractor = (item, index) => item.id;
    
    _renderItem = ({item}) => {
        var avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg';
        if(item.Avatar) avatar = item.Avatar;
        return (
            <ListItem
                roundAvatar
                avatar={{ uri: avatar}}
                key={item.Id}
                title={item.HoVaTen}
                subtitle={item.GioiTinh}
                titleStyle={{ color: 'black' }}
                containerStyle={{borderBottomColor: '#bbb',borderBottomWidth: 0.15}}
            />
        )
    };
    render(){
        const {profilesList} = this.props;
        return (
            <List containerStyle={{borderTopWidth: 0,borderBottomWidth:0}}>
                <FlatList
                    data={this.props.profilesList}
                    //extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </List>
        ) 
    }
}