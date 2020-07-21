import React, { Component } from "react";
import { ImageBackground, View, StatusBar, /* Toast */ } from "react-native";
import { Container, H3, /* Button, Text */ } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logoTemp.png");

// import { GoogleSignin, statusCodes, GoogleSigninButton } from "react-native-google-signin";
// import UserService from "../../services/UserService";
// import PaymentService from "../../services/PaymentService";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    };

    // this.generateQr = this.generateQr.bind(this);
  }

  async componentDidMount() {

    // FOR TESTING PURPOSES!!!
    // borre todos los datos en storage
    await AsyncStorage.removeItem("userReqInfo_phone");
    await AsyncStorage.removeItem("userReqInfo_email");
    await AsyncStorage.removeItem("userReqInfo_password");

    // STEP ONE, do we have a phone number and an email?
    const phone = await AsyncStorage.getItem("userReqInfo_phone");
    const email = await AsyncStorage.getItem("userReqInfo_email");
    if (!phone || !email) {
      console.log(37, "We don't have the telephone number from the user, ask for it");
      this.props.navigation.navigate("SetupPhone");
    } else {
      console.log(40, ">>>> WE HAVE THE PHONE!!!", phone);
    }

    // check that there is a password saved
    const password = await AsyncStorage.getItem("userReqInfo_password");
    if (!password) {
      this.props.navigation.navigate("SetupPassword");
    }

    // let's go directly to the page where we ask for the phone number

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
            { /* this.renderGoogleButton() */ }
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
