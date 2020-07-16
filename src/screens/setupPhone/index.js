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
  // Toast,
  Left,
  Right,
  Body,
  Card,
  Form,
  Item,
  CardItem,
  Input
} from "native-base";
// import { View, Image } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import AsyncStorage from "@react-native-community/async-storage";
// import CodiService from "../../services/CodiService";
import styles from "../home/styles";
// import { moneyFormatter } from "../../utils";
// import { GoogleSignin } from "react-native-google-signin";
// import AuthPaymentService from "../../services/AuthPaymentService";

class SetupPhone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: "",
      success: false
    };

    // this.generateQr = this.generateQr.bind(this);
    // this.signOut = this.signOut.bind(this);
    // this.completePayment = this.completePayment.bind(this);
    // this.reset = this.reset.bind(this);
  }

  async componentDidMount() {
    console.log(51, "||**************************||");
    // const payment = await AsyncStorage.getItem("defaultPayment") || {};
    // const paymentData = JSON.parse(payment);
    // await this.setUserData();
    // this.setPaymentData(paymentData);
  }

  // async setUserData() {
  //   const authUserUid = await AsyncStorage.getItem("authUserUid") || "";
  //   const clientUid = await AsyncStorage.getItem("clientUid") || "";
  //   const authUserToken = await AsyncStorage.getItem("token") || "";
  //   this.setState({
  //     authUserUid,
  //     clientUid,
  //     authUserToken
  //   }, function done() {
  //     console.log(54, "USER INFO LOCALLY SET!", this.state.authUserUid);
  //   });
  // }

  // setPaymentData(data) {
  //   this.setState({
  //     defaultPayment: data
  //   }, function done() {
  //     console.log(70, "Payment data is locally set", this.state.defaultPayment);
  //   });
  // }

  // signOut = async () => {
  //   console.log(58, ">>LOGOUT...");
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     this.setState({
  //       authUserUid: "",
  //       clientUid: ""
  //     }, function done() {
  //       this.props.navigation.navigate("Home");
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // This will be removed when we have a real CoDi connection
  // async completePayment() {
  //   console.log(100, "Trying to complete payment...");
  //   const { defaultPayment, authUserUid, clientUid, qty } = this.state;
  //   const data = {
  //     authUserUid: authUserUid,
  //     paymentUid: defaultPayment.uid,
  //     clientUid: clientUid,
  //     amount: qty
  //   };
  //   try {
  //     const paymentComplete = await AuthPaymentService.setPayment(data);
  //     console.log(108, ">>>PAGO COMPLETO!!!", paymentComplete);
  //     this.setState({
  //       success: true
  //     }, function done() {
  //       console.log(114, this.state.success);
  //     });
  //   } catch (e) {
  //     console.log(113, ">>>ERROR EN PAGO!!!", e);
  //     Toast.show({
  //       text: "Wrong password!",
  //       buttonText: "Okay"
  //     });
  //   }
  // }

  setPhone(value) {
    // Have to convert the string back to number, this looks ugly AF
    // TODO -> Verify the ten digit number
    let goodPhone = false;
    if (value.toString().length === 10) {
      goodPhone = true;
      AsyncStorage.setItem("userReqInfo_phone", value.toString());
    }
    this.setState({
      phone: value,
      success: goodPhone
    });
  }

  renderSuccess() {
    const { success } = this.state;
    if (success) {
      return (
        <React.Fragment>
          <Text>
            Número correcto
          </Text>
          <Button
            style={{ backgroundColor: "#e7e2e2" }}
            onPress={this.reset}
          >
            <Text
              style={{ color: "#646778" }}
            >
              Continuar
            </Text>
          </Button>
        </React.Fragment>
      );
    }
    return false;
  }

  render() {
    // const { qty } = this.state;
    // const realQty = qty.toString();
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Left>
            <Title>CoDi</Title>
          </Left>
          {/* <Right>
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
          </Right> */}
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
                    placeholder="Número de teléfono 10 dígitos"
                    keyboardType="number-pad"
                    onChangeText={ (value) => this.setPhone(value) }
                    // value={realQty}
                    // onEndEditing={this.endedEdit}
                    // onEndEditing={this.generateQr}
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
                    {/* { this.renderQR() } */}
                    { this.renderSuccess() }
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

export default SetupPhone;
