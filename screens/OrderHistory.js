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
import { sendGridEmail } from 'react-native-sendgrid';
import moment from 'moment';
import {  Picker, Icon } from "native-base";

this.state = {
  country: 'uk'
}

export default class OrderHistory extends React.Component {
  constructor(props){
    super(props);
    this.sum=0;
    this.txtSum = React.createRef();
    this.state = {
      selectAll: false,
      cartsLoaded: false,
      cartItems: null,
      orders:null,
      totalcartprice:0
    }
  }

  componentDidMount() {
    this.fetchOrders();
  }
  fetchOrders = async () => {
    const uid = global.uid;
    var orderlist = [];
    var totalprice = 0.0;
    var cartsRef = firebase.database().ref('/ordertransactions/'+uid);
    cartsRef.once('value', function(snapshot) {
      snapshot.forEach(function(userSnapshot) {
        var orderDate = userSnapshot.key;
        orderDate = orderDate.substr(0,10)
        var temp = {
          id: moment(orderDate).format('MM-DD-YYYY'),
          value : userSnapshot.key
        };
        orderlist.push(temp);
      }.bind(this));
      this.setState({orders: orderlist});
    }.bind(this));
  }
  fetchData = async (orderId) => {
    const uid = global.uid;
    var orderlist = [];
    var totalprice = 0.0;
    var cartsRef = firebase.database().ref('/ordertransactions/'+uid+'/'+orderId);
    cartsRef.once('value', function(snapshot) {
      snapshot.forEach(function(userSnapshot) {
        totalprice = (parseFloat(totalprice) + parseFloat(userSnapshot.val().subtotal)).toFixed(2);
        var temp = {
          currentitem: userSnapshot.val(),
          id: userSnapshot.key
        };
        orderlist.push(temp);
      }.bind(this));
      this.setState({cartsLoaded: true});
      this.setState({cartItems: orderlist});
      this.setState({totalcartprice: totalprice});
    }.bind(this));
  };
  onValueChange(value) {
    this.fetchData(value);
  }
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
    const { cartItems, cartsLoaded, orders } = this.state;
    return (
      <ScrollView>
        {orders &&
        <Block flex space="around" center>
          <Picker
            mode="dropdown"
            placeholder="Select the Order"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{width: 300}}
            iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Please select the order!" value=""/>
            {this.state.orders.map((orders, i) => {
              return (
                <Picker.Item label={orders.id} value={orders.value}  key={i} />
              );
            })}
          </Picker>
        </Block>
        }
        <View>
          {cartItems && cartItems.map((prop, key) => {
            return (
              <RenderOrders orders={prop} key={key} />
            );
          })}
          {cartsLoaded &&
          <View style={{
            backgroundColor: '#fff',
            borderTopWidth: 2,
            borderColor: '#f6f6f6',
            paddingVertical: 5,
            alignItems: 'flex-end'
          }}>
            <View style={{
              flexDirection: 'row',
              borderTopWidth: 2,
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: 'space-between'
            }}>
              <View style={{flexDirection: 'row', paddingRight: 20, justifyContent: 'flex-end'}}>
                <Text style={{color: '#8f8f8f', justifyContent: 'flex-end'}} bold>Total: </Text>
                <Text bold>${this.state.totalcartprice}</Text>
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
                <View key={index} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
                  <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                    <Image source={{uri: item.thumbnail}}
                           style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]}/>
                    <View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                      <Text numberOfLines={1} style={{fontSize: 15}}><Text style={{color: '#032c58'}} bold={true}>Brand - </Text>{item.brand}</Text>
                      <Text numberOfLines={1} style={{color: '#333333'}}><Text style={{color: '#032c58'}} bold={true}>Description - </Text>{item.description}</Text>
                      <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}><Text style={{color: '#032c58'}} bold={true}>Price - </Text>
                        ${item.price.toFixed(2)}</Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: '#cccccc',
                          paddingHorizontal: 7,
                          paddingTop: 3,
                          color: '#032c58',
                          fontSize: 13
                        }}>Quantity - {item.qty} / Sub Total - ${item.subtotal.toFixed(2)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
            )
          }
        })}
      </ScrollView>

    );
  }
}
