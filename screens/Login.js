import React from "react";
import {
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert,
    AsyncStorage,
    View
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";
import firebase from "../Firebase";
import { StackActions, NavigationActions } from 'react-navigation';


const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

import Home from "../screens/Home";

class Login extends React.Component {

    constructor(props) {
        super(props);
        const { navigation:navigate } = this.props;
        this._onPressButton = this._onPressButton.bind(this);
        this.state = {
            isAuthenticated: false,
        };
    }

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    }

    async getToken() {
        try {
            return  await AsyncStorage.getItem("uid");
        } catch (error) {
            console.log("went wrong", error);
        }
    }
        // Sign in users with Auth
      _onPressButton() {
        const { email, password } = this.state
          if (!email) {
            Alert.alert("Please enter the email!");
            return;
          }
          if (!password) {
              Alert.alert("Please enter the password!");
              return;
          }
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((firebaseUser) => {
                    // Success
                    const displayName = firebaseUser.user.displayName ? firebaseUser.user.displayName : email;
                    AsyncStorage.setItem("uid", firebaseUser.user.uid);
                    AsyncStorage.setItem("name", displayName);
                    global.uid = firebaseUser.user.uid;
                  global.email = firebaseUser.user.email;
                  this.props.navigation.push("Home");
                })
                .catch(function(error) {
                    Alert.alert('Error Error when signing in: ', error.message)
                    console.log(error)
                });
        }
        catch (err){
            Alert.alert('Error when signing in: ', err.message)
        }

    }
     async componentDidMount() {
         await firebase.auth().onAuthStateChanged(user => {
           global.uid = user ? user.uid : null;
           global.email = user ? user.email :null;
           this.props.navigation.navigate(user ? 'Home' : 'Login')
         })
     }

    render() {
        return (
      <View flex style={styles.container}>
        <Block flex center>
          <ImageBackground
            source={Images.Onboarding}
            style={{ height:300, width:300, zIndex: 1, marginTop:50 }}
          />
        </Block>
        <Block flex space="around" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="white" size={40}>
                    Spice Hub!
                  </Text>
                </Block>
                <Block style={styles.subTitle}>
                  <Text color="white" size={24}>For all your grocery needs.
                  </Text>
                </Block>
                    <Input
                        right
                        ref="username"
                        autoFocus={true}
                        isreq
                        placeholder="Email"
                        autoCapitalize = 'none'
                        onChangeText={value => this.onChangeText('email', value)}
                    />
                    <Input
                        right
                        ref="password"
                        placeholder="Password"
                        onSubmitEditing={this._onPressButton}
                        onChangeText={value => this.onChangeText('password', value)}
                        password viewPass/>
                    <Text/>
                    <Button color="primary" size="small"
                            style={styles.button}
                            onPress={() => this._onPressButton()}

                    >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Sign In
                        </Text>
                    </Button>
                </Block>
                {/*<Block center>
                    <Button color="error" size="small"
                            onPress={() => this.props.navigation.push("Signup")}
                    >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Sign Up
                        </Text>
                    </Button>
                </Block>*/}
          </Block>
        </Block>
      </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.BLACK,
        flex: 1,
        justifyContent: 'center',
        position: "relative",
        flexDirection:'column'
    },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2
  },
  button: {
    width: 200,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2
  },
  title: {
    marginTop:1,
    alignItems: 'center'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Login;
