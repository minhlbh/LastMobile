import React, { Component } from 'react';
import {
   Text
} from 'react-native-elements';
import {
    View
} from 'react-native';
import { connect} from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
    HeaderForeground,
    StickyHeader,
    FixedHeader,
    ItemGap
} from '../../../components';
import styles from './styles';
import accountApi from '../../../api/accountApi';

class TuVan extends Component {
    state = {
        listTuVan: [],
    };
    componentWillMount(){
        accountApi.getListTuVan(this.props.accessToken).then((res) => {
            if(res.DsCuocGap){
                this.setState({listTuVan: res.DsCuocGap})
            } 
        })
    }
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
    render(){
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={80}
                    renderForeground={() => (
                        <HeaderForeground name='Tư vấn' />
                    )}
                    renderFixedHeader={() => (
                        <FixedHeader  icon2='search' />
                    )}
                    stickyHeaderHeight={40}
                    renderStickyHeader={() => (
                        <StickyHeader name='Tư vấn' />
                    )}
                >
                    {this.state.listTuVan.map((item)=>(
                        <ItemGap item={item}
                            onPress={() => this.vaoRoom(item)}
                        />
                    ))}             
                </ParallaxScrollView>
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        accessToken: state.auth.accessToken,               
    }
}

export default connect(mapStateToProps)(TuVan);