import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { listGroups } from './graphql/queries';
import { Connect } from "aws-amplify-react-native";
import API, { graphqlOperation } from '@aws-amplify/api';
import config from './aws-exports'


import { Card, Button } from '../components';
import argonTheme from "../constants/Theme";

const { width } = Dimensions.get('screen');
API.configure(config)             // Configure Amplify

class Home extends React.Component {
    render() {
        const ListView = ({ groups }) => {
            return <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}>
                <Block flex>
                    {groups.map(group =>
                        <TouchableOpacity key={group.id} onPress={() => this.props.navigation.navigate("GroupDetails", {id:group.id}
                        )}>
                            <View>
                                <Card key={group.id} title={group.groupname} image={group.image}></Card>
                            </View>
                        </TouchableOpacity>
                    )}
                </Block>
            </ScrollView>;

        };
        return <Connect query={graphqlOperation(listGroups)}>
            {({data: {listGroups}, loading, errors}) => {
                if (loading || !listGroups) return (<Text>Loading...</Text>);
                return (<ListView groups={listGroups.items}/>);
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

export default Home;
