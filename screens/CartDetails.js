import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
  FlatList,
  TouchableHighlight,
  ListView,
  TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import firebase from "../Firebase";
import config from './config';
import { Block, Text, theme } from "galio-framework";
import { Col, Row, Grid } from "react-native-easy-grid";
import argonTheme from "../constants/Theme";
import {MaterialIcons} from "@expo/vector-icons";



export default class CartDetails extends React.Component {
  constructor(props){
    super(props);
    this.sum=0;
    this.txtSum = React.createRef();
    this.state = {
      selectAll: false,
      cartsLoaded: false,
      cartItems: null
    }
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    var uid = global.uid;
    var orderlist = [];
    var cartsRef = firebase.database().ref('/orders/'+uid);
    cartsRef.once('value', function(snapshot) {
      snapshot.forEach(function(userSnapshot) {
        var orders = userSnapshot.val().orderlist;
        orderlist.push(orders);
      }.bind(this));
      this.setState({cartsLoaded: true});
      this.setState({cartItems: orderlist});
    }.bind(this));
  };

  render() {
    const styles = StyleSheet.create({
      centerElement: {justifyContent: 'center', alignItems: 'center'},
      paddingLeft: config.deviceWidth * 0.5,
      width : config.deviceWidth * 0.8
    });
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
    const { cartItems, cartsLoaded } = this.state;
    return (
      <ScrollView>
      <View>
        {!cartsLoaded &&
        <View>
          <ActivityIndicator size="large" color="#ef5739"/>
        </View>
        }
        {cartItems && cartItems.map((prop, key) => {
          return (
            <RenderOrders orders={prop} key={key} />
          );
        })}
        {cartsLoaded &&
        <View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
          <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text></Text>
            <View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
              <Text style={{color: '#8f8f8f'}} bold>Total: </Text>
              <Text>Godan</Text>
            </View>
          </View>
        </View>
        }
      </View>
      </ScrollView>
    );
  }
}
  class RenderOrders extends React.Component {
    render() {
      const styles = StyleSheet.create({
        itemsList: {
          flex: 1,
          flexDirection: 'column',
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
        <ScrollView>
          {this.props.orders.map((item, index) => {
            return (
              <TouchableHighlight
                onPress={() => Alert.alert(
                  'Spicehub',
                  'Are you sure you want to delete this item from cart?',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: () => console.log('Ok Pressed!')},
                  ],
                  { cancelable: false }
                )}
                style={{paddingRight: 10}} key={index}>
              <View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
                <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                    <Image source={{uri: item.thumbnail}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
                  <View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 15}}>{item.brand}</Text>
                    <Text numberOfLines={1} style={{color: '#333333'}}>{item.description}</Text>
                    <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>Sub total - ${item.subtotal.toFixed(2)}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => this.quantityHandler('less', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
                        <MaterialIcons name="remove" size={22} color="#cccccc" />
                      </TouchableOpacity>
                      <Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{item.qty}</Text>
                      <TouchableOpacity onPress={() => this.quantityHandler('more', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
                        <MaterialIcons name="add" size={22} color="#cccccc" />
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>
                <View style={[styles.centerElement, {width: 60}]}>
                </View>
              </View>
              </TouchableHighlight>

            )
          })}
        </ScrollView>

      );
  }
}
