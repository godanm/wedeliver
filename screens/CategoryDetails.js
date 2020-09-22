import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Header, Item, Button, Text } from 'native-base';
import firebase from "../Firebase";
import argonTheme from "../constants/Theme";
import Icon from "../components/Icon";
import {theme} from "galio-framework";
import Input from '../components/Input';

export default class Cart extends React.Component {
  constructor(props){
    super(props);
    this.sum=0;
    this.txtSum = React.createRef();
    this.state = {
      selectAll: false,
      cartsLoaded: false,
      cartItems:null,
      cartItemsBackup:null,
      totalcartprice:0
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  search(value) {
    let newItems = [...this.state.cartItemsBackup]; // clone the array
    newItems = newItems.filter(l => {
      if (l.currentitem.description !== undefined)
        return l.currentitem.description.toLowerCase().match( value.toLowerCase()) || l.currentitem.brand.toLowerCase().match( value.toLowerCase());
    });
    this.setState({ cartItems: newItems });
    this.setState({ cartsLoaded: true });
  }
  loadData(path) {
    return firebase.database().ref(path).once("value");
  };
  fetchData = async () => {
    let qty = 0;
    let itemslist = [];
    const { navigation:navigate } = this.props;
    const categoryId = this.props.navigation.state.params.id;
    this.loadData('/categories/'+categoryId+'/').then((snapshot) => {
      snapshot.forEach(function(childSnapshot) {
        let totalPrice = 0;
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        let qtyref =  firebase.database().ref('orders/'+global.uid+"/"+key);
        this.loadData('orders/'+global.uid+"/"+key).then((snap) => {
          if (snap.exists()) {
            qty = snap.val().qty ? snap.val().qty : 0;
            totalPrice = totalPrice + (snap.val().qty * snap.val().price);
          } else {
            qty = 0;
            totalPrice=0;
          }
          var temp = {
            currentitem: childData,
            itemId: key,
            qty:qty
          };
          itemslist.push(temp)
          this.setState({ cartItems: itemslist });
          this.setState({ cartItemsBackup: itemslist });
          this.setState({ cartsLoaded: true });
          this.setState({ totalcartprice: totalPrice + this.state.totalcartprice });

        });
      }.bind(this));
    });
  };

  selectHandler = (index, value) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value
    this.setState({ cartItems: newItems }); // set new state
  }

  selectHandlerAll = (value) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems.map((item, index) => {
      newItems[index]['checked'] = value == true ? 0 : 1; // set the new value
    });
    this.setState({ cartItems: newItems, selectAll: (value == true ? false : true) }); // set new state
  }

  deleteHandler = (index) => {
    Alert.alert(
      'Are you sure you want to delete this item from your cart?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => {
            let updatedCart = this.state.cartItems; /* Clone it first */
            updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
            this.setState(updatedCart); /* Update the state */
          }},
      ],
      { cancelable: false }
    );
  }

  quantityHandler = (action, index) => {
    const newItems = [...this.state.cartItems]; // clone the array

    let currentQty = newItems[index]['qty'];
    let totalPrice = this.state.totalcartprice;
    totalPrice = totalPrice - (newItems[index]['qty'] * newItems[index].currentitem['price']);
    if(action == 'more'){
      newItems[index]['qty'] = currentQty + 1;
    } else if(action == 'less'){
      newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 0;
    }
    totalPrice = totalPrice + (newItems[index]['qty'] * newItems[index].currentitem['price']);
    this.setState({ totalcartprice: totalPrice});
    this.setState({ cartItems: newItems }); // set new state
  }

  handleCart = () => {

    const { cartItems } = this.state;
    var recordFound = false;
    var uid = global.uid;
    try {
      cartItems.map((item, i) => {
        if (item.qty > 0) {
          recordFound = true;
          firebase.database().ref('orders/' + uid + '/' + item.itemId).set({
            email: global.email,
            brand: item.currentitem.brand,
            description: item.currentitem.description,
            price: item.currentitem.price,
            qty: item.qty,
            subtotal: (item.qty * item.currentitem.price.toFixed(2)),
            uid: uid,
            thumbnail: item.currentitem.thumbnail ? item.currentitem.thumbnail : null,
            itemid: item.itemId
          })
        } else {
          firebase.database().ref('orders/' + uid + '/' + item.itemId).remove();
        }
      })
    }
    catch (err){
      Alert.alert('Error when adding to cart in: ', err.message)
      console.log(err)
    }
    if (!recordFound) {
      Alert.alert("Please add at least one item to cart!");
      return;
    } else {
      Alert.alert('Items added succesfully!')
      this.props.navigation.push("Home");
    }
  }

  render() {
    const styles = StyleSheet.create({
      centerElement: {justifyContent: 'center', alignItems: 'center'},
    });

    const { cartItems, cartsLoaded, selectAll } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
        <View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10}}>
          <View style={[styles.centerElement, {width: 50, height: 50}]}>
            <Ionicons name="ios-cart" size={25} color="#000" />
          </View>
          <View style={[styles.centerElement, {height: 50}]}>
            <Text color={argonTheme.COLORS.ACTIVE}>Items available in {this.props.navigation.state.params.id}</Text>
          </View>
        </View>
        {!cartsLoaded ? (
          <View style={[styles.centerElement, {height: 300}]}>
            <ActivityIndicator size="large" color="#ef5739" />
          </View>
        ) : (
          <ScrollView>
            <Input
              right
              color="black"
              style={styles.search}
              placeholder="What are you looking for?"
              placeholderTextColor={'#8898AA'}
              onChangeText={this.search.bind(this)}
              iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
            />
            {cartItems && cartItems.map((item, i) => {
              if (item.currentitem.brand !== undefined) {
                return (
              <View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
                <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                  <TouchableOpacity onPress={() => {this.props.navigation.navigate('ProductDetails', {productDetails: item})}} style={{paddingRight: 10}}>
                    <Image source={{uri: item.currentitem.thumbnail}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
                  </TouchableOpacity>
                  <View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 15}}>{item.currentitem.brand}</Text>
                    <Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.currentitem.description}</Text>
                    <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>Price - ${item.currentitem.price}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => this.quantityHandler('less', i)} style={{ borderWidth: 1, borderColor: '#054a85' }}>
                        <MaterialIcons name="remove" size={28} color="#ff6b36" />
                      </TouchableOpacity>
                      <Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#054a85', paddingHorizontal: 7, paddingTop: 3, color: '#4107e3', fontSize: 18 }}>{item.qty}</Text>
                      <TouchableOpacity onPress={() => this.quantityHandler('more', i)} style={{ borderWidth: 1, borderColor: '#054a85' }}>
                        <MaterialIcons name="add" size={28} color="#ff6b36" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              )}
            })}
          </ScrollView>
        )}

        {cartsLoaded &&
        <View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
          <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text></Text>
            <View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
              <Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
              <Text ref={this.txtSum}>${this.state.totalcartprice.toFixed(2)}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center'}}>
            <TouchableOpacity style={[styles.centerElement, {backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5}]}
                              onPress={() => this.handleCart()}
            >
              <Text style={{color: '#ffffff'}}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
        }
      </View>
    );
  }
}
