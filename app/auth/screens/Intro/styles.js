import { StyleSheet, Platform,Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    textFirstPage:{
        color:'#10A5BD',
        fontSize: 20,
    },
    button: {
        borderRadius: 25,
        marginTop: 30,
        backgroundColor: '#00779A',
        width: 120,
        height: 40  
    },
    buttonView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: deviceHeight - deviceHeight/4,
        zIndex: 2
    },
    container:{
        marginTop:(Platform.OS === 'ios')? 20:0
    },
})