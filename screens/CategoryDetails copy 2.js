import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View, ActivityIndicator, Image, FlatList } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { Card } from 'react-native-elements'
import argonTheme from "../constants/Theme";
import firebase from "../Firebase";


const { width } = Dimensions.get('screen');

class CategoryDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
      itemsData: [],
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
      const { navigation:navigate } = this.props;
      const categoryId = this.props.navigation.state.params.id;
      let itemslist = [];
      let itemsref = firebase.database().ref('categories/'+categoryId+"/");
      itemsref.on('child_added', snapshot => {
        var temp = {
            currentitem: snapshot.val(),
            id: snapshot.key
        };
        itemslist.push(temp)
        this.setState({ itemsData: itemslist });
        this.setState({ loaded: true });
      });
    };

    render() {
      let context = null;
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
      if (this.state.itemsData === null) {
        context =  <ActivityIndicator size="large" color="#0000ff" />
      } else if (this.state.itemsData.length > 0) {
        context = <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <ScrollView>
                {
                  this.state.itemsData.map((item, i) => {
                    if (item.currentitem.brand !== undefined) {
                      return (
                        <Card key={i} style={cardContainer}>
                          <View style={styles.user}>
                            <Image
                              style={imageStyles}
                              resizeMode="cover"
                              source={{uri: item.currentitem.thumbnail}}
                            />
                            <Block flex space="between" style={styles.cardDescription}>
                              <Text size={15} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.currentitem.brand}</Text>
                              <Text size={15} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.currentitem.description}</Text>
                              <Text size={15} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.currentitem.price}</Text>
                              <Text size={15} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.currentitem.weight}</Text>
                            </Block>
                          </View>
                        </Card>
                      );
                    }
                  })
                }
            </ScrollView>
          </Block>
        </Block>
      } else  {
        context = <Block style={styles.title1}>
          <Text color={argonTheme.COLORS.ERROR} bold p style={{textAlignVertical: "center",textAlign: "center",}}>No Categories available!</Text>
        </Block>
      }
      return (
        <View style={styles.container}>
            {context}
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

export default CategoryDetails
