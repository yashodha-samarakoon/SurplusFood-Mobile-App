import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useOrders } from '../context/OrderContext';

export default function OrdersScreen() {
  const { orders } = useOrders();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* If user has placed orders, display Active Orders */}
        {orders.length > 0 ? (
          <View style={styles.ordersSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Active Reservations</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{orders.length} Active</Text>
              </View>
            </View>

            {orders.map((order, index) => (
              <View key={order.orderId || index} style={styles.orderCard}>
                {/* Header row of card */}
                <View style={styles.orderCardHeader}>
                  <View>
                    <Text style={styles.orderIdText}>{order.orderId}</Text>
                    <Text style={styles.orderDateText}>{order.createdAt ? `Placed at ${order.createdAt}` : 'Today'}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>{order.status || 'Ready for Pickup'}</Text>
                  </View>
                </View>

                {/* Divider */}
                <View style={styles.cardDivider} />

                {/* Meal Info */}
                <View style={styles.mealRow}>
                  {order.image ? (
                    <Image source={{ uri: order.image }} style={styles.mealImage} resizeMode="cover" />
                  ) : (
                    <View style={styles.mealImagePlaceholder}>
                      <Ionicons name="restaurant" size={20} color={colors.primary} />
                    </View>
                  )}
                  <View style={styles.mealDetails}>
                    <Text style={styles.mealName}>{order.foodName}</Text>
                    <Text style={styles.restaurantName}>{order.restaurant}</Text>
                    <Text style={styles.mealQuantity}>
                      {order.quantity} portion{order.quantity > 1 ? 's' : ''} • Rs. {order.totalPrice?.toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Pickup details box */}
                <View style={styles.pickupBox}>
                  <View style={styles.pickupRowItem}>
                    <Ionicons name="time-outline" size={14} color={colors.primary} />
                    <Text style={styles.pickupTimeText}>{order.pickupTime}</Text>
                  </View>
                  <View style={styles.pickupRowItem}>
                    <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.pickupLocationText} numberOfLines={1}>
                      {order.pickupLocation}
                    </Text>
                  </View>
                </View>

                {/* Payment reminder banner */}
                <View style={styles.payNotice}>
                  <Ionicons name="wallet-outline" size={14} color={colors.primaryDark} style={styles.payIcon} />
                  <Text style={styles.payText}>Pay Rs. {order.totalPrice?.toLocaleString()} on pickup (Cash / Card)</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="receipt-outline" size={32} color={colors.primary} />
            </View>
            <Text style={styles.title}>No Active Orders</Text>
            <Text style={styles.badge}>Order & Pickup Hub</Text>
            <Text style={styles.description}>
              Once you reserve surplus meals, your digital receipts, pickup countdown timers,
              and order details will appear right here.
            </Text>
          </View>
        )}

        {/* How Pickup Works Guide */}
        <View style={styles.workflowCard}>
          <Text style={styles.workflowHeading}>How Pickup Works</Text>
          
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Reserve Surplus Meal</Text>
              <Text style={styles.stepSubtitle}>Choose your discounted food item from the home screen.</Text>
            </View>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Visit Before Closing</Text>
              <Text style={styles.stepSubtitle}>Arrive at the restaurant within the designated pickup window.</Text>
            </View>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Pay & Collect</Text>
              <Text style={styles.stepSubtitle}>Show your Order ID to the cashier to pay and collect your food.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  content: {
    padding: 18,
  },
  ordersSection: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  countBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 14,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  orderDateText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 12,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 12,
  },
  mealImagePlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  restaurantName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  mealQuantity: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  pickupBox: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  pickupRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  pickupTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 6,
  },
  pickupLocationText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
    flex: 1,
  },
  payNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  payIcon: {
    marginRight: 6,
  },
  payText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  badge: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  workflowCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },
  workflowHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  stepSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
