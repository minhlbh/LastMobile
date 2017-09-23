import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../../config/styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    textDividerTitle: {
        color: colors.dark,
        fontSize: 15
    },
    generalText: {
        color: 'black', fontWeight: 'bold'
    },
    textHeader: {
        color: colors.header.text,
        fontSize: 25,
        fontWeight: 'bold'
    },
    textInput: {
        height: 150,
        borderTopWidth: (Platform.OS === 'ios') ? 1 : 0.5,
        borderBottomWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: colors.gray
    },
    picker: {
        width: 170,
    },
    divider: {
        backgroundColor: colors.gray
    },
    button: {
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    buttonView: {
        borderBottomWidth: (Platform.OS === 'ios') ? 1 : 1.2,
        borderLeftWidth: (Platform.OS === 'ios') ? 1 : 1.2,
        borderRightWidth: (Platform.OS === 'ios') ? 1 : 1.2,
        borderTopWidth: (Platform.OS === 'ios') ? 1 : 1.2,
        borderRadius: (Platform.OS === 'ios') ? 25 : 0,
        borderColor: '#5198D0'
    },
    switchView: {
        flex: 1,
        alignSelf: 'flex-end',
        marginLeft: (Platform.OS === 'ios') ? 200 : 0,
        marginTop: (Platform.OS === 'ios') ? 10 : 0,
    },
    pickerView: {
        flex: 1,
        alignSelf: 'flex-end',
        marginLeft: deviceWidth / 4
    },
    khoaView: {
        flexDirection: 'row',
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 15 : 0,
    },
    transparentView: {
        backgroundColor: 'black',
        zIndex: 1, position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        opacity: 0.5,
        width: 500,
        height: 1000
    },
    viewDoctorInfo: {
        zIndex: 2,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        opacity: 1
    }
})