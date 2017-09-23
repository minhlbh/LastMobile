import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
    textPanel2: {
        color: colors.dark,
        marginLeft: 10,
        marginRight: 10,
    },
    viewAvatar: {
        alignSelf: 'center',
        zIndex: 2,
        position: 'absolute',
        marginTop: 105
    },
    viewInfo: {
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        marginTop: 190,
        zIndex: 1,
        height: 280,
        borderRadius:20
    },
    viewButton: {
        zIndex: 2,
        position: 'absolute',
        marginTop: 370,
        alignSelf: 'center'
    },
    button1: {
        borderWidth: 1.5,
        borderColor: '#5198D0',
        backgroundColor: 'white',
        borderRadius: 20,
        width: 100,
        height: 40,
    },
    buttonText1: {
        color: '#0E81FF',
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 18,
    },
    buttonText2: {
        color: '#686868',
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 18,
    },
    doctorName:{
        color: colors.dark,
        marginLeft: 10,
        marginRight: 10,
        fontSize:20,
        fontWeight:'bold'
    }
})