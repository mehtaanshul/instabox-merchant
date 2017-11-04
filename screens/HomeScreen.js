import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppRegistry,
} from 'react-native';
/*import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

const data = [
  {day: 'Mon', earnings: 1300},
  {day: 'Tue', earnings: 1650},
  {day: 'Wed', earnings: 1425},
  {day: 'Thu', earnings: 1200},
  {day: 'Fri', earnings: 800},
  {day: 'Sat', earnings: 1600},
  {day: 'Sun', earnings: 1900},
];
*/
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
  return (
     <View style={styles.container}>
        {/*<VictoryChart
          domainPadding={20}
          height={250}
        >
          <VictoryBar
            style={{ data: {fill: "#3498db"} }}
            data={data}
            x="day"
            y="earnings"
          />
        </VictoryChart>*/}
        <Text>
          Welcome123 Admin.
        </Text>
      </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
