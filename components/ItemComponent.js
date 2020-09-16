import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Block, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";
import {withNavigation} from "react-navigation";

 class ItemComponent extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired
    };
     componentDidMount(snapshot) {
         var returnArr = [];

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
                        {this.props.items.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => this.props.navigation.push(cta,
                                    {
                                        id: item.id,
                                        name: item.currentitem.name,
                                        thumbnail: item.currentitem.thumbnail
                                    }
                                    )}>
                                <Block row={horizontal} card flex style={cardContainer} >
                                        <Block flex style={imgContainer}>
                                            <Image source={{uri: item.currentitem.thumbnail}} style={imageStyles} />
                                        </Block>
                                        <Block flex space="between" style={styles.cardDescription}>
                                            <Text size={13} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.currentitem.name}</Text>
                                        </Block>
                                    </Block>
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </View>
                </Block>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
export default withNavigation(ItemComponent);
