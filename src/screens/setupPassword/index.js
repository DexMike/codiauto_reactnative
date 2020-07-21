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
import { validatePasswordConfirm } from "../../utils";
// import { func } from "prop-types";
// import { util } from "prettier";
// import { moneyFormatter } from "../../utils";
// import { GoogleSignin } from "react-native-google-signin";
// import AuthPaymentService from "../../services/AuthPaymentService";

class SetupPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      passwordConfirm: "",
      success: false
    };

    this.setPassword = this.setPassword.bind(this);
    this.setPasswordConfirm = this.setPasswordConfirm.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
  }

  async componentDidMount() {
    console.log(51, "||************** SETUP PASSWORD ************||");
  }

  setSuccess() {
    const { passwordConfirm, password } = this.state;
    if (password === passwordConfirm && password.length >= 6){
      AsyncStorage.setItem("userReqInfo_password", password);
      this.setState({
        success: true
      });
    }
  }

  setPassword(value) {
    this.setState({
      password: value
    }, function () {
      this.setSuccess();
    });
  }

  setPasswordConfirm(value) {
    this.setState({
      passwordConfirm: value
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
            Número de celular e passwordConfirm correctos!
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
        </Header>
        <Grid>
          <Row size={6} style={{ backgroundColor: "#FFF" }}>
            <Content padder>
              <Text>
                Escriba una contraseña de al menos seis caracteres
              </Text>
              <Form>
                <Item>
                  <Input
                    placeholder="Contraseña"
                    keyboardType="visible-password"
                    onChangeText={ (value) => this.setPassword(value) }
                  />
                </Item>
                <Item>
                  <Input
                    placeholder="Confirmaci[on de contraseña"
                    keyboardType="visible-password"
                    onChangeText={ (value) => this.setPasswordConfirm(value) }
                  />
                </Item>
              </Form>
            </Content>
          </Row>
          <Row size={4} style={{ backgroundColor: "#CCC" }}>
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

export default SetupPassword;
