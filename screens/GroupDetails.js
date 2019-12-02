import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import {getGroup} from './graphql/queries';
import { Connect } from "aws-amplify-react-native";
import API, { graphqlOperation } from '@aws-amplify/api';
import config from './aws-exports'
import { Tile } from 'react-native-elements';



import { Card } from '../components';

const { width } = Dimensions.get('screen');
API.configure(config)             // Configure Amplify

class GroupDetails extends React.Component {
    state = {
        groupid: '',
    }
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        const groupId = JSON.stringify(navigation.getParam('id', 'NO-ID'))
        const input = {
            id: `${groupId}`
        }
        console.log("groupId", groupId)
        this.state.groupid = groupId;
    }
    render() {
        const ListView = ({ group }) => {
            return <View style={styles.MainContainer}>
                <View style={styles.Innerview}>
                <ScrollView>
                <Block flex>
                        <Tile key={group.id}
                              imageSrc={{uri: group.image}}
                              title={group.groupname}
                        >
                            <Text>{group.title}</Text>
                        </Tile>
                </Block>
            </ScrollView></View></View>;

        };
        return (
            <Connect query={graphqlOperation(getGroup, {id: "7d341ccd-f1c4-404f-9c31-c41a83ba1652"})}>
                {({ data: { getGroup }, loading, error }) => {
                    if (error) return (<h3>Error</h3>);
                    if (loading || !getGroup) return (<Text>Loading...</Text>);
                    return (<ListView group={getGroup} /> );
                }}
            </Connect>
        )
    }

}


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        marginTop: 20,
        alignItems:"center"
    },
    Innerview :{
        width: "90%"
    }
});
export default GroupDetails;
