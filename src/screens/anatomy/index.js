import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  // Footer,
  // FooterTab,
  Left,
  Right,
  Body,
  Card,
  Form,
  Item,
  CardItem,
  Input
} from "native-base";
import { View, Image } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import AsyncStorage from "@react-native-community/async-storage";
// import CodiService from "../../services/CodiService";
import styles from "./styles";

class Anatomy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qty: 0,
      created: false,
      imgData: "",
      authuserUid: "",
      clientUid: ""
    };

    this.generateQr = this.generateQr.bind(this);
  }

  componentDidMount() {
    this.resetQty();
    this.getUserData();
  }

  resetQty() {
    this.setState({
      qty: 0
    });
  }

  async getUserData() {

    let authuserUid = "";
    let clientUid = "";
    try {
      authuserUid = await AsyncStorage.getItem("authuserUid") || "";
      clientUid = await AsyncStorage.getItem("clientUid") || "";
      this.setState({
        authuserUid,
        clientUid
      });
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  setQty(value) {
    console.log("Anatomy -> setQty -> value", value);
    let realValue = parseFloat(value);

    // TODO move this constant to env variable
    if (realValue > 8000) {
      realValue = 8000;
    }
    this.setState({
      qty: realValue
    });
  }

  async generateQr() {
    const { qty, authuserUid, clientUid } = this.state;
    console.log("Anatomy -> generateQr -> qty", qty);
    if (qty !== 0) {
      this.setState({
        imgData: `http://10.0.2.2:3000/centerprise/${clientUid}/poijpokpo/${authuserUid}/${qty}`
      });
    }
    return false;
  }

  renderQR() {
    const { imgData } = this.state;
    if (imgData !== "") {
      console.log(56, imgData);
      return (
        <React.Fragment>
          <View>
            <Image
              style={{ width: 300, height: 300 }}
              // resizeMode="contain"
              source={{ uri: imgData }}
              onError={ ({ nativeEvent: {error} }) => console.log(61, error) }
            />
          </View>
        </React.Fragment>
      );
    }
    return false;
  }

  render() {
    const { qty } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          {/* <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left> */}
          <Body>
            <Title>Generador</Title>
          </Body>
          <Right />
        </Header>

        <Grid>
          {/* <Row size={1} style={{ backgroundColor: "#FFF" }}>
            <Content padder>
              <Text>Introduzca la cantidad en pesos</Text>
            </Content>
          </Row> */}
          <Row size={3} style={{ backgroundColor: "#FFF" }}>
            <Content padder>
            <Text>Introduzca la cantidad en pesos</Text>
            <Form>
                <Item>
                  <Input
                    placeholder="Cantidad en pesos"
                    keyboardType="number-pad"
                    onChangeText={ (value) => this.setQty(value) }
                    value={qty}
                    textContentType="oneTimeCode"
                  />
                </Item>
                {/* <Item last>
                  <Input placeholder="Password" secureTextEntry />
                </Item> */}
              </Form>
              <Button
                block style={{ margin: 15, marginTop: 12 }}
                onPress={this.generateQr}
              >
                <Text>Generar CoDi</Text>
              </Button>
            </Content>
          </Row>
          <Row size={7} style={{ backgroundColor: "#CCC" }}>
            <Content padder>
              <Card style={styles.mb}>
                <CardItem>
                  <Body>
                    { this.renderQR() }
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Row>
        </Grid>

        {/* <Footer>
          <FooterTab>
            <Button active full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}

export default Anatomy;
