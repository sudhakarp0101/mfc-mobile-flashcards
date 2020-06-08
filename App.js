import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import MfcDeckList from './components/MfcDeckList'
import MfcDeckDetail from './components/MfcDeckDetail'
import MfcAddDeck from './components/MfcAddDeck';
import MfcAddCard from './components/MfcAddCard';
import MfcQuiz from './components/MfcQuiz'
import { setLocalNotification } from './utils/helpers';
import Constants from 'expo-constants';
import { safron } from './utils/colors'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MfcDeckList" component={MfcDeckList} options={{ headerShown: false }} />
      <Stack.Screen name="MfcDeckDetail" component={MfcDeckDetail} />
      <Stack.Screen name="MfcAddCard" component={MfcAddCard} />
      <Stack.Screen name="MfcQuiz" component={MfcQuiz} />
    </Stack.Navigator>

  );
}

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FlashcardStatusBar
            backgroundColor={safron}
            barStyle="light-content"
          />
          <NavigationContainer>
            <Tab.Navigator tabBarOptions={{
              labelStyle: { fontSize: 20 }

            }}>
              <Tab.Screen name="DECKS" component={Home} />
              <Tab.Screen name="New Deck" component={MfcAddDeck} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dde'
  },
  tabfs: {
    fontSize: 30
  }
});