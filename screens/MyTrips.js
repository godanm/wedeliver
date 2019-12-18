import React from 'react';
import {
    StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, ActivityIndicator, TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import ItemComponent from '../components/ItemComponent';


import GroupDetails from './GroupDetails'

import { Card, Button } from '../components';
import argonTheme from "../constants/Theme";
import firebase from "../Firebase";
let itemsRef = firebase.database().ref('trips');

const { width } = Dimensions.get('screen');

class MyTrips extends React.Component {
    state = {
        items: null,
        norecordsfound:true
    };
    async getToken() {
        try {
            return  AsyncStorage.getItem("uid");
        } catch (error) {
            console.log("went wrong1", error);
        }
    }
    fetchData = async () => {
        const userKey = await this.getToken();
        var list = [];
        itemsRef.on("child_added", snap => {
            firebase.database().ref("trips/"+snap.key+"/members/"+userKey).once('value', snapshot => {
                if (snapshot.val() !== null) {
                    var temp = {
                        currentitem: snap.val(),
                        id: snap.key
                    };
                    list.push(temp);
                }
                this.setState({items: list});
            });
        });


    };
    componentDidMount() {
        this.fetchData();
    }
    render() {
        let context = null;
        if (this.state.items === null) {
            context =  <ActivityIndicator size="large" color="#0000ff" />

        } else if (this.state.items.length > 0) {
            context = <Block flex space="between" style={styles.padded}>
                <Block flex space="around" style={{ zIndex: 2 }}>
                    <ScrollView>
                        <ItemComponent items={this.state.items} cta="TripDetails"/>
                    </ScrollView>
                </Block>
            </Block>
        } else  {
            context = <Block style={styles.title1}>
                <Text color={argonTheme.COLORS.ERROR} bold p style={{textAlignVertical: "center",textAlign: "center",}}>No groups available!</Text>
            </Block>
        }
        return (
            <View style={styles.container}>
                {context}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        width: width,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        position: "relative",
        borderRadius: 4,
    },
    title: {
        width: '90%',
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'center',
        borderWidth: 10,
        borderColor: "#E9ECEF",
        borderRadius: 4
    }
});

export default MyTrips;
