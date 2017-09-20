import React, { Component } from 'react';
import {
    View, Button, TouchableOpacity
} from 'react-native';
import {
    Avatar, Divider, Text, Icon
} from 'react-native-elements';
import {
    HeaderForeground,
    StickyHeader,
    UserInfoHome,
    ListProfiles,
    ListDoctors,
    FixedHeader
} from '../../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import styles from './styles';

export default class DoctorInfo extends Component {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.viewAvatar}>
                    <Avatar
                        containerStyle={{ width: 155, height: 155 }}
                        xlarge
                        rounded
                        source={{ uri: 'http://www.phongkhammathaiyen.com/uploads/images/Hinh%20bai%20viet/Thumbnail/Thumb_BSMinhHuy.jpg' }}
                        activeOpacity={1}
                    />
                </View>


                <View style={styles.viewInfo}>
                    <View style={{ alignItems: 'center', paddingTop: 74, backgroundColor: 'white', }}>
                        <Text h5 style={styles.textPanel2}>Bác sĩ</Text>
                        <Text style={styles.doctorName}>Lê Bá Hồng Minh</Text>
                    </View>

                    <View>
                        <View style={{ marginTop: 5, marginLeft: 30 }}>
                            <Text h5 style={styles.textPanel2}>Chuyên khoa Ung bướu,</Text>
                            <Text h5 style={styles.textPanel2}>Chuyên môn tập trung vào ung thư vú, buồng trứng,...vv....vvv....</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20, alignSelf: 'center' }}>
                            <Text h5 style={{ marginTop: 7, color: 'black' }}>Giá dịch vụ: </Text>
                            <Text h4 style={styles.doctorName}>80.000đ</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={{ marginLeft: -10 }}>
                            <View style={styles.button1}>
                                <Text style={styles.buttonText1}> Đồng ý</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 30 }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText2}> Bỏ qua</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }

}
