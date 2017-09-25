import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../../config/styles';

export default StyleSheet.create({
    container:{
        flex: 1, 
        paddingLeft: 10,
        paddingRight: 10, 
        backgroundColor: 'white',
        marginTop: (Platform.OS === 'ios')? 20:0 
    }
})