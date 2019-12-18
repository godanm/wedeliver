import React from "react";
import {
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert, AsyncStorage, ActivityIndicator,
    View
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";
// AWS Amplify modular import
import firebase from '../Firebase';
import { Card, ListItem } from 'react-native-elements'


const { height, width } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import {articles} from "../constants";

class MyTodo extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSwitch = this.toggleSwitch.bind(this);

    }

    state = {
        tododata: null,
        loaded: false
    };

    componentDidMount() {
        this.fetchData();
    }

    async getToken() {
        try {
            return AsyncStorage.getItem("uid");
        } catch (error) {
            console.log("went wrong1", error);
        }
    }

    fetchData = async () => {
        const userKey = await this.getToken();
        //const userKey = "Hw3rqkxmPZcoNdlop8kf6sacMfI3";
        let todolist = [];
        let todoref = firebase.database().ref()
        todoref.child('todos').orderByChild('ownerid').equalTo(userKey).once('value', snapshot => {
            snapshot.forEach(function (child) {
                var temp = {
                    currentitem: child.val(),
                    id: child.key
                };
                todolist.push(temp)
            });
            this.setState({tododata: todolist});
            this.setState({loaded: true});
        });

    };

    toggleSwitch(todo) {
        let todoref = firebase.database().ref();
        todoref.child('todos/' + todo.id).set({
            name: todo.currentitem.name,
            owner: todo.currentitem.owner,
            ownerid: todo.currentitem.ownerid,
            duedate: todo.currentitem.duedate,
            status: !todo.currentitem.status,
        })
        this.fetchData();
    }

    render() {
        const {navigation, image, title, cta, horizontal, full, style, ctaColor, imageStyle} = this.props;
        const imageStyles = [
            full ? styles.fullImage : styles.horizontalImage,
            imageStyle
        ];
        const cardContainer = [styles.card, styles.shadow, style];
        const imgContainer = [styles.imageContainer,
            horizontal ? styles.horizontalStyles : styles.verticalStyles,
            styles.shadow
        ];
        console.log(this.state)
        let context = null;
        if (this.state.tododata === null) {
            context = <ActivityIndicator size="large" color="#0000ff"/>

        } else if (this.state.tododata.length > 0) {
            this.state.tododata.map((item, index) =>
                context = <Card title={item.currentitem.name} color={argonTheme.COLORS.ACTIVE} key={index}>
                    <Switch
                        style={styles.switch}
                        value={item.currentitem.status}
                        onValueChange={() => this.toggleSwitch(item)}
                    >
                    </Switch>
                    <Text style={{marginBottom: 10}}>
                        Status:{item.currentitem.status}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        Due date:{item.currentitem.duedate}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        Owner {item.currentitem.owner}
                    </Text>
                </Card>
            )
        } else  {
            context = <Block style={styles.title1}>
                <Text color={argonTheme.COLORS.ERROR} bold p style={{textAlignVertical: "center",textAlign: "center",}}>No task assigned to you!</Text>
            </Block>
        }
        return (
            <View style={styles.container}>
                <Block flex style={styles.container}>
                    {context}
                </Block>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 65,
        marginHorizontal: 16
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
    switch: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    title: {
        marginTop:'-100%'
    },
    subTitle: {
        marginTop: 20
    },
    hiddenContainer: {
        bottom:-6000
    },
    card: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        marginBottom: 16
    }
});

export default MyTodo;
