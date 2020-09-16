import React from "react";
import { DrawerItems } from "react-navigation";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import { Block, theme } from "galio-framework";

import Images from "../constants/Images";

const { width } = Dimensions.get("screen");

const Drawer = props => (
  <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <Block flex={0.05} style={styles.header}>
      <Image styles={styles.logo} source={Images.Logo} />
    </Block>
      <Block middle style={{ marginTop: 30, marginBottom: 0 }}>
          <Block style={styles.divider} />
      </Block>
      <Block flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, color:'white' }}>
        <DrawerItems {...props} />
      </ScrollView>
    </Block>
  </Block>
);

const Menu = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: "black",
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: "white",
    inactiveTintColor: "#000",
    activeBackgroundColor: "transparent",
    itemStyle: {
      width: width * 0.75,
      backgroundColor: "white"
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: "normal"
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 5,
    justifyContent: 'center'
  },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF"
    }
});

export default Menu;
