import React from 'react';
import {
  StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, ActivityIndicator, TouchableWithoutFeedback,
  AsyncStorage, Image
} from 'react-native';
import { Block, theme, Text } from 'galio-framework'
import argonTheme from "../constants/Theme";
import firebase from "../Firebase";
import { Card, Button } from '../components';
import CustomCard from "../components/Card";


const { width } = Dimensions.get('screen');

class ContactUs extends React.Component {
  state = {
    contactdata: null,
    norecordsfound:true
  };
  async getToken() {
    try {
      return  AsyncStorage.getItem("uid");
    } catch (error) {
      console.log("went wrong", error);
    }
  }
  fetchData = async () => {
    var contactlist = [];
    let contactsRef = firebase.database().ref('/contactus');
    contactsRef.on("value", snap => {
      contactlist.push(snap.val())
      this.setState({contactdata: contactlist});
    });
  };
  componentDidMount() {
    this.fetchData();
  }
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
    if (this.state.contactdata === null) {
      context =  <ActivityIndicator size="large" color="#0000ff" />
    } else if (this.state.contactdata.length > 0) {
      context = <Block flex space="between" style={styles.padded}>
        <Block flex space="around" style={{ zIndex: 2 }}>
          <ScrollView>
            <View style={styles.container}>
              <Block flex space="between" style={styles.padded}>
                <View style={styles.itemsList}>
                  {this.state.contactdata.map((item, index) => {
                    return (
                        <CustomCard image={item.logo} key={index} title={item.name} email={item.email} phone={item.phone} whatsapp={item.whatsapp}></CustomCard>
                    );
                  })}
                </View>
              </Block>
            </View>
          </ScrollView>
        </Block>
      </Block>
    } else  {
      context = <Block style={styles.title1}>
        <Text color={argonTheme.COLORS.ERROR} p style={{textAlignVertical: "center",textAlign: "center",}}>Nothing available!</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    position: "relative",
    borderRadius: 4,
  },
  item: {
    width: '50%' // is 50% of container width
  },
  title: {
    width: '90%',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: "#E9ECEF",
    borderRadius: 4
  }
});

export default ContactUs;
