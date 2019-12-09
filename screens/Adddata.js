import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, ActivityIndicator, SectionList} from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import ItemComponent from '../components/ItemComponent';

import argonTheme from "../constants/Theme";
import firebase from "../Firebase";

const { width } = Dimensions.get('screen');

const DATA = [
    {
        title: 'Members',
        data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
        title: 'Trips',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
];

class Adddata extends React.Component {
    state = {
        items: [],
        listmembers:[]
    };
    componentDidMount() {
        //const groupId = JSON.stringify(navigation.getParam('id', 'NO-ID'))
        const groupId = '-1LvHs2Rw3_WK1sM127i8';
        let itemsRef = firebase.database().ref('groups').orderByKey().equalTo(groupId);
        var list = [];
        itemsRef.once('value', snapshot => {
            let data = snapshot.val();
            let keys = Object.keys(data);
            keys.forEach((key) => {
                var temp = {
                    currentitem: data[key],
                    id: key
                };
                list.push(temp)
            });
            this.setState({items: list});
        });
       const rootref = firebase.database().ref();
       const groupmembersref = rootref.child('groupmembers');
       const memberref = rootref.child('members');
       groupmembersref.child(groupId).once('value', snap => {
            console.log(snap.val());
        });
    }



    render() {
        return (
            <View style={styles.container}>
                {this.state.items.length > 0 ? (
                    <Block flex space="between" style={styles.padded}>
                        <Block flex space="around" style={{ zIndex: 2 }}>
                            <ScrollView>
                                <ItemComponent items={this.state.items} />
                                <SectionList
                                    sections={DATA}
                                    keyExtractor={(item, index) => item + index}
                                    renderItem={({ item }) => <Item style={styles.SectionListItemStyle}
                                                                    title={item} />}
                                    renderSectionHeader={({ section: { title } }) => (
                                        <Text style={styles.SectionHeaderStyle} bold size={24} color="#32325D">
                                            {title}</Text>
                                    )}
                                />
                            </ScrollView>
                        </Block>
                    </Block>
                ) : (
                    <ActivityIndicator size="large" color="#0000ff" />
                )}
            </View>
        );
    }
}

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text bold size={14} color="#32325D">
                {title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        width: width,
    },
    articles: {
        width: '90%',
        marginHorizontal: 20,
        paddingVertical: theme.SIZES.BASE,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    item: {
        padding: 8,
        marginVertical: 8,
    },
    header: {
        fontSize: 18,
    },
    title: {
        fontSize: 12,
        backgroundColor: '#5E72E4',
    },
    SectionHeaderStyle: {
        backgroundColor: '#5E72E4',
        fontSize: 20,
        padding: 5,
        color: '#fff',
    },
    SectionListItemStyle: {
        fontSize: 15,
        padding: 15,
        color: '#000',
        backgroundColor: '#F5F5F5',
    },
});

export default Adddata;
