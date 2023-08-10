/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

//funcional notificacion por backgraound
 messaging().setBackgroundMessageHandler(async remoteMessage => {
     console.log("Esta es una notificacion por background",remoteMessage)
});
AppRegistry.registerComponent(appName, () => App);
