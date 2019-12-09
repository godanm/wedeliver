import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import ItemComponent from '../components/ItemComponent';


import GroupDetails from './GroupDetails'

import { Card, Button } from '../components';
import argonTheme from "../constants/Theme";
import firebase from "../Firebase";
let itemsRef = firebase.database().ref('groups');

const { width } = Dimensions.get('screen');

class Home extends React.Component {
    state = {
        items: []
    };
    componentDidMount() {
        var list = [];
        itemsRef.once('value', snapshot => {
            let data = snapshot.val();
            let keys = Object.keys(data);
            keys.forEach((key) => {
                var temp = {
                    currentitem: data[key],
                    id : key
                };
                list.push(temp)
            });
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
                                    <ItemComponent items={this.state.items} cta="GroupDetails"/>
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
        justifyContent: 'center',
        backgroundColor: theme.COLORS.RED
    }
});

export default Home;
