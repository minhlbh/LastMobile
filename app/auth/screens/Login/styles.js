import { StyleSheet, Platform, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        backgroundColor: 'white'
    },
    loginTextView: {
        alignSelf: 'flex-end',
        flex: 1
    },
    loginText: {
        fontSize: 20,
        color: 'black',
        textDecorationLine: 'underline',

    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: (Platform.OS === 'ios') ? 60 : 30
    },
    labelText: {
        marginLeft: 20,
        fontSize: 20,
        color: 'black',
        marginBottom: 20
    },
    button: {
        borderRadius: 60,
        marginTop: 20,
        backgroundColor: '#575757'
    },
    socialIconView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20
    },
    formInput: {
        marginBottom: (Platform.OS === 'ios') ? 10 : 0
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: deviceHeight - 100
    },
    googleButton: {
        borderRadius: 45,
        width: 55,
        height: 55,
        borderWidth: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        borderColor: '#DEDEDE',
        backgroundColor: 'white'
    }
})