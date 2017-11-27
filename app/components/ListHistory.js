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
    
    vaoRoom(item){
        const {navigation} = this.props;
        if(item.TrangThai === "Vừa lập" || item.TrangThai === "Chốt yêu cầu"){
            navigation.navigate('FindDoctor', {
                idGap: item.Id,
                chuyenKhoa: item.ChuyenKhoa,
                vanDe : item.VanDe,
                hoSo: item.HoSo,
            })
        }else{
            navigation.navigate('Chat', {
                idGap: item.Id,
                chuyenKhoa: item.ChuyenKhoa,
                tenBacSi: item.BacSi.TenBacSi
            })
        }
        
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
                    this.vaoRoom(item)
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