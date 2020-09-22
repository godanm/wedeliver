import React from 'react';
import {
  StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, ActivityIndicator, TouchableWithoutFeedback,
  AsyncStorage, FlatList, Keyboard, Alert
} from 'react-native';
import { Block, theme, Text } from 'galio-framework';


import { Card, Button } from '../components';
import argonTheme from "../constants/Theme";
import firebase from "../Firebase";
import ItemComponent from '../components/ItemComponent';
import Icon from "../components/Icon";
import Input from "../components/Input";


const { width } = Dimensions.get('screen');

class Home extends React.Component {
    state = {
      categorydata: null,
      categorydataBackup:null,
      norecordsfound:true
    };
    async getToken() {
        try {
            return  AsyncStorage.getItem("uid");
        } catch (error) {
            console.log("went wrong", error);
        }
    }
    transformArray (categoryarray) {
      const rows = categoryarray.reduce(function (rows, key, index) {
        return (index % 2 == 0 ? rows.push([key])
          : rows[rows.length-1].push(key)) && rows;
      }, []);
      return rows;
    }
    fetchData = async () => {
      try {
        var categorylist = [];
        let categoriesRef = firebase.database().ref('/maincategories');
        categoriesRef.once("value", snap => {
          const rows = this.transformArray(Object.values(snap.val()));
          this.setState({categorydata: rows});
          this.setState({categorydataBackup: rows});
        });

      }
      catch (err){
        Alert.alert('Error retrieving data! Please try again! ', err.message)
      }
    };
    componentDidMount() {
        this.fetchData();
    }
    search(value) {
      let newItems = [...this.state.categorydataBackup]; // clone the array
      let searchResults = [];
      for (let category of newItems) {
        if (category[0].name.toLowerCase().match(value.toLowerCase())) {
          searchResults.push(category[0]);
        }
        if (category[1] !== undefined && category[1].name.toLowerCase().match(value.toLowerCase())) {
          searchResults.push(category[1]);
        }
      }
      searchResults = this.transformArray(searchResults);
      this.setState({ categorydata: searchResults});
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
                <Text color={argonTheme.COLORS.ERROR} p style={{textAlignVertical: "center",textAlign: "center",}}>Nothing available!</Text>
            </Block>
        }
        return (
            <View style={styles.container}>
              <Input
                right
                color="black"
                style={styles.search}
                onBlur={(e) => Keyboard.dismiss()}
                placeholder="What are you looking for?"
                placeholderTextColor={'#8898AA'}
                onChangeText={this.search.bind(this)}
                iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
              />
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
