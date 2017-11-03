import React from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Icon, Form, Item, Input, Label } from 'native-base';
import { StyleSheet, Image, View, TabNavigator, ListView, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
export default class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
  }
 
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        email: '',
        password: '',
        auth:{}
    }
  }

  onLoginPress = async () => {
    const resetActionLogin = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    });

      fetch('http://api.mysnackbox.co/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          auth: responseJson
        }, function() {
         // console.log(this.state.auth);
          if(this.state.auth.registered === true){
            AsyncStorage.setItem("token",this.state.auth.token);
            this.props.navigation.dispatch(resetActionLogin);
          }
          else{
            console.log('here');
          }
        });
      });
  }

render() {
    const { navigate } = this.props.navigation;

    return (
        <Container style={styles.container}>
            <Content>
              <Image
               style={styles.imageStyle}
               source={require('../assets/images/splash.png')}
              />
              <Form>
                <Item fixedLabel>
                  <Label>Username</Label>
                  <Input
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}/>
                </Item>
                <Item fixedLabel last>
                  <Label>Password</Label>
                  <Input 
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}/>
                </Item>
              </Form>
              <Button 
                title="Login"
                color='white'
                backgroundColor='#2980b9'
                fontWeight='bold'
                borderRadius={10}
                buttonStyle = {styles.signupButton}
                onPress={this.onLoginPress}
              />
             </Content>
         </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: 300,
    width: 200,
    alignSelf:'center',
  },
  signupButton: {
    marginTop: 44,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
});