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
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.id}`
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            order: {}
        };
    }

    componentDidMount = async () => {
        let token = await AsyncStorage.getItem("token");
        fetch(
            `http://api.mysnackbox.co/order/${
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
                        order: responseJson.data
                    },
                    function() {}
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
        var orderdetails = [
            {
                item_name: "Lays",
                price: "10",
                quantity: "2",
                total_price: "20",
                date: "21/10"
            },
            {
                item_name: "Doritos",
                price: "20",
                quantity: "3",
                total_price: "60",
                date: "21/10"
            },
            {
                item_name: "Kurkure",
                price: "15",
                quantity: "1",
                total_price: "15",
                date: "21/10"
            }
        ];
        return (
            <Container style={styles.container}>
                <Content>
                    <List
                        dataArray={this.state.order}
                        renderRow={order => (
                            <ListItem>
                                <View style={styles.view}>
                                    <View>
                                        <Text style={styles.boldtext}>
                                            {order.name}
                                        </Text>
                                        <Text>Rs. {order.price}</Text>
                                    </View>
                                    <View style={styles.innerview}>
                                        <Text style={styles.boldtext}>
                                            {order.quantity} Rs.{order.price}
                                        </Text>
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
