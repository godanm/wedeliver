import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { Block, Text, theme } from "galio-framework";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import firebase from '../Firebase';
import {argonTheme} from "../constants";

let itemsRef = firebase.database().ref('groups/-1LvHs2Rw3_WK1sM127i8');

class Adddata extends Component {
    state = {
        items: []
    };

    componentDidMount() {
        var list = [];
        itemsRef.once('value', snapshot => {
            let data = snapshot.val();
            //let items = Object.values(data);
            //let items = data.splice(1,1);

            var item = snapshot.val();
            item.key = snapshot.key;
            list.push(item);

            this.setState({items: list });


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
                    <Text>No asw</Text>
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


export default Adddata
