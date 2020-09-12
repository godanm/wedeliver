import React from 'react';
import {
    StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, ActivityIndicator, TouchableWithoutFeedback,
    AsyncStorage, FlatList
} from 'react-native';
import { Block, theme, Text } from 'galio-framework';


import { Card, Button } from '../components';
import argonTheme from "../constants/Theme";
import firebase from "../Firebase";
import ItemComponent from '../components/ItemComponent';


const { width } = Dimensions.get('screen');

class Home extends React.Component {
    state = {
        categorydata: null,
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
      var categorylist = [];
      let categoriesRef = firebase.database().ref('/categories');
      categoriesRef.on("value", snap => {
        snap.forEach(function (child) {
          var temp = {
            currentitem: child.val(),
            id: child.key
          };
          categorylist.push(temp)
        });
        this.setState({categorydata: categorylist});
      });
    };
    componentDidMount() {
        this.fetchData();
    }
    render() {
      let context = null;
        if (this.state.categorydata === null) {
            context =  <ActivityIndicator size="large" color="#0000ff" />
        } else if (this.state.categorydata.length > 0) {
          context = <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <ScrollView>
                <ItemComponent items={this.state.categorydata} cta="CategoryDetails"/>
              </ScrollView>
            </Block>
          </Block>
        } else  {
            context = <Block style={styles.title1}>
                <Text color={argonTheme.COLORS.ERROR} bold p style={{textAlignVertical: "center",textAlign: "center",}}>No Categories available!</Text>
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

export default Home;
