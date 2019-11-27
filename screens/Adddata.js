import React from 'react';
import {ScrollView, View, Image, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import API, { graphqlOperation } from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import { Ionicons } from '@expo/vector-icons';
import config from './aws-exports'
import { createActivity } from './graphql/mutations'
import { Button, Select, Icon, Input, Header, Switch } from "../components";
import { Block, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";


API.configure(config)             // Configure Amplify
class Adddata extends React.Component {
    constructor(props) {
        super(props);
    }

    async submit() {
        const {onCreate} = this.props;
        var Todo = {
            description: "Book for the return flight tickets for the trip",
            duedate: "2020-01-15",
            id: "bc3d169f-4d53-47f6-9b13-7089ae884ff9",
            startdate: "2019-06-04",
            status: true,
            title: "Book tickets",
        }
        var CreateInput = {
            tripid: "6fe4644a-d6d9-4a0a-a9ce-085bd4b6d60a",
            activityname: "Hiking the half-dome",
            description: "Taking the 8 mile half-dome hike at Yosemite",
            title: "Half-dome hike",
            location: "Curry village",
            cost: 80.0,
            status: true,
            todos: [Todo],
        }
        console.log(CreateInput);
        await API.graphql(graphqlOperation(createActivity, {input: CreateInput}))
    }

    render() {
        return (
            <Block flex style={styles.container}>
                <Block ref="confirmblock">
                    <Block ref="confirmblock">

            <Button
                    onPress={() => this.submit()}

            >
                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                    Add Data
                </Text>
            </Button>
            </Block>
                </Block>

            </Block>

        )

    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.BLACK,
        top:100
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
    },
    hiddenContainer: {
        bottom:-6000
    }
});
export default Adddata
