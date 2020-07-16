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
    // await GoogleSignin.configure({
    //   // TODO -> Move this to the env file
    //   // webClientId:"100013698037-sbd0alfo3dhk1vpbsbl2gsa98em2l59u.apps.googleusercontent.com",// android
    //   webClientId:"138289237767-85ct41hjne1q80fmnv5aj3nd4uteerkj.apps.googleusercontent.com",// web
    //   offlineAccess: true
    // });

    // STEP ONE, do we have a phone number?
    const phone = await AsyncStorage.getItem("userReqInfo_phone");
    if (!phone) {
      console.log(37, "We don't have the telephone number from the user, ask for it");
      this.props.navigation.navigate("SetupPhone");
    } else {
      console.log(40, ">>>> WE HAVE THE PHONE!!!", phone);
    }


    // let's go directly to the page where we ask for the phone number

  }

  // signIn = async () => {
  //   try {
  //     // await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log(27, "Home -> signIn -> userInfo", userInfo);

  //     //if login is correct, let's check what's the id of the user and retrieve the clientUid
  //     //for now it's only dummy

  //     const data = {
  //       email: userInfo.user.email,
  //       googleId: userInfo.user.id
  //     };

  //     const loginData = await UserService.aLoginUser(data);
  //     console.log(49, loginData);

  //     // we also need to get a defaultPaymentId since all payments must 
  //     // be matched to a payment in the DB
  //     const defaultPaymentData = {
  //       clientUid: loginData.body.clientUid,
  //       authUserToken: loginData.body.token,
  //       authUserUid: loginData.body.uid
  //     };
  //     // const defaultPayment = await PaymentService.getDefaultPayment(defaultPaymentData);
  //     const defaultPayment = {};
  //     const dpLength = Object.keys(defaultPayment).length;

  //     // TODO -> move this to a sls call
  //     //AQUI ME QUEDO, YA ESTA EL LOGIN EN EL BACKEND, HAY QUE PROBARLO
  //     const authUserUid = loginData.body.uid;
  //     const clientUid = loginData.body.clientUid;
  //     const token = loginData.body.token;

  //     if (authUserUid === "" || clientUid === "" || token === "" || dpLength === 0) {
  //       // show fail error (means that the user does not exists in our database)
  //       console.log(58, ">>>LOGIN ERROR----------------->>>>");
  //       Toast.show({
  //         text: "Wrong password!",
  //         buttonText: "Okay"
  //       });
  //       return false;
  //     }

  //     // with that, let's save the info and then go to the codi page
  //     await AsyncStorage.setItem("authUserUid", authUserUid);
  //     await AsyncStorage.setItem("clientUid", clientUid);
  //     await AsyncStorage.setItem("token", token);
  //     await AsyncStorage.setItem("photo", userInfo.user.photo);
  //     await AsyncStorage.setItem("defaultPayment", JSON.stringify(defaultPayment));

  //     this.setState({ userInfo }, function done() {
  //       this.props.navigation.navigate("Anatomy");
  //     });
  //   } catch (error) {
  //     console.log(30, "Home -> signIn -> error", error);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  // renderGoogleButton() {
  //   return (
  //     <GoogleSigninButton
  //       style={{ width: 192, height: 48, alignSelf: "center" }}
  //       size={GoogleSigninButton.Size.Wide}
  //       color={GoogleSigninButton.Color.Dark}
  //       onPress={this.signIn}
  //       disabled={this.state.isSigninInProgress}
  //     />
  //   );
  // }

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
