import React from "react";
import Setup from "./src/boot/setup";

//TEST
import { AsyncStorage } from "react-native";
import firebase from "react-native-firebase";
// import { Notification } from 'react-native-firebase';

import {
  Toast
} from "native-base";



export default class App extends React.Component {

  async componentDidMount() {
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const action = notificationOpen.action;
        const notification = notificationOpen.notification;
        var seen = [];
        alert(JSON.stringify(notification.data, function(key, val) {
            if (val != null && typeof val === "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        }));
    }
    const channel = new firebase.notifications.Android.Channel("test-channel", "Test Channel", firebase.notifications.Android.Importance.Max)
            .setDescription("My apps test channel");
// Create the channel
    firebase.notifications().android.createChannel(channel);
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log(38, ">>>>CHIDO");
      // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((notification) => {

      const localNotification = new firebase.notifications.Notification({
          sound: "default",
          show_in_foreground: true,
        })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId("test-channel") // e.g. the id you chose above
        .android.setSmallIcon("ic_stat_notification") // create this icon in Android Studio
        .android.setColor("#000000") // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);

        console.log(58, notification);

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));

    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        var seen = [];
        alert(JSON.stringify(notification.data, function(key, val) {
            if (val != null && typeof val === "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        }));
        firebase.notifications().removeDeliveredNotification(notification.notificationId);

    });
}

  // **********************************************
  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    // this.notificationListener = firebase.notifications().onNotification((notification) => {
    //   console.log(31, notification);
    //   const { title, body } = notification;
    //   this.showAlert(title, body);
    // });

    // /*
    // * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    // * */
    // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //   console.log(40, notificationOpen);
    //   const { title, body } = notificationOpen.notification;
    //     this.showAlert(title, body);
    // });

    // /*
    // * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    // * */
    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //   console.log(50, notificationOpen.notification);
    //   const { title, body } = notificationOpen.notification;
    //   this.showAlert(title, body);
    // }
    // /*
    // * Triggered for data only payload in foreground
    // * */
    // this.messageListener = firebase.messaging().onMessage((message) => {
    //   //process data message
    //   console.log(59, message);
    //   console.log(52, JSON.stringify(message));
    // });
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
