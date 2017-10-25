import React, { Component } from 'react';
import {
    View, Text, Image, Picker, TouchableOpacity, StyleSheet
} from 'react-native';
import {
    ListItem, FormInput, Button
} from 'react-native-elements';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gioiTinh: '',
            namSinh: '',
            hoTen: 'Họ và tên',
            moTa: ''


        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.AvatarandName}>
                    <TouchableOpacity>
                        <Image source={{ uri: 'https://www.shareicon.net/data/2015/09/09/98455_man_512x512.png' }}
                            style={{ width: 100, height: 100 }} />
                    </TouchableOpacity>

                    <FormInput
                        containerStyle={{ alignSelf: 'center' }}
                        underlineColorAndroid='transparent'
                        value={this.state.hoTen}
                        inputStyle={{ fontSize: 22, textAlign: 'center' }}
                        onChangeText={(name) => this.setState({ hoTen: name })}
                        maxLength={30}
                    />
                </View>

                <View style={{ flex: 3 }}>
                    <View style={styles.itemList}>
                        <View style={{ flex: 4, paddingLeft: 20 }}>
                            <Text style={styles.text}>Giới tính</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Picker
                                mode='dropdown'
                                selectedValue={this.state.gioiTinh}
                                onValueChange={(itemValue, itemIndex) => this.setState({ gioiTinh: itemValue })}
                            >
                                <Picker.Item label='Nam' value='Nam' />
                                <Picker.Item label='Nữ' value='Nữ' />
                                <Picker.Item label='Khác' value='Khác' />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.itemList}>
                        <View style={{ flex: 4, paddingLeft: 20 }}>
                            <Text style={styles.text}>Năm sinh</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Picker
                                mode='dialog'
                                selectedValue={this.state.namSinh}
                                onValueChange={(itemValue, itemIndex) => this.setState({ namSinh: itemValue })}
                            >
                                <Picker.Item label='1970' value='1970' />
                                <Picker.Item label='1971' value='1971' />
                                <Picker.Item label='1972' value='1972' />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.textDivider}>
                        <Text style={[styles.text, { paddingLeft: 20 }]}>Ghi chú</Text>
                    </View>
                    <View style={{}}>
                        <FormInput
                            placeholder='Mô tả triệu chứng, vấn đề...'
                            underlineColorAndroid='transparent'
                            containerStyle={{ height: 150 }}
                            multiline={true}
                            inputStyle={{ textAlignVertical: 'top', height: 150 }}
                            value={this.state.moTa}
                            onChangeText={(des) => this.setState({ moTa: des })}
                        />
                    </View>
                </View>
                <Button
                    title='Tạo sổ y bạ'
                    textStyle={{ fontSize: 18 }}
                    containerViewStyle={{ flex: 0.5 }}
                    buttonStyle={{ backgroundColor: '#00749B' }}
                    borderRadius={20}
                />


            </View >
        )
    }
}
const styles = StyleSheet.create({
    text: {
        color: 'black',
    },
    AvatarandName: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1.5
    },
    itemList: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7'
    },
    textDivider: {
        height: 40,
        borderBottomWidth: 1,
        justifyContent: 'center',
        borderColor: '#D7D7D7',
        backgroundColor: '#F8F8F8'
    }
})

export default CreateProfile;