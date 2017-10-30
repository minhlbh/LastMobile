import { StyleSheet } from 'react-native';
import { colors } from '../../../config/styles';

export default StyleSheet.create({
    container:{
        flex: 1, 
        paddingLeft: 10,
        paddingRight: 10, 
        backgroundColor: 'white',
    },
    headerTitle:{
        color: 'black',
        fontSize: 15, 
        fontWeight: 'bold' 
    },
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
      },
      footerText: {
        fontSize: 14,
        color: '#aaa',
      },
})