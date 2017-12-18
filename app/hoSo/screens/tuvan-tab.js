import React, { Component } from 'react';
import { View, FlatList ,StyleSheet} from 'react-native';
import accountApi from '../../api/accountApi';
import {
    ItemGap
} from '../../components';
import { connect} from 'react-redux';
import {storeDoctor} from '../../kham/kham.action';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

class TuVanTab extends Component {
    state = {
        listTuVan: [],
    }
    componentWillMount() {
        accountApi.getListTuVan(this.props.accessToken).then((res) => {
            console.log(res)
            if (res.DsCuocGap) {
                this.setState({ listTuVan: res.DsCuocGap })
            }
        })
    }
    vaoRoom(item) {
        const { navigation, storeDoctor } = this.props;
        storeDoctor(item.BacSi, item.idDichVu);
        if (item.TrangThai === "Vừa lập" || item.TrangThai === "Chốt yêu cầu" ) {
            navigation.navigate('FindDoctor', {
                idGap: item.Id,
                chuyenKhoa: item.ChuyenKhoa,
                vanDe: item.VanDe,
                hoSo: item.HoSo,
                isTuVan: true
            })
        } else {
            navigation.navigate('Chat', {
                idGap: item.Id,
                chuyenKhoa: item.ChuyenKhoa,
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.listTuVan}
                    renderItem={({item}) => (
                        <ItemGap item={item}
                            onPress={() => this.vaoRoom(item)}
                        />
                    )}
                />
            </View>
        );
    }
}

function mapStateToProps(state){
    return {
        accessToken: state.auth.accessToken,               
    }
}

export default connect(mapStateToProps, {storeDoctor})(TuVanTab);