import { StyleSheet, Dimensions } from 'react-native';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    gradient: {
        height: deviceHeight,
        width: deviceWidth
    },
    textSymbol: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15
    },
    formInput: {
        marginTop: 10,
        opacity: 0.3,
        backgroundColor: 'white',
        borderRadius: 5,
        width: deviceWidth - 50,
        height:43
    },
    buttonView: {
        opacity: 0.7,
        width: deviceWidth - 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'white',
        marginTop: 10
    },
    divider: {
        width: 100,
        height: 20,
        justifyContent: 'center'
    },
    text: {
        color: 'white'
    },
    footer: {
        backgroundColor: 'white',
        opacity: 0.3,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})