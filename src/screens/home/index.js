import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logoTemp.png");

import { GoogleSignin, statusCodes, GoogleSigninButton } from "react-native-google-signin";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    };

    // this.generateQr = this.generateQr.bind(this);
  }

  async componentDidMount() {
    await GoogleSignin.configure({
      // TODO -> Move this to the env file
      // webClientId:"100013698037-sbd0alfo3dhk1vpbsbl2gsa98em2l59u.apps.googleusercontent.com",// android
      webClientId:"100013698037-n715sp0152lhaf2mcqpi11d9r0pbutc9.apps.googleusercontent.com",// web
      offlineAccess: true
    });
  }

  signIn = async () => {
    try {
      // await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(27, "Home -> signIn -> userInfo", userInfo);

      //if login is correct, let's check what's the id of the user and retrieve the clientUid
      //for now it's only dummy

      // TODO -> move this to a sls call
      //AQUI ME QUEDO, YA ESTA EL LOGIN EN EL BACKEND, HAY QUE PROBARLO
      const authuserUid = "9310a771-0508-44bd-9f28-9e15a155102f";
      const clientUid = "edf41109-b5bd-42ea-99d3-90473ebe05b7";

      if (authuserUid === "" && clientUid === "") {
        // show fail error (menas that the user does not exists in our database)
      }

      // with that info, let's save the info and then go to the codi page
      await AsyncStorage.setItem("authuserUid", authuserUid);
      await AsyncStorage.setItem("clientUid", clientUid);

      this.setState({ userInfo }, function done() {
        this.props.navigation.navigate("Anatomy");
      });
    } catch (error) {
      console.log(30, "Home -> signIn -> error", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  renderGoogleButton() {
    return (
      <GoogleSigninButton
        style={{ width: 192, height: 48, alignSelf: "center" }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.signIn}
        disabled={this.state.isSigninInProgress}
      />
    );
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <ImageBackground source={launchscreenLogo} style={styles.logo} />
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 style={styles.textGrayTitle}>Generador de cobros</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.textGrayTitle}>CodiPago.mx</H3>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            {/* <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              // onPress={() => this.props.navigation.openDrawer()}
              onPress={() => this.props.navigation.navigate("Anatomy")}            >
              <Text>Generar Codi</Text>
            </Button> */}
            { this.renderGoogleButton() }
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
