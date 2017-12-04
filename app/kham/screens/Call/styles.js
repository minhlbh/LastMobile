import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#0A4541',
        flex: 1
    },
    panelName: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    panelAvatar: {
        flex: 5,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    panelAction: {
        flexDirection: 'row',
        flex: 1.5,
        justifyContent: 'center'
    },
    text: { color: '#FFFFFF' }


})