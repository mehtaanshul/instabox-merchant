import React from 'react';
import { ScrollView, StyleSheet, View, Text} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Body, Left, Right, Badge } from 'native-base';


export default class OrdersScreen extends React.Component {
  static navigationOptions = {
    title: 'Orders',
  };

  render() {
    const { navigate } = this.props.navigation;
    var orders =   [{"order_id":"UB00201BC22","amount":"50","status":"paid","items_left":"3/9","date":"21 Sep 2017","time":"14:24"},
                    {"order_id":"UB00201BC30","amount":"100","status":"pending","items_left":"4/9","date":"21 Sep 2017","time":"14:24"},
                    {"order_id":"UB00201BC36","amount":"320","status":"declined","items_left":"5/12","date":"21 Sep 2017","time":"14:24"}];
    return (
      <Container style={styles.container}>
        <Content>
          <List dataArray={orders}
            renderRow={(order) =>
              <ListItem onPress={() => navigate('OrderDetails', { id: `${order.order_id}`})}>
              <View style={styles.view}>
                  <View style={styles.innerviewleft}>
                    <Text style={styles.boldtext}>{order.order_id}</Text>
                    <Text>{order.time} {order.date}</Text>
                  </View>

                  <View style={styles.innerviewright}>
                    <Text style={styles.boldtext}>Rs. {order.amount}</Text>
                    {
                          order.status == 'paid' ? (
                            <Badge style={{ backgroundColor: '#388e3c',width:80,justifyContent: 'center'}}>
                              <Text style={{ color: 'white',textAlign: 'center'}}>Paid</Text>
                            </Badge>
                            )
                            :
                            (
                            order.status == 'pending' ? (
                            <Badge style={{ backgroundColor: '#f39c12',width:80,justifyContent: 'center'}}>
                              <Text style={{ color: 'white',textAlign: 'center'}}>Pending</Text>
                            </Badge>
                            )
                            :
                            (
                            <Badge style={{ backgroundColor: '#ef5350',width:80, justifyContent: 'center' }}>
                              <Text style={{ color: 'white',textAlign: 'center' }}>Declined</Text>
                            </Badge>
                            )
                            )
                    }
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
    paddingTop: 15,
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
  },
  view: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'stretch' 
  },
  innerviewleft: {
    flexDirection:'column',
    justifyContent: 'space-around',
  },
  innerviewright: {
    flexDirection:'column',
    justifyContent: 'space-around',
    alignItems: 'center', 
  },
  boldtext:{
    fontWeight:'bold',
  }
});
