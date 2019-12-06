import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { Block, Text, theme } from "galio-framework";

import firebase from '../Firebase';
import {argonTheme} from "../constants";

let itemsRef = firebase.database().ref('groups/-1LvHs2Rw3_WK1sM127i8');

export default class List extends Component {
    state = {
        items: []
    };

    componentDidMount() {
        itemsRef.on('value', snapshot => {
            let data = snapshot.val();
            let items = Object.values(data);
            console.log(items)
            this.setState({ items });
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
                    </ScrollView>
                        </Block>
                    </Block>
                ) : (
                    <Text>No items</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.COLORS.RED
    }
});