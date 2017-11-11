import React from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Icon, Form, Item, Input, Label } from 'native-base';
import { StyleSheet, Image, View, TabNavigator, ListView, ActivityIndicator, TouchableOpacity, AsyncStorage, Button } from 'react-native';
//import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
//import { ProgressDialog } from 'react-native-simple-dialogs';
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

  /*openProgress() {
        this.setState({ showProgress: true })

        setTimeout(
            () => this.setState({ showProgress: false }),
            2500
        );
    }*/

  onLoginPress = async () => {
    const resetActionLogin = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    });

      //this.openProgress();

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
            //console.log('here');
            alert('Wrong email/password');
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
              
              <TouchableOpacity onPress={this.onLoginPress}>
                <View style = {styles.loginButton}>
                  <Text style={styles.buttonText}>
                  Login
                  </Text>
                </View>
              </TouchableOpacity>
              {/*
                <View style = {styles.signupButton}>
                <Button
                  onPress={this.onLoginPress}
                  title="Login"
                  color="#2980b9"
                />
              </View>
              <Button 
                title="Login"
                color='white'
                backgroundColor='#2980b9'
                fontWeight='bold'
                borderRadius={10}
                buttonStyle = {styles.signupButton}
                onPress={this.onLoginPress}
              />
              <ProgressDialog
                visible={this.state.showProgress}
                message="Logging in..."
                activityIndicatorSize="large"
                activityIndicatorColor="black"
              />*/}
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
    marginTop: 44
  },
  loginButton: {
    marginTop: 44,
    width: 300,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#2980b9'  
   },
   buttonText: {
   color: '#fff',
   fontSize: 19,
   fontWeight: '200', 
   },

});