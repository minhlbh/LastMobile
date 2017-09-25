import { StyleSheet, Platform } from 'react-native';
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
        marginTop: 60
    },
    labelText: {
        marginLeft: 20,
        fontSize: 20,
        color: 'black',
        marginBottom: 20
    },
    button: {
        borderRadius: 20,
        marginTop: 30,
        backgroundColor: '#575757'
    },
    socialIconView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 30
    },
    formInput:{
        marginBottom:(Platform.OS === 'ios')?10:0
    }
})