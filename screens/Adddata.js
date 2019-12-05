import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import onCollectionUpdate from '../loaddata';
import retrieveData from "../loaddata";



class Adddata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null
        }
        this.state = {
            isLoading: true,
            boards: []
        };
    }
    componentDidMount() {
        retrieveData('-1LvHs2Rw3_WK1sM127i8','trips', 'grouptrips', snap => console.log('TRIPS', snap));
        retrieveData('-1LvHs2Rw3_WK1sM127i8','members', 'groupmembers', snap => console.log('MEMBERS', snap));

    }
    submit() {
        /* Update Group */
        const {onCreate} = this.props;
        var Group = {
            groupName: "Christmas outing group",
            avatar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            trips:
                [{
                    tripdestination: "Kohls Ranch",
                    tripstart: "12/24/2019",
                    tripend: "12/27/2019",
                    thumpbnails: "https://images.unsplash.com/photo-1450226840871-893c2e0bf620?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    status:true,
                    remarks:"Trip to Kohls Ranch",
                    activity:
                        [{
                            activityName: "Hike near cabin",
                            plannedDate: "12/25/2019",
                            cost:0.0,
                            location: ""
                        },
                            {
                                activityName: "Visit Sedona",
                                plannedDate: "12/26/2019",
                                cost:0.0,
                                location: ""
                            }],
                    todo:
                        [{
                            task: "Finalize on food",
                            dueDate: "12/10/2019",
                            owner:"knsudha@gmail.com",
                            status: "pending"
                        },
                            {
                                task: "Buy groceries",
                                dueDate: "12/23/2019",
                                owner:"reachgodan@gmail.com",
                                status: "pending"
                            }]
                }],
            members:
                [
                    {
                        email: "reachgodan@gmail.com",
                        fName: "Godan",
                        lName: "Mannazhi",
                        phone: "609-996-2891",
                        avatar:"https://lh3.googleusercontent.com/-A2N4h5IpkNM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf8-AA23jV_C9hvzzazytk25fXh1g.CMID/s64-c/photo.jpg",
                        status:true
                    },
                    {
                        email: "knsudha@gmail.com",
                        fName: "Sudha",
                        lName: "Godan",
                        avatar:"https://lh3.googleusercontent.com/-A2N4h5IpkNM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf8-AA23jV_C9hvzzazytk25fXh1g.CMID/s64-c/photo.jpg",
                        status:true
                    }
                ]
        }
        /* try {
            const {onCreate} = this.props;
            firebase.database().ref('Groups/').push({
                Group
            }).then((data)=>{
                //success callback
                console.log('data ' , data)
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
            })
            console.log("DONE Updating Group")
        } catch (err) {
            console.log(err)
        } */
}
    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <List>
                    {
                        this.state.boards.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{name: 'book', type: 'font-awesome'}}
                                onPress={() => {
                                    this.props.navigation.navigate('BoardDetails', {
                                        boardkey: `${JSON.stringify(item.key)}`,
                                    });
                                }}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Adddata
