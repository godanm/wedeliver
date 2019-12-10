import React, { Component } from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, ActivityIndicator, FlatList, SectionList, Image} from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import argonTheme from "../constants/Theme";
import firebase from "../Firebase";

const { width } = Dimensions.get('screen');
export default class App extends Component {
    constructor(props) {
        super(props);
        const { navigation:navigate } = this.props;
    }
    state = {
        tripdata: [],
        memberdata: [],
        loaded:false
    };

    componentWillMount() {
        this.fetchData();
    }

    renderHeader = (header) => {
        //View to set in Header
        return (
            <View style={styles.SectionHeaderStyle}>
                <Text style={styles.SectionHeaderStyle}>{header} </Text>
            </View>
        );
    };

    fetchData = async () => {
        const groupId = '-1LvHs2Rw3_WK1sM127i8';

        const response = await fetch("https://randomuser.me/api?results=10");
        //const response = await fetch("https://letsdoit-dcf60.firebaseio.com/groups//members.json?$key="+groupId);
        const json = await response.json();
        //this.setState({ data: json.results });

        let memberslist = [];
        let tripslist = [];
        let groupmembersref = firebase.database().ref('groups/'+groupId+"/members");
        let grouptripsref = firebase.database().ref('groups/'+groupId+"/trips");
        groupmembersref.on('child_added', snapshot => {
            let data = snapshot.val();
            let keys = Object.keys(data).toString();
            var temp = {
                data: snapshot.val()
            };
            memberslist.push(temp)
            this.setState({ memberdata: memberslist });
        });
        grouptripsref.on('child_added', snapshot => {
            let data = snapshot.val();
            let keys = Object.keys(data).toString();
            var temp = {
                data: snapshot.val()
            };
            tripslist.push(temp)
            this.setState({ tripdata: tripslist });
            this.setState({ loaded: true });
        });

    };

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
            <View style={styles.container}>
                <Block flex space="between" style={styles.padded}>
                    <View style={styles.itemsList}>
                        <Block flex space="around" style={{ zIndex: 2 }}>
                            <ScrollView>
                                <Block card flex style={cardContainer} >
                                    <Block flex style={imgContainer}>
                                    </Block>
                                    <Block flex space="between" style={styles.cardDescription}>
                                        <Text size={13} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>Group Name -</Text>
                                    </Block>
                                </Block>
                                {this.state.loaded ? (
                                    <View>
                                        <FlatList
                                            data={this.state.memberdata}
                                            ListHeaderComponent={() => this.renderHeader('Members')}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) =>
                                                <View style={{backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#CCCCCC'}}>
                                                <Text style={styles.SectionListItemStyle}>
                                                    {`${item.data}`}
                                                </Text>
                                                </View>}
                                        />
                                    </View>
                                ) : (
                                    <ActivityIndicator size="large" color="#0000ff" />
                                )}
                                <Text/>
                                <Text/>
                                {this.state.loaded ? (
                                    <View>
                                        <FlatList
                                            data={this.state.tripdata}
                                            ListHeaderComponent={() => this.renderHeader('Trips')}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) =>
                                                <View style={{backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#CCCCCC'}}>
                                                    <Text style={styles.SectionListItemStyle}>
                                                        {`${item.data}`}
                                                    </Text>
                                                </View>}
                                        />
                                    </View>
                                ) : (
                                    <ActivityIndicator size="large" color="#0000ff" />
                                )}
                            </ScrollView>
                        </Block>
                    </View>
                </Block>
            </View>
        );
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
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    item: {
        padding: 8,
        marginVertical: 8,
    },
    header: {
        fontSize: 18,
    },
    title: {
        fontSize: 12,
        backgroundColor: '#5E72E4',
    },
    SectionHeaderStyle: {
        backgroundColor: '#5E72E4',
        fontSize: 20,
        padding: 5,
        color: '#fff',
    },
    SectionListItemStyle: {
        fontSize: 13,
        padding: 10,
        color: '#000',
        fontWeight: 'bold',
    },
    itemsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '90%',
        marginHorizontal: 20,
        paddingVertical: theme.SIZES.BASE,
        justifyContent: 'center'
    },
    itemtext: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '90%',
        marginHorizontal: 20,
        paddingVertical: theme.SIZES.BASE,
        justifyContent: 'center'
    },
    card: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: 114,
        marginBottom: 16
    },
    cardTitle: {
        flex: 1,
        flexWrap: 'wrap',
        paddingBottom: 6,
        justifyContent: 'center'

    },
    cardDescription: {
        padding: theme.SIZES.BASE / 2
    },
    imageContainer: {
        borderRadius: 3,
        elevation: 1,
        overflow: 'hidden',
    },
    image: {
        // borderRadius: 3,
    },
    horizontalImage: {
        height: 122,
        width: 'auto',
    },
    horizontalStyles: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    verticalStyles: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    fullImage: {
        height: 215
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
});