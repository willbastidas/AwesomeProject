/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/* 

{
  import React, { useEffect } from 'react';
  import type {PropsWithChildren} from 'react';
  import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
  import messaging from '@react-native-firebase/messaging';
  import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';

  type SectionProps = PropsWithChildren<{
    title: string;
  }>;

  function Section({children, title}: SectionProps): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  }

  function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    async function pushToken(){
      let fcmToken = await messaging().getToken();
      if(fcmToken){
        console.log("token",fcmToken);
      }
    }
    

    useEffect(()=>{
      pushToken()
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
      return unsubscribe;
    }, [] )
  

    //notificacion funcional_1 Por onMessage
  //    useEffect(() => {
  //     const ForeSubscribe = messaging().onMessage(
  //       async remoteMessage => {
  //       console.log('push recibida por fores',remoteMessage);
  //      });

  //     return ForeSubscribe
  //  }, [] );

    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

  export default App;
}
*/

//notificacion por background
import React, { useEffect, useState } from 'react';
import {
Alert,
Modal,
SafeAreaView,
ScrollView,
StatusBar,
StyleSheet,
Text,
useColorScheme,
View,
Button,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const Section = ({ children= {}, title="" }) => {
const isDarkMode = useColorScheme() === 'dark';

return (
    <View style={styles.sectionContainer}>
    <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black }]}>{title}</Text>
    <Text style={[styles.sectionDescription, { color: isDarkMode ? Colors.light : Colors.dark }]}>children</Text>
    </View>
);
};

const App = () => {
const isDarkMode = useColorScheme() === 'dark';
const [modalVisible, setModalVisible] = useState(false);

const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};

const handleAccept = () => {
    // Lógica para aceptar la entrega
    setModalVisible(false);
};

const handleDeny = () => {
    // Lógica para denegar la entrega
    setModalVisible(false);
};

useEffect(() => {
    const pushToken = async () => {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log('token', fcmToken);
    }
    };

    pushToken();

    const unsubscribe = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    setModalVisible(true),
    console.log("mensaje recibido por background",remoteMessage);

    setTimeout(() => {
        setModalVisible(false);
    }, 30000);
    });

    return unsubscribe;
}, []);

return (
    <SafeAreaView style={backgroundStyle}>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}>
        <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your edits.
        </Section>
        <Section title="See Your Changes">
            <ReloadInstructions />
        </Section>
        <Section title="Debug">
            <DebugInstructions />
        </Section>
        <Section title="Learn More">
            Read the docs to discover what to do next:
        </Section>
        <LearnMoreLinks />
        </View>
    </ScrollView>

    <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Se le ha asignado una entrega</Text>
        <View style={styles.buttonContainer}>
            <Button title="Aceptar" onPress={handleAccept} />
            <Button title="Denegar" onPress={handleDeny} />
        </View>
        </View>
    </Modal>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
},
sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
},
sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
},
highlight: {
    fontWeight: '700',
},
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
},
buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
},
});

export default App;