import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    formInputStyle: {
        color: 'black',
        width: 200,
        paddingTop: 0,
        paddingBottom: 0,
        height: 200,
        paddingRight: 20
    },
    formInputContainer: {
        width: 200,
        height: 20
    },
    pickerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        height: 40,
        borderBottomColor: '#BFBFBF'
    },
    pickerTextItem: {
        flex: 3,
        marginLeft: 20,
        color: '#43484D'
    },
    firstItem: {
        borderTopColor: '#BFBFBF',
        borderTopWidth: 1
    },
    dividerView: {
        height: 60,
        justifyContent: 'flex-end',
        paddingLeft: 20
    },
    dividerText: {
        fontWeight: '600',
        fontSize: 11
    },
})