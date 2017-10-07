import { StyleSheet, Platform } from 'react-native'
import {colors} from '../../config/styles'

export default StyleSheet.create({
    divider: {
        marginTop: 10,
        marginBottom:15,
        height:0.5,
        marginRight:10
    },
    textDividerTitle: {
        marginTop: 20,
        color: colors.dark,
        fontWeight: 'bold',
    },
    textdivider:{
        color:'#546CA8',
        marginTop: 15,
    },
    listContainer: {
        marginBottom: 20,
        paddingRight:10
    },
    container:{
        flex: 1, 
        paddingLeft: 10, 
        backgroundColor: 'white',
        paddingTop: (Platform.OS === 'ios')? 20:0
    },
    headerListContainer:{
        flex: 1, 
        flexDirection: 'row'
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
    viewDoctorInfo: {
        zIndex: 2,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        opacity: 1
    }
})