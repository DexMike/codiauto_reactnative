import React from "react";
import Setup from "./src/boot/setup";

//TEST
import { AsyncStorage, Platform } from "react-native";
import firebase from "react-native-firebase";
// import { Notification } from 'react-native-firebase';

import {
  Toast
} from "native-base";



export default class App extends React.Component {

  componentDidMount() {

    const channel = new firebase.notifications.Android.Channel(
      "channelId",
      "Channel Name",
      firebase.notifications.Android.Importance.Max
    ).setDescription("A natural description of the channel");
    firebase.notifications().android.createChannel(channel);

    // the listener returns a function you can use to unsubscribe
    this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {
      if (Platform.OS === "android") {

        const localNotification = new firebase.notifications.Notification({
            sound: "default",
            show_in_foreground: true,
          })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId("channelId") // e.g. the id you chose above
          .android.setSmallIcon("ic_stat_notification") // create this icon in Android Studio
          .android.setColor("#000000") // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));

      } else if (Platform.OS === "ios") {

        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .ios.setBadge(notification.ios.badge);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));

      }
    });

    // ...
  }

  componentWillUnmount() {
    // this is where you unsubscribe
    this.unsubscribeFromNotificationListener();
  }











  showAlert(title, body) {
    console.log(57, "<<<< ALERT!!! >>>>", title, body);
    Toast.show({
      text: title,
      buttonText: "Okey"
    });
    // Alert.alert(
    //   title, body,
    //   [
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //   ],
    //   { cancelable: false },
    // );
  }
  // **********************************************

    //1
  async checkPermission() {
    console.log(70, ">>CHECKING PERMISSION!");
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log(73, ">>PERMISSION ENABLED!");
      this.getToken();
    } else {
      console.log(73, ">>PERMISSION DISABLED :(");
      this.requestPermission();
    }
  }

    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem("fcmToken", fcmToken);
        }
    }
  }

    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log(101, "permission rejected");
    }
  }

  render() {
    return <Setup />;
  }
}
