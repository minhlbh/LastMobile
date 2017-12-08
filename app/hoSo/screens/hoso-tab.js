import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListProfiles } from '../../components';
import { connect } from 'react-redux';
import { getProfileDetail} from '../../profiles/profile.action';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

class HoSoTab extends Component {
    state = {}
    render() {
        const {navigation, profilesList,getProfileDetail} = this.props;

        return (
            <View style={styles.container}>
                <ListProfiles
                    profilesList={profilesList.slice(0, 5)}
                    onPress={(item) => {
                        getProfileDetail(item.Id)
                        navigation.navigate('ProfileDetail')
                    }}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        profilesList: state.user.profiles,
    };
}

export default connect(mapStateToProps, {getProfileDetail})(HoSoTab);