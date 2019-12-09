import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, ActivityIndicator, SectionList, Image} from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import ItemComponent from '../components/ItemComponent';

import argonTheme from "../constants/Theme";
import firebase from "../Firebase";

const { width } = Dimensions.get('screen');

const DATA = [
    {
        title: 'Members',
        data: ['Sudha Godan', 'Godan Mannazhi'],
    },
    {
        title: 'Trips',
        data: ['Trip to Yosemite'],
    },
];

class GroupDetails extends React.Component {
    state = {
        items: []
    };
    componentDidMount() {
        //const groupId = JSON.stringify(navigation.getParam('id', 'NO-ID'))
        const groupId = '-1LvHs2Rw3_WK1sM127i8';
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
                                        <Text size={13} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>Group Name - {this.props.navigation.state.params.name}</Text>
                                    </Block>
                                </Block>
                                <SectionList
                                    sections={DATA}
                                    keyExtractor={(item, index) => item + index}
                                    renderItem={({ item }) => <Item style={styles.SectionListItemStyle}
                                                                    title={item} />}
                                    renderSectionHeader={({ section: { title } }) => (
                                        <Text style={styles.SectionHeaderStyle} bold size={24} color="#32325D">
                                            {title}</Text>
                                    )}
                                />
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
        fontSize: 20,
        padding: 5,
        color: '#fff',
    },
    SectionListItemStyle: {
        fontSize: 15,
        padding: 15,
        color: '#000',
        backgroundColor: '#F5F5F5',
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

export default GroupDetails;
