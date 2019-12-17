import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, ActivityIndicator, FlatList, Image, TouchableWithoutFeedback} from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import ItemComponent from '../components/ItemComponent';

import argonTheme from "../constants/Theme";
import firebase from "../Firebase";
import ActivityDetails from "./ActivityDetails";
import TodoDetails from "./TodoDetails";

const { width } = Dimensions.get('screen');

class TripDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        tododata: [],
        activitydata: [],
        loaded:false
    };

    componentDidMount() {
        this.fetchData();
        //const groupId = '-1LvHs2Rw3_WK1sM127i8';
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
        //const tripid = '-4LvHs2Rw4_WK1sM127i8';

        const { navigation:navigate } = this.props;
        const tripid = this.props.navigation.state.params.id;

        let activitylist = [];
        let todolist = [];

        let activitiesref = firebase.database().ref('trips/'+tripid+"/activities");
        let todosref = firebase.database().ref('trips/'+tripid+"/todos");

        console.log(activitiesref)
        activitiesref.on('child_added', snapshot => {
            let data = snapshot.val();
            let keys = Object.keys(data).toString();
            var temp = {
                data: snapshot.val(),
                id: snapshot.key
            };
            activitylist.push(temp)
            this.setState({ activitydata: activitylist });
        });
        todosref.on('child_added', snapshot => {
            let data = snapshot.val();
            let keys = Object.keys(data).toString();
            var temp = {
                data: snapshot.val(),
                id: snapshot.key
            };
            todolist.push(temp)
            this.setState({ tododata: todolist });
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
                                        <Image source={{uri: this.props.navigation.state.params.thumbnail}} style={imageStyles} />
                                    </Block>
                                    <Block flex space="between" style={styles.cardDescription}>
                                        <Text size={13} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>Group Name -{this.props.navigation.state.params.name}</Text>
                                    </Block>
                                </Block>
                                {this.state.loaded ? (
                                    <View>
                                        <FlatList
                                            data={this.state.activitydata}
                                            ListHeaderComponent={() => this.renderHeader('Activities')}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) =>
                                                <View style={{backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#CCCCCC'}}>
                                                    <TouchableWithoutFeedback key={index} onPress={() => this.props.navigation.push("ActivityDetails",
                                                        {
                                                            id: item.id,
                                                            name: item.data
                                                        }
                                                    )}>
                                                        <Text style={styles.SectionListItemStyle}>
                                                            {`${item.data}`}
                                                        </Text>
                                                    </TouchableWithoutFeedback>
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
                                            data={this.state.tododata}
                                            ListHeaderComponent={() => this.renderHeader('To do(s)  ')}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) =>
                                                <View style={{backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#CCCCCC'}}>
                                                    <TouchableWithoutFeedback key={index} onPress={() => this.props.navigation.push("TodoDetails",
                                                        {
                                                            id: item.id,
                                                            name: item.data
                                                        }
                                                    )}>
                                                        <Text style={styles.SectionListItemStyle}>
                                                            {`${item.data}`}
                                                        </Text>
                                                    </TouchableWithoutFeedback>
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

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text bold size={14} color="#32325D">
                {title}</Text>
        </View>
    );
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
        fontSize: 16,
        padding: 5,
        color: '#fff',
        fontWeight: 'bold',
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

export default TripDetails
