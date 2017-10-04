import { StyleSheet, Dimensions } from 'react-native';
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    gradient: {
        height: deviceHeight,
        width: deviceWidth
    },
    text: {
        color: 'white'
    },
    formInput: {
        height: 43,
        marginTop: 10,
        opacity: 0.3,
        backgroundColor: 'white',
        borderRadius: 5,
        width:deviceWidth - 50
    },
    buttonView: {
        opacity: 0.7,
        width: deviceWidth/2 -  30 ,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        marginTop: 10
    },
})