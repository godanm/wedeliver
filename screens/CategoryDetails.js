import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from "../Firebase";
import argonTheme from "../constants/Theme";

export default class Cart extends React.Component {
  constructor(props){
    super(props);
    this.sum=0;
    this.txtSum = React.createRef();
    this.state = {
      selectAll: false,
      cartItemsIsLoading: false,
      totalcartprice:0
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const { navigation:navigate } = this.props;
    const categoryId = this.props.navigation.state.params.id;
    let itemslist = [];
    let itemsref = firebase.database().ref('categories/'+categoryId+"/");
    itemsref.on('child_added', snapshot => {
      var temp = {
        currentitem: snapshot.val(),
        itemId: snapshot.key,
        qty:0
      };
      itemslist.push(temp)
      this.setState({ cartItems: itemslist });
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

    if(action == 'more'){
      newItems[index]['qty'] = currentQty + 1;
    } else if(action == 'less'){
      newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 0;
    }

    this.setState({ cartItems: newItems }); // set new state
  }

  subtotalPrice = () => {
    const { cartItems } = this.state;
    if(cartItems){
      cartItems.map((item) => {
        if (item.currentitem.brand !== undefined) {
          this.sum = this.sum  + (item.qty * item.currentitem.price);
        }
      });
      return this.sum;
    }
    return 0;
  }

  handleCart = () => {
    const { cartItems } = this.state;
    var recordfound = false;
    var uid = global.uid;
    var orderlist = [];
    if (this.sum === 0) {
      Alert.alert("Please add at least one item to cart!");
      return;
    } else {
      cartItems.map((item, i) => {
        if (item.qty > 0) {
          recordfound = true;
          var order = {
            email: 'reachgodan@gmail.com',
            brand: item.currentitem.brand,
            description: item.currentitem.description,
            price: item.currentitem.price,
            qty: item.qty,
            subtotal: (item.qty * item.currentitem.price.toFixed(2)),
            uid:uid,
            thumbnail:item.currentitem.thumbnail ? item.currentitem.thumbnail : null
          };
          orderlist.push(order)
        }
      })
    }

    var uid = global.uid;
    if (recordfound) {
      firebase.database().ref('orders/'+ uid + '/'  + this.props.navigation.state.params.id).set({
        orderlist
      })
    }
  }

  render() {
    const styles = StyleSheet.create({
      centerElement: {justifyContent: 'center', alignItems: 'center'},
    });

    const { cartItems, cartItemsIsLoading, selectAll } = this.state;

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
        {cartItemsIsLoading ? (
          <View style={[styles.centerElement, {height: 300}]}>
            <ActivityIndicator size="large" color="#ef5739" />
          </View>
        ) : (
          <ScrollView>
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
                        <MaterialIcons name="remove" size={22} color="red" />
                      </TouchableOpacity>
                      <Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#054a85', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{item.qty}</Text>
                      <TouchableOpacity onPress={() => this.quantityHandler('more', i)} style={{ borderWidth: 1, borderColor: '#054a85' }}>
                        <MaterialIcons name="add" size={22} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={[styles.centerElement, {width: 60}]}>
                </View>
              </View>
              )}
            })}
          </ScrollView>
        )}

        {!cartItemsIsLoading &&
        <View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
          <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text></Text>
            <View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
              <Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
              <Text ref={this.txtSum}>${this.subtotalPrice().toFixed(2)}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center'}}>
            <TouchableOpacity style={[styles.centerElement, {backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5}]}
                onPress={() => Alert.alert(
                  'Spicehub',
                  'Are you sure you want to add these items to cart?',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: this.handleCart()},
                  ],
                  { cancelable: false }
                )}
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
