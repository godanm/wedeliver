import React from "react";
import {
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert,
    AsyncStorage
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";
import firebase from 'firebase';

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

import Home from "../screens/Home";

class Logout extends React.Component {

    removeItem() {
        try {
           AsyncStorage.removeItem("letsdoit");
        } catch (error) {
            console.log("went wrong", error);
        }
    }
    componentDidMount() {
        this.removeItem();
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            null
        )
    }
}

export default Logout;
