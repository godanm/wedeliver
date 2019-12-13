import React from "react";
import {
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert, AsyncStorage, ActivityIndicator
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";
// AWS Amplify modular import
import firebase from 'firebase';
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
        tododata: [],
        loaded:false
    };

    componentDidMount() {
        this.fetchData();
    }

    async getToken() {
        try {
            return  AsyncStorage.getItem("letsdoit");
        } catch (error) {
            console.log("went wrong1", error);
        }
    }
    fetchData = async () => {
        //const userKey = 'KDxW8MncixYVbXDrklvt2iyBxmN2';
        const userKey = await this.getToken();
        let todolist  = [];
        let todoref = firebase.database().ref()
        todoref.child('todos').orderByChild('ownerid').equalTo(userKey).once('value', snapshot => {
            console.log("snapshot", snapshot)
            snapshot.forEach(function(child) {
                var temp = {
                    currentitem: child.val(),
                    id: child.key
                };
                todolist.push(temp)
            });
            this.setState({ tododata: todolist});
            this.setState({ loaded: true });
        });

    };
    toggleSwitch(todo){
        let todoref = firebase.database().ref();
        todoref.child('todos/'+todo.id).set({
            name: todo.currentitem.name,
            owner: todo.currentitem.owner,
            ownerid: todo.currentitem.ownerid,
            duedate: todo.currentitem.duedate,
            status: !todo.currentitem.status,
        })
        this.fetchData();
    }
    render() {
        const { navigation, image, title, cta , horizontal, full, style, ctaColor, imageStyle } = this.props;
        const imageStyles = [
            full ? styles.fullImage : styles.horizontalImage,
            imageStyle
        ];
        const cardContainer = [styles.card, styles.shadow, style];
        const imgContainer = [styles.imageContainer,
            horizontal ? styles.horizontalStyles : styles.verticalStyles,
            styles.shadow
        ];
        return (
            <Block flex style={styles.container}>
                {this.state.loaded &&
                this.state.tododata.map((item, index) =>
                        <Card title={item.currentitem.name} color={argonTheme.COLORS.ACTIVE} key={index}>
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
                )}
                {!this.state.loaded &&
                <ActivityIndicator size="large" color="#0000ff"/>
                }
                    </Block>

        );
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
