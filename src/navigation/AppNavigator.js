import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerMainScreen from '../screens/CustomerMainScreen';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';

const Stack = createNativeStackNavigator();

/**
 * AppNavigator handles top-level routing for SurplusFood.
 *
 * Stage 1: Initial Customer-Side Foundation
 * - CustomerMain: Main customer container (Home, Explore, Orders, Profile tabs)
 *
 * Stage 2: Food Details and Basic Ordering Flow
 * - FoodDetails: Full meal details, interactive pricing and quantity selection
 * - OrderConfirmation: Order summary, pickup instructions, and reservation confirmation
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
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ title: 'Order Confirmation' }}
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
