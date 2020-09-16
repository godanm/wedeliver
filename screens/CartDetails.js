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
import argonTheme from "../constants/Theme";
import Icon from "../components/Icon";
import Input from "../components/Input";



export default class CartDetails extends React.Component {
  constructor(props){
    super(props);
    this.sum=0;
    this.txtSum = React.createRef();
    this.state = {
      itemsAvailable: false,
      cartsLoaded: false,
      cartItems: null,
      cartItemsBackup: null,
      totalcartprice:0
    }
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const uid = global.uid;
    var orderlist = [];
    var totalprice = 0.0;
    var cartsRef = firebase.database().ref('/orders/'+uid);
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
      this.setState({itemsAvailable: orderlist.length > 0 ? true : false });
      this.setState({cartItems: orderlist});
      this.setState({cartItemsBackup: orderlist});
      this.setState({totalcartprice: totalprice});
    }.bind(this));
  };
  sendOrder = async () => {
    Alert.alert(
      'Spice Hub',
      'Are you sure you want to submit this order?',
      [
        {
          text: 'Ok',
          onPress: () => this.sendMail(),
          style: 'cancel'
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') }
      ],
      { cancelable: true }
    );
  }
  sendMail = async () => {
    const uid = global.uid;
    const emailBody = this.createEmailBody();
    const SENDGRIDAPIKEY = "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";
    const FROMEMAIL = "spicehubaz@gmail.com";
    const TOMEMAIL = global.email;
    const SUBJECT = "Thank you for your order with Spice Hub AZ!";
    const sendRequest = sendGridEmail(SENDGRIDAPIKEY, TOMEMAIL, FROMEMAIL, SUBJECT, emailBody, "text/html")
    sendRequest.then((response) => {
      console.log("Success", response)
    }).catch((error) =>{
      console.log(error)
    });
    const date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD-hh:mm:ss-a');
    console.log('date', date);
    this.moveOrders('/orders/'+uid,'/ordertransactions/'+uid+'/'+date);
    this.props.navigation.navigate('Home');
  }
  moveOrders(oldRefPath, newRefPath) {
    var oldRef = firebase.database().ref(oldRefPath);
    var newRef = firebase.database().ref(newRefPath);
    oldRef.once('value', function(snap)  {
      newRef.set( snap.val(), function(error) {
        if( !error ) {  oldRef.remove(); }
        else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
      });
    });
  }
  createEmailBody() {
    const { cartItems } = this.state;
    let emailBody = "<html lang='en'>\n";
    emailBody = emailBody + "<head><style type='text/css'>\n";
    emailBody = emailBody + ".tftable {font-size:12px;color:#333333;width:90%;border-width: 1px;border-color: #ebab3a;border-collapse: collapse;}\n";
    emailBody = emailBody + ".tftable th {font-size:20px;font-family: Arial;background-color:#e6983b;border-width: 1px;padding: 8px;border-style: solid;border-color: #ebab3a;text-align:left;}\n";
    emailBody = emailBody + ".tftable tr {background-color:#ffffff;}\n";
    emailBody = emailBody + ".tftable td {font-size:16px;font-family: Arial; border-width: 1px;padding: 8px;border-style: solid;border-color: #ebab3a;}\n";
    emailBody = emailBody + ".tftable tr:hover {background-color:#ffff99;}</style></head>\n";
    emailBody = emailBody + "<body>\n";
    emailBody = emailBody + "<main class='container'>\n";
    emailBody = emailBody + "<div class='body'>\n";
    emailBody = emailBody + "<h2>Thank you for your order. Please find the details below.</h2>\n";
    emailBody = emailBody + "<p>We are so happy that for your order. We are working towards delivering this.</p>\n";
    emailBody = emailBody + "<p>We received your order! We'll send you a reminder email prior to pickup on Thursday - Aug 13, 2020. Orders placed one day in advance can be modified until 11:59pm the day prior to pickup or delivery. Same-day orders cannot be modified.</p>";
    emailBody = emailBody + "<p align='center'><img src='https://images.unsplash.com/photo-1546702005-7f8e5aeab4a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' class='header-img'></p>";
    emailBody = emailBody + "</div></main><table width='90%' align='center' class='tftable'>\n";
    emailBody = emailBody + "<tr>\n";
    emailBody = emailBody + "<th width='15%'></th>\n";
    emailBody = emailBody + "<th width='15%'><font color='#032c58'><strong>Brand</strong></font></th>\n";
    emailBody = emailBody + "<th width='15%'><font color='#032c58'><strong>Description</strong></font></th>\n";
    emailBody = emailBody + "<th width='15%'><font color='#032c58'><strong>Price</strong></font></th>\n";
    emailBody = emailBody + "<th width='15%'><font color='#032c58'><strong>Quantity</strong></font></th>\n";
    emailBody = emailBody + "<th width='15%'><font color='#032c58'><strong>Subtotal</strong></font></th>\n";
    var orderArray = Object.values(cartItems);
    orderArray.map((item, index) => {
      emailBody = emailBody + "<tr>\n";
      emailBody = emailBody + "<td width='15%'><img height='60' width='60' src='" + item.currentitem.thumbnail + "'></td>\n";
      emailBody = emailBody + "<td width='15%'>" + item.currentitem.brand + "</td>\n";
      emailBody = emailBody + "<td width='15%'>" + item.currentitem.description + "</td>\n";
      emailBody = emailBody + "<td width='15%'>$" + item.currentitem.price + "</td>\n";
      emailBody = emailBody + "<td width='15%'>" + item.currentitem.qty + "</td>\n";
      emailBody = emailBody + "<td width='15%'>$" + (item.currentitem.price *  item.currentitem.qty).toFixed(2) + "</td>\n";
      emailBody = emailBody + "</tr>\n";
    })
    emailBody = emailBody + "</table><footer class='container'>\n";
    emailBody = emailBody + "<h2>Once again, thank you for the order!<h2>\n";
    emailBody = emailBody + "<h2>Spice Hub AZ<h2>\n";
    emailBody = emailBody + "</footer></div></body></html>\n";
    return emailBody;
  }
  search(value) {
    let newItems = [...this.state.cartItemsBackup]; // clone the array
    newItems = newItems.filter(l => {
      if (l.currentitem.description !== undefined)
        return l.currentitem.description.toLowerCase().match( value.toLowerCase() );
    });
    this.setState({ cartItems: newItems });
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
    const { cartItems, cartsLoaded, itemsAvailable } = this.state;
    return (
      <ScrollView>
      <View>
        {!cartsLoaded &&
        <View>
          <ActivityIndicator size="large" color="#ef5739"/>
        </View>
        }
        {cartsLoaded && itemsAvailable &&
        <View style={styles.container}  >
          <Input
            right
            color="black"
            autoFocus={true}
            style={styles.search}
            placeholder="What are you looking for?"
            placeholderTextColor={'#8898AA'}
            onChangeText={this.search.bind(this)}
            iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
          />
        </View>
        }
        {cartItems && cartItems.map((prop, key) => {
          return (
              <RenderOrders orders={prop} key={key} fetchData={this.fetchData} />
          );
        })}
        {cartsLoaded && itemsAvailable &&
        <View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5, alignItems: 'center' }}>
          <View style={{flexDirection: 'row', borderTopWidth: 2, flexGrow: 1, flexShrink: 1, justifyContent: 'space-between'}}>
            <TouchableOpacity style={[styles.centerElement, {backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5, alignItems: 'center'}]}
                              onPress={() => this.sendOrder()}
            >
              <Text style={{color: '#ffffff'}}>Submit</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', paddingRight: 20, justifyContent: 'flex-end'}}>
              <Text style={{color: '#8f8f8f', justifyContent: 'flex-end'}} bold>Total: </Text>
              <Text bold>${this.state.totalcartprice}</Text>
            </View>
          </View>
        </View>
        }
        {cartsLoaded && !itemsAvailable &&
        <Block style={{marginTop:100}}>
            <Text color={argonTheme.COLORS.ERROR} p style={{textAlignVertical: "center",textAlign: "center",}}>Nothing available!</Text>
        </Block>
        }
      </View>
      </ScrollView>
    );
  }
}
class RenderOrders extends React.Component {
  deleteHandler = (itemid) => {
      var cartsRef = firebase.database().ref('/orders/'+uid+'/'+itemid);
      cartsRef.remove().then(()=>{
        this.props.fetchData();
      })
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        position: "relative",
        borderRadius: 4,
      },
    });
    var orderArray = Object.values(this.props.orders);
      return (
      <ScrollView>
          {orderArray.map((item, index) => {
          if (item.brand != undefined) {
            const itemid = item.itemid;
            return (
              <TouchableHighlight
                onPress={() => Alert.alert(
                  'Spicehub',
                  'Are you sure you want to delete this item from cart?',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: () => this.deleteHandler(itemid)},
                  ],
                  {cancelable: false}
                )}
                style={{paddingRight: 10}} key={index}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
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
              </TouchableHighlight>

            )
          }
        })}
      </ScrollView>

    );
  }
}
