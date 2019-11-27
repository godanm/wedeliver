import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import MyTodo from "../screens/MyTodo";
import Login from "../screens/Login";
import Adddata from "../screens/Adddata"
import GroupDetails from "../screens/GroupDetails"
import TripDetails from "../screens/TripDetails"


// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";
import Signup from "../screens/Signup";
import MyTrips from "../screens/MyTrips";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
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

const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const TodoStack = createStackNavigator({
    MyTodo: {
    screen: MyTodo,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="My Todo" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const HomeStack = createStackNavigator(
    {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="My Groups" navigation={navigation} />
      })
    },
    Signup: {
      screen: Signup,
      navigationOptions: ({ navigation }) => ({
          header: (
              <Header left={<Block />} white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true
      })
    },
    MyTrips: {
      screen: MyTrips,
      navigationOptions: ({ navigation }) => ({
          header: <Header search options title="My Trips" navigation={navigation} />
      })
    },
    MyTodo: {
        screen: MyTodo,
        navigationOptions: ({ navigation }) => ({
            header: <Header search options title="My Todo" navigation={navigation} />
        })
    },
    GroupDetails: {
        screen: GroupDetails,
        navigationOptions: ({ navigation }) => ({
            header: <Header search options title="Group Details" navigation={navigation} />
        })
    },
    TripDetails: {
        screen: TripDetails,
        navigationOptions: ({ navigation }) => ({
            header: <Header search options title="Trip Details" navigation={navigation} />
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
    Login: {
      /*screen: Login,
      navigationOptions: {
        drawerLabel: () => {}
      }*/
        screen: Adddata,
        navigationOptions: navOpt => ({
            drawerLabel: ({ focused }) => (
                <DrawerItem focused={focused} title="Home" />
            )
        })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    MyTodo: {
      screen: MyTodo,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="MyTodo" title="My To-do" />
        )
      })
    },
      Logout: {
          screen: Login,
          navigationOptions: navOpt => ({
              drawerLabel: ({ focused }) => (
                  <DrawerItem focused={focused} screen="Logout" title="Logout" />
              )
          })
      }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
