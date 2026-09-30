import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { OrderProvider } from './src/context/OrderContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <OrderProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <AppNavigator />
        </NavigationContainer>
      </OrderProvider>
    </SafeAreaProvider>
  );
}
