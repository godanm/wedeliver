import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import {getTrip} from './graphql/queries';
import { Connect } from "aws-amplify-react-native";
import API, { graphqlOperation } from '@aws-amplify/api';
import config from './aws-exports'
import { Tile } from 'react-native-elements';



import { Card } from '../components';

const { width } = Dimensions.get('screen');
API.configure(config)             // Configure Amplify

class TripDetails extends React.Component {
    state = {
        tripId: '',
    }
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        const tripId = JSON.stringify(navigation.getParam('id', 'NO-ID'))
        console.log("tripId", tripId)
        this.state.tripId = tripId;
    }
    render() {
        const ListView = ({ trip }) => {
            return <View style={styles.MainContainer}>
                <View style={styles.Innerview}>
                    <ScrollView>
                <Block flex>
                    <Tile key={trip.id}
                          title={trip.tripdestination}
                          imageSrc={{uri: trip.thumpbnails[0]}}

                    >
                        <Text>{trip.tripstart}</Text>
                        <Text>{trip.tripend}</Text>

                    </Tile>
                </Block>
            </ScrollView></View></View>;

        };
        return (
            <Connect query={graphqlOperation(getTrip, {id: "45dab503-4e1c-4251-a721-1584d07c9968"})}>
                {({ data: { getTrip }, loading, error }) => {
                    if (error) return (<h3>Error</h3>);
                    if (loading || !getTrip) return (<Text>Loading...</Text>);
                    return (<ListView trip={getTrip} /> );
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
export default TripDetails;
