import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import OrdersScreen from './OrdersScreen';
import ProfileScreen from './ProfileScreen';
import BottomNavigation from '../components/BottomNavigation';
import { colors } from '../theme/colors';

export default function CustomerMainScreen({ route, navigation }) {
  // 'home' is selected by default as required, or overridden by route params
  const [activeTab, setActiveTab] = useState(route?.params?.initialTab || 'home');

  useEffect(() => {
    if (route?.params?.initialTab) {
      setActiveTab(route.params.initialTab);
    }
  }, [route?.params?.initialTab]);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen navigation={navigation} />;
      case 'explore':
        return <ExploreScreen navigation={navigation} />;
      case 'orders':
        return <OrdersScreen navigation={navigation} />;
      case 'profile':
        return <ProfileScreen navigation={navigation} />;
      default:
        return <HomeScreen navigation={navigation} />;
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.content}>{renderActiveScreen()}</View>
      <BottomNavigation activeTab={activeTab} onSelectTab={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
