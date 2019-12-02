import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { listTrips } from './graphql/queries';
import { Connect } from "aws-amplify-react-native";
import API, { graphqlOperation } from '@aws-amplify/api';
import config from './aws-exports'


import { Card } from '../components';

const { width } = Dimensions.get('screen');
API.configure(config)             // Configure Amplify

class MyTrips extends React.Component {
    render() {
        const ListView = ({ trips }) => {
            return <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}>
                <Block flex>
                    {trips.map(trip =>
                        <TouchableOpacity key={trip.id} onPress={() => this.props.navigation.navigate("TripDetails", {id:trip.id}
                        )}>
                            <View>
                                <Card key={trip.id} title={trip.tripdestination} image={trip.thumpbnails[0]}></Card>
                            </View>
                        </TouchableOpacity>
                    )}
                </Block>
            </ScrollView>;
        };
        return <Connect query={graphqlOperation(listTrips)}>
            {({data: {listTrips}, loading, errors}) => {
                if (loading || !listTrips) return (<Text>Loading...</Text>);
                return (<ListView trips={listTrips.items}/>);
            }}
        </Connect>
    }
}


const styles = StyleSheet.create({
    home: {
        width: width,
    },
    articles: {
        width: '90%',
        marginHorizontal: 20,
        paddingVertical: theme.SIZES.BASE,
        justifyContent: 'center'
    },
});

export default MyTrips;
