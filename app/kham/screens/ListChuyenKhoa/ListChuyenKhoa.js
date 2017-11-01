import React, { Component } from 'react';
import {View} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import {ViewContainer} from '../../../components';
import { connect } from 'react-redux';
import * as khamAction from '../../kham.action';
import styles from './styles';

class ListChuyenKhoa extends Component {
    componentWillMount(){
        this.props.getListChuyenKhoa();
    }
    render(){
        const { navigation,listChuyenKhoa} = this.props;
        return (
            <ViewContainer 
                onBack={() => navigation.goBack()}
                title='Chọn chuyên khoa'
            >  
               <List containerStyle={styles.listContainer}>
                    {listChuyenKhoa.map((chuyenKhoa) => (
                        <View>
                        <ListItem 
                            title={chuyenKhoa.Ten} 
                            titleStyle={styles.chuyenKhoaText}
                            subtitle={chuyenKhoa.TomTat}
                            containerStyle={{borderBottomColor: '#bbb',borderBottomWidth: 0.15}}
                            onPress={() => navigation.navigate('FindDoctor',{chuyenKhoa})}
                        />
                            {chuyenKhoa.DsChuyenKhoaCon.map((chuyenKhoaCon) => (
                                <View style={{paddingLeft: 25}}>
                                    <ListItem 
                                        titleContainerStyle={styles.conTitleContainer}
                                        title={chuyenKhoaCon.Ten} 
                                        subtitle={chuyenKhoaCon.TomTat}
                                        containerStyle={{borderBottomColor: '#bbb',borderBottomWidth: 0.5}}
                                        onPress={() => navigation.navigate('FindDoctor', {chuyenKhoa: chuyenKhoaCon})}                            
                                    />
                                </View>
                            ))}
                        </View>
                    ))}
               </List> 
            </ViewContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        listChuyenKhoa: state.kham.listChuyenKhoa,
    };
}

export default connect(mapStateToProps, khamAction)(ListChuyenKhoa)