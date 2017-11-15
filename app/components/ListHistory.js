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
export class ListHistory extends Component{
    _keyExtractor = (item, index) => item.id;
    
    vaoRoom(idGap){
        this.props.navigation.navigate('ChatHistory', {
            idGap: idGap
            })
        this.props.khaiBaoUser();
    }
    _renderItem = ({item}) => {
        var avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg';
        if(item.BacSi.Avatar) avatar = item.BacSi.Avatar;
        return (
            <ListItem
                roundAvatar
                avatar={{ uri: avatar}}
                key={item.IdGap}
                title={'Bác sĩ: '+item.BacSi.TenBacSi}
                onPress={() => {
                    this.vaoRoom(item.IdGap)
                }}
                subtitle={item.VanDe}
                titleStyle={{ color: 'black' }}
               containerStyle={{borderBottomColor: '#bbb',borderBottomWidth: 0.15}}
            />
        )
    };
    render(){
        const {historyList} = this.props;
        return (
            <List containerStyle={{borderTopWidth: 0,borderBottomWidth:0}}>            
                <FlatList
                    data={historyList}
                    //extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </List>
        ) 
    }
}