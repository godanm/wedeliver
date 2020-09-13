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
      cartItems: null,
      total: 0
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
        var temp = {
          currentitem: userSnapshot.val(),
          id: userSnapshot.key
        };
        orderlist.push(temp);
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

    });
    var orderArray = Object.values(this.props.orders);
      return (
      <ScrollView>
        {orderArray.map((item, index) => {
          if (item.brand != undefined) {
            return (
              <TouchableHighlight
                onPress={() => Alert.alert(
                  'Spicehub',
                  'Are you sure you want to delete this item from cart?',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: () => console.log('Ok Pressed!')},
                  ],
                  {cancelable: false}
                )}
                style={{paddingRight: 10}} key={index}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
                  <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                    <Image source={{uri: item.thumbnail}}
                           style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]}/>
                    <View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                      <Text numberOfLines={1} style={{fontSize: 15}}><Text style={{color: '#d61e6e'}} bold={true}>Brand - </Text>{item.brand}</Text>
                      <Text numberOfLines={1} style={{color: '#333333'}}><Text style={{color: '#d61e6e'}} bold={true}>Description - </Text>{item.description}</Text>
                      <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}><Text style={{color: '#d61e6e'}} bold={true}>Sub total - </Text>
                        ${item.subtotal.toFixed(2)}</Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: '#cccccc',
                          paddingHorizontal: 7,
                          paddingTop: 3,
                          color: '#4107e3',
                          fontSize: 13
                      }}>Qty - {item.qty} / Price - ${item.price}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>

            )
          }
        })}
      </ScrollView>

    );
  }
}
