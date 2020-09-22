import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Linking } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon } from 'react-native-elements';

import { argonTheme } from '../constants';
import Input from "./Input";


class CustomCard extends React.Component {
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
      <Block row={horizontal} card flex style={cardContainer}>
          <Block flex style={imgContainer}>
              <Image source={{uri: image}} style={imageStyles} />
          </Block>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={13} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.HEADER} bold>Name:{"           "}{this.props.title}</Text>
          </Block>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={13} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.HEADER} bold>Email:{"           "}{this.props.email}</Text>
          </Block>
        <Block flex space="between" style={styles.cardDescription}>
          <Text size={13} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.HEADER} bold>Phone:{"           "}{this.props.phone}</Text>
        </Block>
        <Block flex space="between" style={styles.cardDescription}>
          <Text size={13} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.HEADER} bold>Whatsapp:{"     "}{this.props.whatsapp}</Text>
        </Block>
      </Block>
    );
  }
}

CustomCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    cta: PropTypes.string,
    horizontal: PropTypes.bool,
    full: PropTypes.bool,
    ctaColor: PropTypes.string,
    imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
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

export default withNavigation(CustomCard);
