import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' ,
    },
    contentContainer: { 
        alignItems: 'center', 
        paddingTop: 20, 
        paddingLeft: 30, 
        paddingRight: 30 
    },
    doctorName: { 
        marginTop: 20, 
        fontSize: 20, 
        color: 'black', 
        fontWeight: '400' 
    },
    footerButtonContainer: {
        flexDirection: 'row',
        flex: 1,
        borderWidth: 1,
        // borderRadius: 2,
        borderColor: '#f2f2f2',
        borderBottomWidth: 0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 14,
        backgroundColor: '#F9F9F9'
    },
})                                              