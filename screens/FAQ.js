import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import firebase from "../Firebase";
import Accordion from 'react-native-collapsible/Accordion';

const styles = {
  // bgColor: 'white',
  titleTextColor: "blue",
  rowTitleColor: "blue",
  // rowContentColor: 'grey',
  // arrowColor: "red",
};
const config = {
  // animate: true,
  // arrowIcon: "V",
};
const SECTIONS = [
  {
    question: 'First',
    answer: 'Lorem ipsum...',
  },
  {
    question: 'Second',
    answer: 'Lorem ipsum...',
  },
];

class FAQ extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      faqItems: null,
      faqsLoaded: false
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
        var temp = {
          currentitem: faqSnapshot.val(),
          id: faqSnapshot.key
        };
        faqlist.push(temp);
      }.bind(this));
      this.setState({faqsLoaded: true});
      this.setState({faqItems: faqlist});
    }.bind(this))
  }

  state = {
    activeSections: [],
  };

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.answer}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.question}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text>{section.answer}</Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
    console.log('GODAN');
  };

  render() {
    const {faqItems, faqsLoaded} = this.state;
    return (
      <View style={styles.container}>
        {faqItems && faqItems.map((prop, key) => {
          return (
            <Accordion key={key}
                       activeSections={[0]}
                       sections={SECTIONS}
              renderSectionTitle={this._renderSectionTitle}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
            />
          );
        })}
      </View>
    );
  }
};

export default FAQ;
