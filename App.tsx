import { useEffect, useRef } from "react";
import { Background } from "./src/Components/Background";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Subscription } from "expo-modules-core";

import { getPushNotificationToken } from "./src/services/getPushNotification";
import { Routes } from "./src/routes";
import { StatusBar } from "react-native";
import { Loading } from "./src/Components/Loading";
import * as Notifications from "expo-notifications";

import "./src/services/notification";

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        console.log(notification);
      });

    responseNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log(response)
      );

    return () => {
      if (
        getNotificationListener.current &&
        responseNotificationListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationListener.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationListener.current
        );
      }
    };
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
