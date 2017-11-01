import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Body, Left, Right, Text } from 'native-base';

export default class MachinesScreen extends React.Component {
  static navigationOptions = {
    title: 'Machines',
  };

  render() {
    const { navigate } = this.props.navigation;
    var machines = [{"row":"A1","item_name":"Lays","item_price":"20","items_left":"3/9","date":"21/10"},
                    {"row":"A2","item_name":"Kurkure Masala","item_price":"10","items_left":"4/9","date":"21/10"},
                    {"row":"A3","item_name":"Haldiram Bhujia","item_price":"30","items_left":"5/12","date":"21/10"}];
    return (
      <Container style={styles.container}>
        <Content>
          <List dataArray={machines}
            renderRow={(machine) =>
              <ListItem>
                  <Text style={styles.lefttext}>{machine.row}</Text>
                <Body>
                    <Text style={styles.boldcolortext}>{machine.item_name}</Text>
                    <Text>Rs. {machine.item_price}</Text>
                </Body>
                <Right>
                  <Text style={styles.boldtext}>{machine.items_left}</Text>
                </Right>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boldcolortext:{
    fontWeight:'bold',
    color: '#3498db'
  },
  boldtext:{
    fontWeight:'bold',
  },
  lefttext:{
    fontWeight:'bold',
    fontSize: 30,
    color: '#2980b9'
  }
});
