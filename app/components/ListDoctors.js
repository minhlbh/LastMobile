import  React, { Component } from 'react';
import {View,StyleSheet ,FlatList} from 'react-native';
import {
     Avatar,List,ListItem
} from 'react-native-elements';

// {
//     name: 'Tạo mới hồ sơ',
//     avatar_url: 'https://www.computerhope.com/jargon/p/plus.gif',
//     color: '#546CA8'
// }
export class ListDoctors extends Component{
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
                subtitle={item.ChuyenKhoa}
               // titleStyle={{ color: 'black' }}
            />
        )
    };
    render(){
        const {doctorsList} = this.props;
        return (
            <List>
                <FlatList
                    data={this.props.doctorsList}
                    //extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </List>
        ) 
    }
}