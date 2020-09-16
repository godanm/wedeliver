import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  ScrollView,
  Text,
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

export default class ContactUs extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
  }
  render() {
    return (
      <ScrollView>
        <View>
          <Text>Contact Us</Text>
        </View>
      </ScrollView>
    );
  }
}
