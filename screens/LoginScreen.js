import React from 'react';
import Expo from 'expo';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Icon } from 'native-base';
import { StyleSheet, Image, View, TabNavigator, ListView, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import {
    Dialog,
    ProgressDialog,
    ConfirmDialog,
} from 'react-native-simple-dialogs'

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
        auth:{},
        isLoading: false,
    }
  }

    state = {}

    openDialog(show) {
        this.setState({ showDialog: show })
    }

    openConfirm(show) {
        this.setState({ showConfirm: show })
    }

    openProgress() {
        this.setState({ showProgress: true })

        setTimeout(
            () => this.setState({ showProgress: false }),
            2500
        );
    }

    optionYes() {
        this.openConfirm(false);
        // Yes, this is a workaround :(
        // Why? See this https://github.com/facebook/react-native/issues/10471
        setTimeout(() => alert("Yes touched!"), 100);
    }

    optionNo() {
        this.openConfirm(false);
        // Yes, this is a workaround :(
        // Why? See this https://github.com/facebook/react-native/issues/10471
        setTimeout(() => alert("No touched!"), 100);
}
render() {
    const { navigate } = this.props.navigation;

    return (
        <Container style={styles.container}>
            <Content>
                <Image
                 style={styles.imageStyle}
                 source={require('../assets/images/YOUAREF.png')}
                />
                <TouchableOpacity onPress={this.onLoginPress}> 
                    <Image 
                     style={styles.buttonImageStyle} 
                     source={require('../assets/images/google.png')} 
                    /> 
                </TouchableOpacity>

            <ProgressDialog
              visible={this.state.showProgress}
              message="Logging in..."
              activityIndicatorSize="large"
              activityIndicatorColor="black"
            />
             </Content>
         </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fad30a',
  },
  imageStyle: {
    height: 300,
    width: 200,
    alignSelf:'center',
    marginTop:96,
  },
  buttonImageStyle: {
    height: 50,
    width: 200,
    alignSelf:'center',
    marginTop:24,
  },
});