import React from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import firebase from "../Firebase";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class TodoDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        tododata: [],
        loaded:false
    };

    componentDidMount() {
        this.fetchData();
        //const groupId = '-1LvHs2Rw3_WK1sM127i8';
    }

    renderHeader = (header) => {
        //View to set in Header
        return (
            <View style={styles.SectionHeaderStyle}>
                <Text style={styles.SectionHeaderStyle}>{header} </Text>
            </View>
        );
    };

    fetchData = async () => {
        //const todoid = '-9LvHs2Rw3_WK1sM127i8';

        const { navigation:navigate } = this.props;
        const todoid = this.props.navigation.state.params.id;
        let activityref = firebase.database().ref('todos/'+todoid);
        activityref.once('value', snapshot => {
            this.setState({ tododata: snapshot.val() });
            this.setState({ loaded: true });
        });

    };

    render() {
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
        return (
            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ width, marginTop: '5%' }}
                        >
                            <Block flex style={styles.profileCard}>
                                <Block middle style={styles.avatarContainer}>
                                    <Image
                                        source={{ uri: this.state.tododata.thumbnail }}
                                        style={styles.avatar}
                                    />
                                </Block>
                                <Block flex>
                                    <Block middle style={styles.nameInfo}>
                                        <Text size={28} color="#32325D">
                                            {this.state.tododata.name}
                                        </Text>
                                        <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                                            Due Date: {this.state.tododata.duedate}
                                        </Text>
                                        <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                                            Owner: {this.state.tododata.owner}
                                        </Text>
                                        <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                                            Current status: {this.state.tododata.status}
                                        </Text>
                                    </Block>
                                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                                        <Block style={styles.divider} />
                                    </Block>
                                    <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                                        <Block row space="between" style={{ flexWrap: "wrap" }}>
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                        </ScrollView>
                    </ImageBackground>
                </Block>
            </Block>
        );
    }
}

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text bold size={14} color="#32325D">
                {title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    profile: {
        //marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
        // marginBottom: -HeaderHeight * 2,
        flex: 1
    },
    profileContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    profileBackground: {
        width: width,
        height: height / 2
    },
    profileCard: {
        // position: "relative",
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2
    },
    info: {
        paddingHorizontal: 40
    },
    avatarContainer: {
        position: "relative",
        marginTop: -80
    },
    avatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0
    },
    nameInfo: {
        marginTop: 35
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: "center",
        width: thumbMeasure,
        height: thumbMeasure
    }
});

export default TodoDetails;
