import React from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  AsyncStorage
} from 'react-native'
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Icon
} from 'native-base'
import call from 'react-native-phone-call'

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
      title: 'Profile'
    };

    render() {
      const args = {
        number: '9717953260', // String value with the number to call
        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
      }

      const { navigate } = this.props.navigation

      return (
        <Container style={styles.container}>
          <Content>
            <View style={styles.headerViewStyle}>
              <View style={styles.headerTextStyle}>
                <Text style={styles.nameStyle}>Anshul Mehta</Text>
                <Text note style={styles.buttonStyle}>
                                View Profile
                </Text>
              </View>
              <View>
                <Image
                  style={styles.thumbnailStyle}
                  source={{
                    uri:
                      'http://media.corporate-ir.net/media_files/IROL/17/176060/img/logos/amazon_logo_RGB.jpg'
                  }}
                />
              </View>
            </View>

            <List>
              <ListItem
                button
                onPress={() =>
                  navigate('MyWeb', {
                    uri:
                                        'https://github.com/facebook/react-native',
                    title: 'FAQs'
                  })
                }
              >
                <Text>FAQs</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => call(args).catch(console.error)}
              >
                <Text>Call Us</Text>
              </ListItem>
              <ListItem>
                <Text>Email</Text>
              </ListItem>
              <ListItem
                button
                onPress={() =>
                  navigate('MyWeb', {
                    uri:
                                        'https://github.com/facebook/react-native',
                    title: 'T&Cs'
                  })
                }
              >
                <Text>Terms and Conditons</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  thumbnailStyle: {
    resizeMode: 'contain',
    borderColor: '#ddd',
    borderWidth: 1,
    height: 80,
    width: 80
  },
  headerViewStyle: {
    padding: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nameStyle: {
    fontSize: 20
  },
  buttonStyle: {
    fontSize: 15
  }
})
