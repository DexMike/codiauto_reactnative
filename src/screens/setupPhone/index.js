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
import { validateEmail } from "../../utils";
import { func } from "prop-types";
// import { util } from "prettier";
// import { moneyFormatter } from "../../utils";
// import { GoogleSignin } from "react-native-google-signin";
// import AuthPaymentService from "../../services/AuthPaymentService";

class SetupPhone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: "",
      email: "",
      success: false
    };


    this.setPhone = this.setPhone.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.gotoPasswordPage = this.gotoPasswordPage.bind(this);
  }

  async componentDidMount() {
    console.log(51, "||**************************||");
  }

  setSuccess() {
    let goodPhone = false;
    let goodEmail = false;

    const { email, phone } = this.state;
    if (phone.toString().length === 10 && /^\d+$/.test(phone)) {
      goodPhone = true;
      AsyncStorage.setItem("userReqInfo_phone", phone.toString());
    }

    if (validateEmail(email)) {
      goodEmail = true;
      AsyncStorage.setItem("userReqInfo_email", email.toString());
    }

    if (goodEmail && goodPhone){
      console.log(137, "BTOH CHECKED OUT!");
      this.setState({
        success: true
      });
    }
  }

  setPhone(value) {
    this.setState({
      phone: value
    }, function () {
      this.setSuccess();
    });
  }

  setEmail(value) {
    this.setState({
      email: value
    }, function () {
      this.setSuccess();
    });
  }

  gotoPasswordPage() {
    this.props.navigation.navigate("SetupPassword");
  }

  renderSuccess() {
    const { success } = this.state;
    if (success) {
      return (
        <React.Fragment>
          <Text>
            Las contraseñas coinciden
          </Text>
          <Button
            style={{ backgroundColor: "#e7e2e2" }}
            onPress={this.gotoPasswordPage}
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
          <Row size={6} style={{ backgroundColor: "#FFF" }}>
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
                <Item>
                  <Input
                    placeholder="Dirección de email"
                    keyboardType="email-address"
                    onChangeText={ (value) => this.setEmail(value) }
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
          <Row size={4} style={{
            backgroundColor: "#CCC",
            margin: "auto"
          }}>
            <Content padder>
              <Card style={styles.mb}>
                <CardItem>
                  <Body>
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
