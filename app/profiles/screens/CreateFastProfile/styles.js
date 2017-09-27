import { StyleSheet } from 'react-native';
export default StyleSheet.create({
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
        paddingLeft: 10,
        fontSize: 18,
    },
    buttonText2: {
        color: '#686868',
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 18,
    },
    container: {
        justifyContent: 'center',
        paddingTop: 30,
        backgroundColor: 'white',
        flex: 1
    },
    avatar: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom:10
    },
    form :{
        borderWidth: 1, 
        marginLeft: 10, 
        marginRight: 10,
    },
    buttonContainer: { 
        flexDirection: 'row', 
        alignSelf: 'center', 
        paddingTop: 20, 
        marginBottom: 20 
    }
})