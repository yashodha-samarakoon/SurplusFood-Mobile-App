import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerMainScreen from '../screens/CustomerMainScreen';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';

const Stack = createNativeStackNavigator();

/**
 * AppNavigator handles top-level routing for SurplusFood.
 *
 * Current Phase: Initial Customer-Side Development
 * - CustomerMain: Main customer container (Home, Explore, Orders, Profile tabs)
 * - FoodDetails: Prepared route for the upcoming Food Details screen
 *
 * Extensibility for Future Phases:
 * - Provider flows (Provider Home, Add Food, Manage Food, Provider Orders) can be
 *   mounted here under a ProviderNavigator or role-based conditional routing.
 */
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CustomerMain"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Customer Side Routes */}
      <Stack.Screen
        name="CustomerMain"
        component={CustomerMainScreen}
        options={{ title: 'SurplusFood' }}
      />
      <Stack.Screen
        name="FoodDetails"
        component={FoodDetailsScreen}
        options={{ title: 'Food Details' }}
      />

      {/* 
        Future Provider/Restaurant Routes will be added here:
        <Stack.Screen name="ProviderMain" component={ProviderMainScreen} />
        <Stack.Screen name="AddFood" component={AddFoodScreen} />
        <Stack.Screen name="ManageFood" component={ManageFoodScreen} />
      */}
    </Stack.Navigator>
  );
}
