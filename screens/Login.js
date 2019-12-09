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
// AWS Amplify modular import
import firebase from 'firebase';

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
    async storeToken(user) {
        try {
            await AsyncStorage.setItem("letsdoit", JSON.stringify(user));
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    async getToken() {
        try {
            let userData = await AsyncStorage.getItem("letsdoit");
            let data = JSON.parse(userData);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
        // Sign in users with Auth
    async _onPressButton() {
        const { email, password } = this.state
        /* await Auth.signIn(username, password)
            .then(user => {
                this.setState({ user })
                this.storeToken(user);
                this.props.navigation.navigate("Home")
            })
            .catch(err => {
                if (! err.message) {
                    console.log('Error when signing in: ', err)
                    Alert.alert('Error when signing in: ', err)
                } else {
                    if (err.code === 'UserNotConfirmedException') {
                        Alert.alert('Account not verified yet')
                    } else if (err.code === 'PasswordResetRequiredException') {
                        Alert.alert('Existing user found. Please reset your password')
                    } else if (err.code === 'NotAuthorizedException') {
                        Alert.alert('Forgot Password?')
                    } else if (err.code === 'UserNotFoundException') {
                        Alert.alert('User does not exist!')
                    } else {
                        console.log('Error when signing in: ', err.message)
                        Alert.alert('Error when signing in: ', err.message)
                    }
                }
            }) */
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => this.props.navigation.navigate('Home'))
                .catch(error => Alert.alert('Error when signing in: ', error.message))
        }
        catch (err){
            Alert.alert('Error when signing in: ', err)
        }

    }
    componentWillUnmount() {
        if (!this.getToken()) {
            this.props.navigation.navigate('Home')
        }
    }

    render() {
        return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="white" size={70}>
                    Let's do It!
                  </Text>
                </Block>
                <Block style={styles.subTitle}>
                  <Text color="white" size={24}>Your activities starts here.
                  </Text>
                </Block>
              </Block>
                <Block>
                    <Input
                        right
                        ref="username"
                        autoFocus={true}
                        placeholder="Email"
                        autoCapitalize = 'none'
                        onChangeText={value => this.onChangeText('email', value)}
                        iconContent={
                            <Icon
                                size={11}
                                color={argonTheme.COLORS.ICON}
                                name="search-zoom-in"
                                family="ArgonExtra"
                            />
                        }
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
              <Block center>
                  <Button color="error" size="small"
                          onPress={() => this.props.navigation.navigate("Signup")}
                  >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Sign Up
                      </Text>

                  </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
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
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-100%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Login;
