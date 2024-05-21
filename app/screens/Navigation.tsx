import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Auth from "./Auth.tsx";
import Home from "./Home.tsx";
import Game from "./Game.tsx";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth'>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}} />
          <Stack.Screen name="Game" component={Game} options={{headerShown: false, headerTitleAlign: 'center', headerBlurEffect: 'dark'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
