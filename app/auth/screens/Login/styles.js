import { StyleSheet } from 'react-native';
import { colors } from '../../../config/styles';

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        height: 150,
        width: 150,
    },
    formContainer:{
        flex: 2,
        paddingLeft: 20,
        paddingRight: 20,
    },
    btnGroupCointainer:{
        flexDirection: 'row',
        marginTop: 15
    },
    btnContainer:{
        flex:1
    }
})