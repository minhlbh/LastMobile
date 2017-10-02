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
        width:deviceWidth - 40
    },
    buttonView: {
        opacity: 0.7,
        width: deviceWidth - 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'white',
        marginTop: 10
    },
    textFooter: {
        color: 'white',
        fontSize: 11
    },
    footer: {
        backgroundColor: 'white',
        opacity: 0.3,
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'center'
    }
})