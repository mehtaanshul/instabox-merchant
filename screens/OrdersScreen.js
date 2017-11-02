import React from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Body, Left, Right, Badge, Picker, Form, Item as FormItem } from 'native-base';

const Item = Picker.Item;

export default class OrdersScreen extends React.Component {
  static navigationOptions = {
    title: 'Orders',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      orders:{},
      machines:{},
      selected1:"key1",
    }
  }

  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }

  componentDidMount = async () => {
    /*let token = await AsyncStorage.getItem('token');*/

    fetch('http://api.mysnackbox.co/machines',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDk2MjU5ODcsImV4cCI6MTUxMjIxNzk4NywiaWQiOm51bGwsImVtYWlsIjoibGFrc2hpdDEwMDFAeW1haWwuY29tIn0.0vsc2jMGeaK25MV02ERjCblv23b65SLmuAslfYYiT-c',
          'Host': 'api.mysnackbox.co'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          machines: responseJson.data,
          
        }, function() {
          console.log(this.state.machines)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  

    fetch('http://api.mysnackbox.co/orders',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDk2MjU5ODcsImV4cCI6MTUxMjIxNzk4NywiaWQiOm51bGwsImVtYWlsIjoibGFrc2hpdDEwMDFAeW1haWwuY29tIn0.0vsc2jMGeaK25MV02ERjCblv23b65SLmuAslfYYiT-c',
          'Host': 'api.mysnackbox.co'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          orders: responseJson.data,
          
        }, function() {
          console.log(this.state.machineItems)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    const { navigate } = this.props.navigation;
    /*var orders =   [{"order_id":"UB00201BC22","amount":"50","status":"paid","items_left":"3/9","date":"21 Sep 2017","time":"14:24"},
                    {"order_id":"UB00201BC30","amount":"100","status":"pending","items_left":"4/9","date":"21 Sep 2017","time":"14:24"},
                    {"order_id":"UB00201BC36","amount":"320","status":"declined","items_left":"5/12","date":"21 Sep 2017","time":"14:24"}];*/
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="Wallet" value="key0" />
              <Item label="ATM Card" value="key1" />
              <Item label="Debit Card" value="key2" />
              <Item label="Credit Card" value="key3" />
              <Item label="Net Banking" value="key4" />
            </Picker>
          </Form>
          <List dataArray={this.state.orders}
            renderRow={(order) =>
              <ListItem onPress={() => navigate('OrderDetails', { id: `${order.id}`,price: `${order.price}`,quantity: `${order.quantity}`, time: `${order.time}`})}>
              <View style={styles.view}>
                  <View style={styles.innerviewleft}>
                    <Text style={styles.boldtext}>{order.id}</Text>
                    <Text>{order.time}</Text>
                  </View>

                  <View style={styles.innerviewright}>
                    <Text style={styles.boldtext}>Rs. {order.price}</Text>
                    {
                          order.status == 'Paid' ? (
                            <Badge style={{ backgroundColor: '#388e3c',width:80,justifyContent: 'center'}}>
                              <Text style={{ color: 'white',textAlign: 'center'}}>Paid</Text>
                            </Badge>
                            )
                            :
                            (
                            order.status == 'Pending' ? (
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
