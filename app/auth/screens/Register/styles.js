import { StyleSheet, Dimensions } from 'react-native';
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    gradient: {
        height: deviceHeight,
        width: deviceWidth,
        justifyContent: 'center',
        flex: 7
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
    textFooter: {
        color: 'white',
        fontSize: 11
    },
    formContainer:{
        alignItems: 'center', 
        flex: 4, 
        justifyContent: 'flex-end', 
        alignSelf: 'center'
    }
})