import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { listToDos } from './graphql/queries';


import { Tile } from 'react-native-elements';

const { width } = Dimensions.get('screen');

class MyTodo extends React.Component {
    render() {
        const ListView = ({ todos }) => {
            return <ScrollView
                contentContainerStyle={styles.Todos}
            >
                <Block flex>
                {todos.map(todo =>
                        <Tile key={todo.id}
                            imageSrc={{uri: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}
                            title={todo.description}
                        >
                        <Text>{todo.title}</Text>
                        </Tile>
                        )}
                </Block>
            </ScrollView>;
        };
        return <Connect query={graphqlOperation(listToDos)}>
            {({data: {listToDos}, loading, errors}) => {
                if (loading || !listToDos) return (<Text>Loading...</Text>);
                return (<ListView todos={listToDos.items}/>);
            }}
        </Connect>
    }
}


const styles = StyleSheet.create({
    Todos: {
        width: "10%",
        paddingVertical: theme.SIZES.BASE,
        justifyContent: 'center'
    },
});

export default MyTodo;
