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

import { GoogleSignin } from "react-native-google-signin";

// function isFloat(n){
//   return Number(n) === n && n % 1 !== 0;
// }

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
    this.signOut = this.signOut.bind(this);
  }

  async componentDidMount() {
    console.log(51, "||**************************||");
    // await GoogleSignin.configure({
    //   // TODO -> Move this to the env file
    //   // webClientId:"100013698037-sbd0alfo3dhk1vpbsbl2gsa98em2l59u.apps.googleusercontent.com",// android
    //   webClientId:"100013698037-n715sp0152lhaf2mcqpi11d9r0pbutc9.apps.googleusercontent.com",// web
    //   offlineAccess: true
    // });
    // this.resetQty();
    // this.getUserData();
  }

  signOut = async () => {
    console.log(58, ">>LOGOUT...");
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({
        authuserUid: "",
        clientUid: ""
      }, function done() {
        this.props.navigation.navigate("Home");
      });
    } catch (error) {
      console.error(error);
    }
  };

  // resetQty() {
  //   console.log(75, "<<-------------------------->>");
  //   this.setState({
  //     qty: 0,
  //     imgData: ""
  //   });
  // }

  // async getUserData() {

  //   let authuserUid = "";
  //   let clientUid = "";
  //   try {
  //     authuserUid = await AsyncStorage.getItem("authuserUid") || "";
  //     clientUid = await AsyncStorage.getItem("clientUid") || "";

  //     // If the info is blank, take the user back to th login screen
  //     if (authuserUid === "" || clientUid === "") {
  //       this.props.navigation.navigate("Home");
  //     }

  //     this.setState({
  //       authuserUid,
  //       clientUid
  //     });
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //   }
  // }

  setQty(value) {
    // Have to convert the string back to number, this looks ugly AF
    if (value === undefined) {
      value = 0;
    }
    let val = parseFloat(value);
    if (isNaN(val)){
      val = 0;
    }

    ////////////////////////
    /////// BIG TODO //////
    ///////////////////////
    // Falla cuando se resetea a cero

    // TODO move this constant to env variable
    if (val > 8000) {
      val = 8000;
    }
    this.setState({
      qty: val,
      imgData: ""
    });
  }

  async generateQr() {
    const { qty } = this.state;
    const authuserUid = await AsyncStorage.getItem("authuserUid") || "";
    const clientUid = await AsyncStorage.getItem("clientUid") || "";

    // TODO: add a random param, so that it won't cache
    const url = `http://10.0.2.2:3000/centerprise/${clientUid}/poijpokpo/${authuserUid}/${qty}`;
    console.log(135, typeof qty, qty, url);
    // If the info is blank, take the user back to th login screen
    if (authuserUid === "" || clientUid === "") {
      this.props.navigation.navigate("Home");
    }

    if (qty !== 0) {
      this.setState({
        imgData: url
      });
    }
    return false;
  }

  renderQR() {
    const { imgData, qty } = this.state;
    if (imgData !== "") {
      return (
        <React.Fragment>
          <View>
            <Image
              style={{ width: 300, height: 300 }}
              // resizeMode="contain"
              source={{ uri: imgData }}
              onError={ ({ nativeEvent: {error} }) => console.log(61, error) }
            />

            <Text padder>
              Codi generado por ${qty} pesos
            </Text>
          </View>
        </React.Fragment>
      );
    }
    return false;
  }

  render() {
    const { qty } = this.state;
    // const realQty = qty.toString();
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Title>CoDi</Title>
          </Left>
          <Right>
            <Button
              style={{ backgroundColor: "#e7e2e2" }}
              onPress={this.signOut}
            >
              <Text
                style={{ color: "#646778" }}
              >
                Cerrar sesión
              </Text>
            </Button>
          </Right>
        </Header>

        <Grid>
          {/* <Row size={1} style={{ backgroundColor: "#FFF" }}>
            <Content padder>
              <Text>Introduzca la cantidad en pesos</Text>
            </Content>
          </Row> */}
          <Row size={2} style={{ backgroundColor: "#FFF" }}>
            <Content padder>
              <Form>
                <Item>
                  <Input
                    placeholder="Cantidad en pesos"
                    keyboardType="number-pad"
                    onChangeText={ (value) => this.setQty(value) }
                    // value={realQty}
                    // onEndEditing={this.endedEdit}
                    onEndEditing={this.generateQr}
                    // textContentType="oneTimeCode"
                    // defaultValue="0"
                  />
                </Item>
              </Form>
              {/* <Button
                block style={{ margin: 15, marginTop: 12 }}
                onPress={this.generateQr}
              >
                <Text>Generar ahora</Text>
              </Button> */}
            </Content>
          </Row>
          <Row size={8} style={{ backgroundColor: "#CCC" }}>
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
