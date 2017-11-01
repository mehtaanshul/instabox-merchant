import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Body } from 'native-base';

export default class MachinesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.id}`,
  })

  render() {
    const { navigate } = this.props.navigation;
    var orderdetails = [{"item_name":"Lays","price":"10","quantity":"2","total_price":"20","date":"21/10"},
                        {"item_name":"Doritos","price":"20","quantity":"3","total_price":"60","date":"21/10"},
                        {"item_name":"Kurkure","price":"15","quantity":"1","total_price":"15","date":"21/10"}];
    return (
      <Container style={styles.container}>
        <Content>
          <List dataArray={orderdetails}
            renderRow={(order) =>
              <ListItem>
               <View style={styles.view}>
                  <View>
                    <Text style={styles.boldtext}>{order.item_name}</Text>
                    <Text>Rs. {order.price}</Text>
                  </View>
                  <View style={styles.innerview}>
                    <Text style={styles.boldtext}>{order.quantity}        Rs.{order.total_price}</Text>
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
