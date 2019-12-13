import React from "react";
import {
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";
// AWS Amplify modular import
import firebase from "../Firebase";

const { height, width } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        email: '',
        phone_number: '',
        authCode: '',
        name:'',
        given_name:'',
        authcode:'',
    }
    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    }
    async signUp()  {
        const {password, email, phone_number, name, given_name} = this.state;
        console.log(firebase.auth())
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(function (firebaseUser) {
                    // Success
                    let membersref = firebase.database().ref('members');
                    firebase.database().ref('members/' + firebaseUser.user.uid).set({
                        email: email,
                        fname: name,
                        lname: given_name,
                        name: name + ' ' + given_name,
                        status: true,
                    })
                })
                .catch(error => Alert.alert('Error when signing up: ', error.message))
            //this.props.navigation.navigate('Login')
        }
        catch (err) {
            console.log(err)
        }

    }
    componentDidMount() {
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
                        <Block ref="signupblock">
                            <Input
                                right
                                ref="email"
                                placeholder="Email"
                                autoCapitalize = 'none'
                                onChangeText={value => this.onChangeText('email', value)}
                            />
                            <Input
                                right
                                ref="password"
                                placeholder="Password"
                                onChangeText={value => this.onChangeText('password', value)}
                                password viewPass/>
                            <Input
                                right
                                ref="firstname"
                                placeholder="First Name"
                                autoCapitalize = 'words'
                                onChangeText={value => this.onChangeText('firstname', value)}
                            />
                            <Input
                                right
                                ref="given_name"
                                placeholder="Last Name"
                                autoCapitalize = 'words'
                                onChangeText={value => this.onChangeText('given_name', value)}
                            />
                            <Input
                                right
                                ref="phoneNumber"
                                placeholder="Phone Number"
                                onSubmitEditing={this._onPressButton}
                                onChangeText={value => this.onChangeText('phoneNumber', value)}
                            />
                            <Text/>
                            <Button color="primary" size="small"
                                    style={styles.button}
                                    onPress={() => this.signUp()}

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
        marginTop: '-100%'
    },
    title: {
        marginTop:'-100%'
    },
    subTitle: {
        marginTop: 20
    },
    hiddenContainer: {
        bottom:-6000
    }
});

export default Signup;
