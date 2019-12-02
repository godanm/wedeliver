import React from 'react';
import {ScrollView, View, Image, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import API, { graphqlOperation } from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import { Ionicons } from '@expo/vector-icons';
import config from './aws-exports'
import { createActivity, createGroup, createTrip, createToDo } from './graphql/mutations'
import { Button, Select, Icon, Input, Header, Switch } from "../components";
import { Block, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";


API.configure(config)             // Configure Amplify
class Adddata extends React.Component {
    constructor(props) {
        super(props);
    }

    async submit() {

        /* Add Group */
        /* try {
            const {onCreate} = this.props;
            var CreateInput = {
                groupname: "Yo.Yo. Yowwanam",
                image:"https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            }
            console.log(CreateInput);
            await API.graphql(graphqlOperation(createGroup, {input: CreateInput}))
        } catch (err) {
            console.log(err)
        } */

        /* Add Trip */
        /* try {
            const {onCreate} = this.props;
            var CreateInput = {
                tripdestination: "Yosemite national park",
                tripstart:"2020-06-04",
                tripend:"2020-06-08",
                thumpbnails:"https://images.unsplash.com/photo-1518623380242-d992d3c57b37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                status:true,
                remarks:"24 member trip to Yosemite",
                tripGroupidId:"7d341ccd-f1c4-404f-9c31-c41a83ba1652",
            }
            console.log(CreateInput);
            await API.graphql(graphqlOperation(createTrip, {input: CreateInput}))
        } catch (err) {
            console.log(err)
        } */

        /* Add Activity */
        /* try {
            const {onCreate} = this.props;
            var CreateInput = {
                activityname: "Half-dome hike",
                description:"14 mile hike to Yosemite half-dome",
                title:"Half-dome hike",
                location:"Happy Isle Loop Road, Yosemite National Park, CA 95389",
                cost:80.0,
                status:true,
                activityTripidId:"45dab503-4e1c-4251-a721-1584d07c9968",
            }
            console.log(CreateInput);
            await API.graphql(graphqlOperation(createActivity, {input: CreateInput}))
        } catch (err) {
            console.log(err)
        } */

        /* Add To Do */
        try {
            const {onCreate} = this.props;
            var CreateInput = {
                title: "Book flight tickets",
                description:"Make group reservation for 24 people",
                duedate:"2019-12-31",
                startdate:"2019-11-01",
                status:true,
                toDoActivityId:"f1482f2e-acd8-4a8b-ba1d-24ffc6d470af",
            }
            console.log(CreateInput);
            await API.graphql(graphqlOperation(createToDo, {input: CreateInput}))
        } catch (err) {
            console.log(err)
        }


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
