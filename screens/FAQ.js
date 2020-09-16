import React, { Component } from "react";
import { Container, Header, Content, Accordion } from "native-base";
import firebase from "../Firebase";
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
  TouchableOpacity, TouchableWithoutFeedback, Dimensions
} from 'react-native';
import {Block, Text} from "galio-framework";
import argonTheme from "../constants/Theme";

const { width } = Dimensions.get('screen');

class FAQ extends Component {
  constructor(props){
    super(props);
    this.state = {
      faqItems: null
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    var faqlist = [];
    var faqRef = firebase.database().ref('/faqs');
    faqRef.once('value', function(snapshot) {
      snapshot.forEach(function (faqSnapshot) {
        faqlist.push(faqSnapshot.val());
      }.bind(this));
      this.setState({faqItems: faqlist});
    }.bind(this))
  }
  render() {
    const { faqItems } = this.state;
    let context = null;
    if (faqItems === null) {
      context =  <ActivityIndicator size="large" color="#0000ff" />
    } else if (faqItems.length > 0) {
      var faqArray = Object.values(faqItems);
      context = <Container>
          <Content>
            <Accordion icon="add"
                       style={{marginTop:50}}
                       expandedIcon="remove"
                 dataArray={faqArray}
                 iconStyle={{ color: "green" }}
                 expandedIconStyle={{ color: "red" }}
                 expanded={0}
            />
          </Content>
        </Container>
    } else  {
      context = <Block style={styles.title}>
        <Text color={argonTheme.COLORS.ERROR} bold style={{textAlignVertical: "center",textAlign: "center",}}>No FAQs available!</Text>
      </Block>
    }
    return (
      <ScrollView>
        {context}
      </ScrollView>
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
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: "#E9ECEF",
    borderRadius: 4
  }
});

export default FAQ;
