import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda,LocaleConfig } from 'react-native-calendars';
import { connect } from 'react-redux';
import accountApi from '../../api/accountApi';

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
})

class Calendar extends Component {
    state = {
        items: {}
    }   
    componentWillMount(){
        LocaleConfig.locales['vn'] = {
            monthNames: ['Tháng một', 'Tháng hai', 'Tháng ba', 'Tháng tư', 'Tháng năm', 'Tháng sáu', 'Tháng bảy', 'Tháng tám', 'Tháng chín', 'Tháng mười', 'Tháng mười một', 'Tháng mười hai'],
            monthNamesShort: ['thg 1','thg 2', 'thg 3', 'thg 4', 'thg 5', 'thg 6', 'thg 7', 'thg 8', 'thg 9', 'thg 10', 'thg 11', 'thg 12'],
            dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
            dayNamesShort: ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7']
          };
          
        LocaleConfig.defaultLocale = 'vn';
    }
    render() {
        var date = new Date();
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={date}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={() => {return (<View />);}}
                rowHasChanged={this.rowHasChanged.bind(this)}
                //onDayChange={(day) => { console.log('day changed', day) }}
            />
        );
    }

    loadItems(day) {
            var curDate = new Date();         
            var month = (day.year - curDate.getFullYear())*12 + (day.month - curDate.getMonth() - 1)
            accountApi.getEventMonth(month, this.props.accessToken).then((res) => {
                const newItems = res.DsNgay;
                Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
                this.setState({
                    items: newItems
                });
            })        
    }

    renderItem(item) {
        //var date = new Date(item.NgayGio);
        return (
            <View style={[styles.item]}>
                <Text>{item.TieuDe}</Text>
            </View>
        );
    }
    rowHasChanged(r1, r2) {
        return r1.TieuDe !== r2.TieuDe;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.auth.accessToken,                       
    };
}

export default connect(mapStateToProps)(Calendar);