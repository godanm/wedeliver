import React from "react";
import { Easing} from "react-native";
import {
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer
} from "react-navigation";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Logout from "../screens/Logout";
import CategoryDetails from "../screens/CategoryDetails"
import ProductDetails from "../screens/ProductDetails"
import CartDetails from "../screens/CartDetails"
import OrderHistory from "../screens/OrderHistory"
import FAQ from "../screens/FAQ"
import ContactUs from "../screens/ContactUs"


// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";


const transitionConfig = (transitionProps, prevTransitionProps) => ({
    transitionSpec: {
        duration: 400,
        easing: Easing.out(Easing.poly(4))
    },
    screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const thisSceneIndex = scene.index;
        const width = layout.initWidth;

        const scale = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [4, 1, 1]
        });
        const opacity = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [0, 1, 1]
        });
        const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex],
            outputRange: [width, 0]
        });

        const scaleWithOpacity = { opacity };
        const screenName = "Search";

        if (
            screenName === transitionProps.scene.route.routeName ||
            (prevTransitionProps &&
                screenName === prevTransitionProps.scene.route.routeName)
        ) {
            return scaleWithOpacity;
        }
        return { transform: [{ translateX }] };
    }
});

const HomeStack = createStackNavigator(
    {
      Login: {
          screen: Login,
          navigationOptions: {
              header: null
          }
      },
      Logout: {
          screen: Logout,
          navigationOptions: {
              header: null
          }
      },
      Signup: {
          screen: Signup
      },
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          header: <Header options title="Home" navigation={navigation} />
        })
      },
      CategoryLists: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          header: <Header options title="Home " navigation={navigation} />
        })
      },
      CategoryDetails: {
        screen: CategoryDetails,
        navigationOptions: ({ navigation }) => ({
          header: <Header back options title="Item Details " navigation={navigation} />
        })
      },
      CartDetails: {
        screen: CartDetails,
        navigationOptions: ({ navigation }) => ({
          header: <Header back options title="Cart Details " navigation={navigation} />
        })
      },
      OrderHistory: {
        screen: OrderHistory,
        navigationOptions: ({ navigation }) => ({
          header: <Header options title="Order History " navigation={navigation} />
        })
      },
      FAQ: {
        screen: FAQ,
        navigationOptions: ({ navigation }) => ({
          header: <Header options title="Frequently Asked Questions " navigation={navigation} />
        })
      },
      ContactUs: {
        screen: ContactUs,
        navigationOptions: ({ navigation }) => ({
          header: <Header options title="Contact Us " navigation={navigation} />
        })
      },
      ProductDetails: {
        screen: ProductDetails,
        navigationOptions: ({ navigation }) => ({
          header: <Header back options title="Product Details " navigation={navigation} />
        })
      },

    },
    {
        cardStyle: {
            backgroundColor: "#F8F9FE"
        },
        transitionConfig
    }
);

const AppStack = createDrawerNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
            drawerLabel: ({ focused }) => (
                <DrawerItem screen="Home" title="MyHome" />
            )
        })
      },
      CategoryLists: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem screen="Home" title="Home" />
          )
        })
      },
      CartDetails: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem screen="CartDetails" title="Cart Details" />
          )
        })
      },
      OrderHistory: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem screen="OrderHistory" title="Order History" />
          )
        })
      },
      FAQ: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem screen="FAQ" title="Frequently Asked Questions" />
          )
        })
      },
      ContactUs: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem screen="ContactUs" title="Contact Us" />
          )
        })
      },
      Logout: {
          screen: Logout,
          navigationOptions: navOpt => ({
              drawerLabel: ({ focused }) => (
                  <DrawerItem screen="Logout" title="Logout" />
              )
          })
      }
    },
    Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
