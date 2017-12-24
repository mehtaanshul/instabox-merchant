import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
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
    Body
} from "native-base";

export default class MachinesScreen extends React.Component {
    static navigationOptions = {
        title: "Machines"
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            machines: {}
        };
    }

    componentDidMount = async () => {
        let token = await AsyncStorage.getItem("token");
        fetch("http://api.mysnackbox.co/api/machines", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                Host: "api.mysnackbox.co"
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false,
                        machines: responseJson.data
                    },
                    function() {
                        console.log(this.state.machines);
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
        /*var machines = [{"id":"1","location":"Hostel A","company":"Thapar University","items_left":"150/240","date":"21/10"},
                    {"id":"2","location":"Cos","company":"Thapar University","items_left":"100/400","date":"21/10"},
                    {"id":"3","location":"Hostel J","company":"Thapar University","items_left":"50/300","date":"21/10"}];*/
        return (
            <Container style={styles.container}>
                <Content>
                    <List
                        dataArray={this.state.machines}
                        renderRow={machine => (
                            <ListItem
                                onPress={() =>
                                    navigate("MachineDetails", {
                                        id: `${machine.id}`
                                    })
                                }
                            >
                                <View style={styles.view}>
                                    <View>
                                        <Text style={styles.boldtext}>
                                            Machine ID: {machine.id}
                                        </Text>
                                        <Text>{machine.area}</Text>
                                        <Text>{machine.city}</Text>
                                    </View>
                                    <View style={styles.innerview}>
                                        <Text style={styles.boldtext}>
                                            {machine.left_units}/{
                                                machine.tot_units
                                            }{" "}
                                            items left
                                        </Text>
                                        <Text>{machine.date} 21/10 </Text>
                                    </View>
                                </View>
                            </ListItem>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    view: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    innerview: {
        flexDirection: "column",
        justifyContent: "center"
    },
    boldtext: {
        fontWeight: "bold"
    }
});
