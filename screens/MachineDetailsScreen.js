import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
    AsyncStorage
} from "react-native";
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Thumbnail,
    Body,
    Left,
    Right,
    Text
} from "native-base";

export default class MachineDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.id}`
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            machineItems: {}
        };
    }

    componentDidMount = async () => {
        let token = await AsyncStorage.getItem("token");
        fetch(
            `http://api.mysnackbox.co/api/machine/${
                this.props.navigation.state.params.id
            }`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                    Host: "api.mysnackbox.co"
                }
            }
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false,
                        machineItems: responseJson.data
                    },
                    function() {
                        console.log(this.state.machineItems);
                    }
                );
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        const { navigate } = this.props.navigation;
        /*
            var machines = [{"row":"A1","item_name":"Lays","item_price":"20","items_left":"3/9","date":"21/10"},
                            {"row":"A2","item_name":"Kurkure Masala","item_price":"10","items_left":"4/9","date":"21/10"},
                            {"row":"A3","item_name":"Haldiram Bhujia","item_price":"30","items_left":"5/12","date":"21/10"}];*/
        return (
            <Container style={styles.container}>
                <Content>
                    <List
                        dataArray={this.state.machineItems}
                        renderRow={machine => (
                            <ListItem>
                                <Text style={styles.lefttext}>
                                    {" "}
                                    {machine.row_tag}{" "}
                                </Text>{" "}
                                <Body>
                                    <Text style={styles.boldcolortext}>
                                        {" "}
                                        {machine.name}{" "}
                                    </Text>{" "}
                                    <Text> Rs. {machine.price} </Text>{" "}
                                </Body>{" "}
                                <Right>
                                    <Text style={styles.boldtext}>
                                        {" "}
                                        {machine.left_units}
                                        /{machine.tot_units}
                                    </Text>
                                </Right>{" "}
                            </ListItem>
                        )}
                    />{" "}
                </Content>{" "}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    boldcolortext: {
        fontWeight: "bold",
        color: "#3498db"
    },
    boldtext: {
        fontWeight: "bold"
    },
    lefttext: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#2980b9"
    }
});
