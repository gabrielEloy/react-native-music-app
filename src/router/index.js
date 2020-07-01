// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../router/screens/Home';
import PanGesture from '../router/screens/PanGesture';
import ExpandingBottom from '../router/screens/ExpandingBottom';

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={ExpandingBottom}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Card"
            component={PanGesture}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
