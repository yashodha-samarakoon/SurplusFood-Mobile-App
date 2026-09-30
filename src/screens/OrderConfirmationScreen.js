import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function OrderConfirmationScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const order = route?.params?.order || {
    orderId: '#SF-8120',
    foodName: 'Chicken Fried Rice',
    restaurant: 'Colombo Spice Kitchen',
    quantity: 1,
    totalPrice: 650,
    totalSavings: 450,
    pickupTime: 'Today, 8:30 PM - 9:30 PM',
    pickupLocation: 'No. 42 Galle Road, Bambalapitiya, Colombo 04',
    status: 'Ready for Pickup',
  };

  const handleBackToHome = () => {
    // Navigate back to the Customer main flow (Home tab)
    navigation.reset({
      index: 0,
      routes: [{ name: 'CustomerMain' }],
    });
  };

  const handleViewOrders = () => {
    // Navigate back to the Customer main flow with Orders tab active
    navigation.reset({
      index: 0,
      routes: [{ name: 'CustomerMain', params: { initialTab: 'orders' } }],
    });
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: 24 }]}
      >
        {/* Success Header Badge */}
        <View style={styles.successHeader}>
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark-sharp" size={42} color="#FFFFFF" />
          </View>
          <Text style={styles.successTitle}>Surplus Meal Reserved!</Text>
          <Text style={styles.successSubtitle}>
            Thank you for rescuing food and reducing food waste.
          </Text>

          <View style={styles.orderIdBadge}>
            <Text style={styles.orderIdText}>Order ID: {order.orderId}</Text>
          </View>
        </View>

        {/* Order Summary Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeaderTitle}>Order Summary</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>

          {/* Item Row */}
          <View style={styles.itemRow}>
            {order.image ? (
              <Image source={{ uri: order.image }} style={styles.itemImage} resizeMode="cover" />
            ) : (
              <View style={styles.placeholderImg}>
                <Ionicons name="restaurant" size={24} color={colors.primary} />
              </View>
            )}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{order.foodName}</Text>
              <Text style={styles.restaurantName}>{order.restaurant}</Text>
              <Text style={styles.itemQtyPrice}>
                {order.quantity} x Rs. {order.unitPrice?.toLocaleString() || order.totalPrice?.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Total & Savings */}
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Total Amount (Pay on Pickup):</Text>
            <Text style={styles.costValue}>Rs. {order.totalPrice?.toLocaleString()}</Text>
          </View>

          {order.totalSavings ? (
            <View style={styles.savingsBanner}>
              <Ionicons name="sparkles" size={15} color="#047857" style={styles.savingsIcon} />
              <Text style={styles.savingsText}>
                You saved Rs. {order.totalSavings.toLocaleString()} on this order!
              </Text>
            </View>
          ) : null}
        </View>

        {/* Pickup Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeaderTitle}>Pickup Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.iconCircleSmall}>
              <Ionicons name="time" size={18} color={colors.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Pickup Window</Text>
              <Text style={styles.infoValue}>{order.pickupTime}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCircleSmall}>
              <Ionicons name="location" size={18} color={colors.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Restaurant Location</Text>
              <Text style={styles.infoValue}>{order.pickupLocation}</Text>
            </View>
          </View>

          {/* Instructions Box */}
          <View style={styles.instructionBox}>
            <Ionicons name="information-circle-outline" size={18} color={colors.primaryDark} style={styles.instIcon} />
            <Text style={styles.instructionText}>
              Show your Order ID ({order.orderId}) to the cashier at the counter to collect your meal.
              Payment will be handled at the restaurant via cash or card.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.ordersButton}
          onPress={handleViewOrders}
          activeOpacity={0.85}
        >
          <Text style={styles.ordersButtonText}>View in My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleBackToHome}
          activeOpacity={0.85}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  successIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 18,
  },
  orderIdBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  orderIdText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryDark,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 14,
  },
  placeholderImg: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  restaurantName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  itemQtyPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 12,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  costLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  costValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  savingsIcon: {
    marginRight: 6,
  },
  savingsText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  iconCircleSmall: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 18,
  },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  instIcon: {
    marginRight: 8,
    marginTop: 1,
  },
  instructionText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
  },
  ordersButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  ordersButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  homeButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  homeButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
