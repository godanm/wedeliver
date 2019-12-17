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
import firebase from '../Firebase';
import { StackActions, NavigationActions, DrawerActions } from 'react-navigation';



class Logout extends React.Component {

    componentDidMount() {
        try {
            AsyncStorage.removeItem('uid').then(() => {
                firebase.auth().signOut().then(() => {
                    //this.props.navigation.push('Login');
                    this.props.navigation.dispatch(StackActions.popToTop());
                });
            });
        }
        catch(err) {
            Alert.alert(err);
            console.log(err);
        }
    }

    render() {
        return (
            null
        )
    }
}

export default Logout;
