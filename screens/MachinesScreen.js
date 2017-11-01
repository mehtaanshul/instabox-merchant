import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Body } from 'native-base';

export default class MachinesScreen extends React.Component {
  static navigationOptions = {
    title: 'Machines',
  };

  render() {

    var machines = [{"id":"1","location":"Hostel A","company":"Thapar University","items_left":"150/240","date":"21/10"},
                    {"id":"2","location":"Cos","company":"Thapar University","items_left":"100/400","date":"21/10"},
                    {"id":"3","location":"Hostel J","company":"Thapar University","items_left":"50/300","date":"21/10"}];
    return (
      <Container style={styles.container}>
        <Content>
          <List dataArray={machines}
            renderRow={(machine) =>
              <ListItem>
               <View style={styles.view}>
                  <View>
                    <Text style={styles.boldtext}>Machine ID: {machine.id}</Text>
                    <Text>{machine.location}</Text>
                    <Text>{machine.company}</Text>
                  </View>
                  <View style={styles.innerview}>
                    <Text style={styles.boldtext}>{machine.items_left} items left</Text>
                    <Text>{machine.date} next refilling</Text>
                  </View>
                </View>
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
  view: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  innerview: {
    flexDirection:'column',
    justifyContent: 'center',
  },
  boldtext:{
    fontWeight:'bold',
  }
});
