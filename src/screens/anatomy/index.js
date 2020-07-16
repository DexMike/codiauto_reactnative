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
  Toast,
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
import CodiService from "../../services/CodiService";
import styles from "./styles";
import { moneyFormatter } from "../../utils";
import { GoogleSignin } from "react-native-google-signin";
import AuthPaymentService from "../../services/AuthPaymentService";

class SetupPhone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qty: 0,
      imgData: "",
      authUserUid: "",
      clientUid: "",
      defaultPayment: {},
      // user data
      authUserToken: "",
      success: false,
       // set only if operation succeeds
    };

    this.generateQr = this.generateQr.bind(this);
    this.signOut = this.signOut.bind(this);
    this.completePayment = this.completePayment.bind(this);
    this.reset = this.reset.bind(this);
  }

  async componentDidMount() {
    console.log(51, "||**************************||");
    const payment = await AsyncStorage.getItem("defaultPayment") || {};
    const paymentData = JSON.parse(payment);
    await this.setUserData();
    this.setPaymentData(paymentData);
  }

  async setUserData() {
    const authUserUid = await AsyncStorage.getItem("authUserUid") || "";
    const clientUid = await AsyncStorage.getItem("clientUid") || "";
    const authUserToken = await AsyncStorage.getItem("token") || "";
    this.setState({
      authUserUid,
      clientUid,
      authUserToken
    }, function done() {
      console.log(54, "USER INFO LOCALLY SET!", this.state.authUserUid);
    });
  }

  setPaymentData(data) {
    this.setState({
      defaultPayment: data
    }, function done() {
      console.log(70, "Payment data is locally set", this.state.defaultPayment);
    });
  }

  signOut = async () => {
    console.log(58, ">>LOGOUT...");
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({
        authUserUid: "",
        clientUid: ""
      }, function done() {
        this.props.navigation.navigate("Home");
      });
    } catch (error) {
      console.error(error);
    }
  };

  // This will be removed when we have a real CoDi connection
  async completePayment() {
    console.log(100, "Trying to complete payment...");
    const { defaultPayment, authUserUid, clientUid, qty } = this.state;
    const data = {
      authUserUid: authUserUid,
      paymentUid: defaultPayment.uid,
      clientUid: clientUid,
      amount: qty
    };
    try {
      const paymentComplete = await AuthPaymentService.setPayment(data);
      console.log(108, ">>>PAGO COMPLETO!!!", paymentComplete);
      this.setState({
        success: true
      }, function done() {
        console.log(114, this.state.success);
      });
    } catch (e) {
      console.log(113, ">>>ERROR EN PAGO!!!", e);
      Toast.show({
        text: "Wrong password!",
        buttonText: "Okay"
      });
    }
  }

  setQty(value) {
    // Have to convert the string back to number, this looks ugly AF
    if (value === undefined) {
      value = 0;
    }
    let val = parseFloat(value);
    if (isNaN(val)){
      val = 0;
    }

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
    const { qty, defaultPayment, clientUid, authUserToken, authUserUid } = this.state;

    const codiRquestData = {
      clientUid,
      authUserToken,
      authUserUid,
      amount	: qty.toString()
    };
    const newCodi = await CodiService.simpleCodi(codiRquestData);

    // If the info is blank, take the user back to th login screen
    if (authUserUid === "" || clientUid === "") {
      this.props.navigation.navigate("Home");
    }

    if (qty !== 0) {
      this.setState({
        imgData: newCodi.codi,
        defaultPaymentTitle: defaultPayment.name
      });
    }
    return false;
  }

  reset() {
    this.setState({
      qty: 0,
      imgData: "",
      success: false
    });
  }

  renderQR() {
    const { imgData, qty, defaultPaymentTitle, success } = this.state;
    if (imgData !== "" && !success) {
      return (
        <React.Fragment>
          <View>
            <Image
              style={{ width: 300, height: 300 }}
              // resizeMode="contain"
              source={{ uri: imgData }}
              onError={ ({ nativeEvent: {error} }) => console.log(61, error) }
            />
            <Text>
            <Text padder>
                Codi generado por
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                {moneyFormatter(qty)}
              </Text>
              <Text padder>
                &nbsp;pesos
              </Text>
            </Text>
            <Text>
              {defaultPaymentTitle}
            </Text>
            <Button
              style={{ backgroundColor: "#e7e2e2" }}
              onPress={this.completePayment}
            >
              <Text
                style={{ color: "#646778" }}
              >
                XD
              </Text>
            </Button>
          </View>
        </React.Fragment>
      );
    }
    return false;
  }

  renderSuccess() {
    const { success } = this.state;
    if (success) {
      return (
        <React.Fragment>
          <Image
            style={{ width: 300, height: 300 }}
            // resizeMode="contain"
            source={require("../../../assets/success.gif")}
            onError={ ({ nativeEvent: {error} }) => console.log(217, error) }
          />
          <Text>
            ¡El pago se completó con éxito!
          </Text>
          <Button
            style={{ backgroundColor: "#e7e2e2" }}
            onPress={this.reset}
          >
            <Text
              style={{ color: "#646778" }}
            >
              Generar nuevo CoDi
            </Text>
          </Button>
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
          {/* <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left> */}
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
