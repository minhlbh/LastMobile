import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../config/styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    textDividerTitle: {
        color: colors.dark,
        fontSize:15
    },
    generalText: {
        color: 'black', fontWeight: 'bold'
    },
    textHeader:{
        color: colors.header.text,
        fontSize:25,
        fontWeight:'bold'
    },
    textInput:{
        height:150,
        borderTopWidth:0.5,
        borderColor: colors.gray
    },
    picker:{
        width:170,
    },
    divider:{
        backgroundColor: colors.gray
    },
    button:{
        backgroundColor:'white',
    }
})