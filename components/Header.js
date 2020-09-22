import React from 'react';
import { withNavigation } from 'react-navigation';
import {TouchableOpacity, StyleSheet, Platform, Dimensions, AsyncStorage, ActivityIndicator} from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';

import { Icon } from 'react-native-elements'

import Input from './Input';
import argonTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({todoClicked, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]}
                    onPress={() => navigation.push('CartDetails')}
        accessible={true}
        accessibilityLabel={"Carts"}>
    <Icon type="ionicon" name={Platform.OS === "ios" ? "ios-cart" : "md-cart"} />
  </TouchableOpacity>
);

class LDIHeader extends React.Component {
    state = {
        isLoading: true,
        name : null
    };

    _logout = (props) => {
        props.navigation.popToTop();
    }

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }
  async getToken() {
        try {
            return  await AsyncStorage.getItem("name");
        } catch (error) {
            console.log("went wrong1", error);
        }
    }
  renderRight = () => {
    const { title, navigation } = this.props;
    const { routeName } = navigation.state;
        return (
            <BellButton style={styles.divider} key='chat-home' navigation={navigation} />
        )
  }

  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;
    const { routeName } = navigation.state;
    return (
        <Block style={styles.title}>
            <Text size={17} color={argonTheme.COLORS.HEADER} bold>Welcome {this.state.name}!
          </Text>
        </Block>
    );

  }
  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        placeholderTextColor={'#8898AA'}
        onChangeText={(search) => this.search()}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
      />
    );
  }
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  }
    componentDidMount() {
        AsyncStorage.getItem("name").then((value) => {
            this.setState({"name": value});
            this.setState({"isLoading": false});
        });
    }
  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ['Home', 'Profile'].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

      if (this.state.isLoading) {
          <ActivityIndicator size="large" color="#0000ff" />
      }
          return (
      <Block style={headerStyles}>
        <NavBar
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon
              name={back ? 'chevron-left' : "menu"} family="fontello"
              size={24} onPress={this.handleLeftPress}
              color={iconColor || (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)}
              style={{ marginTop: 2 }}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400'
  },
});

export default withNavigation(LDIHeader);
