import { StyleSheet, Platform } from 'react-native'
import {colors} from '../../config/styles'

export default StyleSheet.create({
    divider: {
        marginTop: 10,
        marginBottom: 40,
    },
    textDividerTitle: {
        marginTop: 15,
        color: colors.dark,
        fontWeight: 'bold',
    },
    textdivider:{
        color:'#546CA8',
        marginTop: 15,
    },
    listContainer: {
        marginBottom: 20 
    },
    container:{
        flex: 1, 
        paddingLeft: 10, 
        paddingRight: 10, 
        backgroundColor: 'white',
        paddingTop: (Platform.OS === 'ios')? 20:0
    },
    headerListContainer:{
        flex: 1, 
        flexDirection: 'row'
    }
})