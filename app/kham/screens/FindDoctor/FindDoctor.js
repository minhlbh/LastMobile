import React, { Component } from 'react';
import {
    View, TouchableOpacity, Picker, Switch, TextInput, Thumbnail, Image,
} from 'react-native';
import {
    Text, Icon, ListItem, Divider, Button,
} from 'react-native-elements';
import styles from './styles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {HeaderForeground,StickyHeader} from '../../../components';
import { connect} from 'react-redux';

class FindDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueHoSo: {},
            valueKhoa: '',
            valueSwitch: false,
            textInput: '',
            image: ''
        }
    }

    render() {
        var {profilesList} = this.props;        
        return (
            <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, backgroundColor: 'white' }}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={80}
                    renderForeground={() => (
                        <HeaderForeground name='Gặp bác sĩ'/>                        
                    )}
                    stickyHeaderHeight={30}
                    renderStickyHeader={() => (
                        <StickyHeader name='Gặp bác sĩ' />                        
                    )}>

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <Text style={styles.textDividerTitle}>Hồ sơ</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                            <Picker
                                style={styles.picker}
                                mode='dropdown'
                                selectedValue={this.state.valueHoSo}
                                onValueChange={(itemValue, itemIndex) => this.setState({
                                    valueHoSo: itemValue
                                })}>
                                <Picker.Item
                                    style={styles.textDividerTitle}
                                    label='Chọn hồ sơ' />
                                {profilesList.map((profile) =>(
                                    <Picker.Item
                                    style={styles.textDividerTitle}
                                    label={profile.HoVaTen} value={profile} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <Divider style={styles.divider} />

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <Text style={styles.textDividerTitle}>Khoa</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                            <Picker
                                style={styles.picker}
                                mode='dropdown'
                                selectedValue={this.state.valueKhoa}
                                onValueChange={(itemValue, itemIndex) => this.setState({
                                    valueKhoa: itemValue
                                })}>
                                <Picker.Item
                                    style={styles.textDividerTitle}
                                    label='Chuyên khoa' value='1' />
                                <Picker.Item
                                    style={styles.textDividerTitle}
                                    label='Đa khoa' value='2' />
                            </Picker>
                        </View>
                    </View>

                    <Divider style={styles.divider} />

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <Text style={styles.textDividerTitle}>Ẩn danh</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                            <Switch
                                value={this.state.valueSwitch}
                                onValueChange={(value) => this.setState({
                                    valueSwitch: !value
                                })} />
                        </View>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            placeholder='Vấn đề gặp phải'
                            onChangeText={(text) => this.setState({ textInput: text })}
                            value={this.state.textInput}
                        />
                    </View>

                    <View>
                        <View style={{ marginTop: 5, marginBottom: 10 }}>
                            <Text style={styles.textDividerTitle}>HÌNH ẢNH</Text>
                        </View>
                        {this.state.image ?
                            <View>
                                <Image source={{ uri: this.state.image }}

                                />
                            </View> :
                            <View style={{ width: 80, height: 80 }}>
                                <TouchableOpacity>
                                    <Image style={{ width: 80, height: 80 }} source={{ uri: 'https://image.freepik.com/free-icon/plus-sign-ios-7-interface-symbol_318-38775.jpg' }}
                                    />
                                </TouchableOpacity>
                            </View>
                        }

                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View style={{ borderBottomWidth: 1.2, borderLeftWidth: 1.2, borderRightWidth: 1.2, borderTopWidth: 1.2, borderColor: '#5198D0' }}>
                            <Button
                                buttonStyle={styles.button}
                                onPress={() => {}}
                                title="Tìm bác sĩ"
                                textStyle={{ color: '#5198D0', fontSize: 18 }}
                            />
                        </View>
                    </View>
                </ParallaxScrollView>
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        profilesList: state.user.profiles
    }
}

export default connect(mapStateToProps)(FindDoctor);
