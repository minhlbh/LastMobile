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
        textDecorationLine: 'underline',
        fontWeight: 'bold'

    },
    inputView: {
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
        marginLeft: 10,
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
        flex:1,
        justifyContent:'flex-end',
        paddingBottom:20,
        paddingLeft:15,
        paddingRight:15,
        height: deviceHeight/5
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
    },
    textFooter:{
        fontSize:12
    },
    panel1:{ 
        flex: 7,
        height: deviceHeight/4.2,
        flexDirection: 'row'
     }
})