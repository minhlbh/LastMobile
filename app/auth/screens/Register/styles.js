import { StyleSheet, Dimensions, Platform } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    loginTextView: {
        alignSelf: 'flex-end',
        flex: 1
    },
    loginText: {
        fontSize: 20,
        color: 'black',
        alignSelf: 'flex-end',
        flex: 1,
        marginTop: 35,
        textDecorationLine: 'underline',
        fontWeight: 'bold'

    },
    inputView: {
        marginTop: 30,
        paddingLeft:5
    },
    container: {
        paddingTop: 15,
        paddingRight: 15,
        backgroundColor: 'white',
        flex: 1,
    },
    button: {
        borderRadius: 45,
        marginTop: 20,
        backgroundColor: '#575757',
        marginLeft:5
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: (Platform.OS === 'ios') ? 40 : 10,
        marginLeft: 10,
        zIndex:0
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
    inputCodeView: {
        paddingLeft: 20,
        paddingRight: 20,
        zIndex: 2,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        opacity: 1
    },
    formInput: {
        marginBottom: (Platform.OS === 'ios') ? 10 : 0
    },
    footer: {
        marginTop: 20,
        marginLeft:15,
        marginBottom: deviceHeight - 100
    },
    googleButton: {
        borderRadius: 60,
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