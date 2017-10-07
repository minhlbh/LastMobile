import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../../config/styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    textInput: {
        height: 150,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
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
    },
    text: {
        color: 'black'
    },
    button: {
        backgroundColor: '#42B72A',
        borderRadius: 20,
        height: 45,
        marginBottom:3,
        marginTop:3
    }
})