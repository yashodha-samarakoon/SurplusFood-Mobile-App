import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useOrders } from '../context/OrderContext';

const STATUS_FILTERS = ['All', 'Ready for Pickup', 'Confirmed', 'Completed'];

export default function OrdersScreen({ navigation }) {
  const { orders } = useOrders();
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Filter orders based on selected tab
  const filteredOrders = useMemo(() => {
    if (selectedFilter === 'All') return orders;
    return orders.filter((o) => o.status === selectedFilter);
  }, [orders, selectedFilter]);

  // Status badge styling helper
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Ready for Pickup':
        return {
          bg: '#DCFCE7',
          color: colors.primaryDark,
          border: '#86EFAC',
          icon: 'bag-check',
        };
      case 'Confirmed':
        return {
          bg: '#FEF3C7',
          color: '#B45309',
          border: '#FDE68A',
          icon: 'checkmark-circle',
        };
      case 'Completed':
        return {
          bg: '#F1F5F9',
          color: '#475569',
          border: '#CBD5E1',
          icon: 'checkmark-done-circle',
        };
      default:
        return {
          bg: '#DCFCE7',
          color: colors.primaryDark,
          border: '#86EFAC',
          icon: 'receipt',
        };
    }
  };

  const handleOrderPress = (order) => {
    navigation.navigate('OrderDetail', { order });
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle}>My Orders</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>{orders.length} Total</Text>
          </View>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {STATUS_FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterPill,
                  isSelected ? styles.filterPillActive : styles.filterPillInactive,
                ]}
                onPress={() => setSelectedFilter(filter)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected ? styles.filterTextActive : styles.filterTextInactive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Orders List Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, idx) => {
            const badge = getStatusBadgeStyle(order.status);
            return (
              <TouchableOpacity
                key={order.orderId || idx}
                style={styles.orderCard}
                onPress={() => handleOrderPress(order)}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel={`Order ${order.orderId} - ${order.foodName}`}
              >
                {/* Header row: ID & Status Badge */}
                <View style={styles.orderCardHeader}>
                  <View>
                    <Text style={styles.orderId}>{order.orderId}</Text>
                    <Text style={styles.orderDate}>
                      {order.createdAt ? order.createdAt : 'Recent reservation'}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statusPill,
                      { backgroundColor: badge.bg, borderColor: badge.border },
                    ]}
                  >
                    <Ionicons
                      name={badge.icon}
                      size={13}
                      color={badge.color}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={[styles.statusText, { color: badge.color }]}>
                      {order.status}
                    </Text>
                  </View>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Meal preview row */}
                <View style={styles.mealRow}>
                  {order.image ? (
                    <Image
                      source={{ uri: order.image }}
                      style={styles.mealImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.mealPlaceholder}>
                      <Ionicons name="restaurant" size={20} color={colors.primary} />
                    </View>
                  )}

                  <View style={styles.mealInfo}>
                    <Text style={styles.mealName} numberOfLines={1}>
                      {order.foodName}
                    </Text>
                    <View style={styles.restaurantRow}>
                      <Ionicons name="storefront-outline" size={12} color={colors.textSecondary} />
                      <Text style={styles.restaurantText} numberOfLines={1}>
                        {order.restaurant}
                      </Text>
                    </View>
                    <Text style={styles.portionsText}>
                      {order.quantity} portion{order.quantity > 1 ? 's' : ''} •{' '}
                      <Text style={styles.priceHighlight}>
                        Rs. {order.totalPrice?.toLocaleString()}
                      </Text>
                    </Text>
                  </View>
                </View>

                {/* Pickup Window and Tap for details */}
                <View style={styles.cardFooter}>
                  <View style={styles.pickupTimeRow}>
                    <Ionicons name="time-outline" size={13} color={colors.primary} />
                    <Text style={styles.pickupTimeText} numberOfLines={1}>
                      Pickup: {order.pickupTime}
                    </Text>
                  </View>

                  <View style={styles.viewDetailLink}>
                    <Text style={styles.viewDetailText}>Details</Text>
                    <Ionicons name="chevron-forward" size={13} color={colors.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="receipt-outline" size={32} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Orders Found</Text>
            <Text style={styles.emptySubtitle}>
              {selectedFilter === 'All'
                ? 'You do not have any orders yet. Explore surplus food on the Home screen to make your first reservation!'
                : `No orders matching status "${selectedFilter}".`}
            </Text>
            {selectedFilter !== 'All' ? (
              <TouchableOpacity
                style={styles.resetFilterBtn}
                onPress={() => setSelectedFilter('All')}
                activeOpacity={0.8}
              >
                <Text style={styles.resetFilterText}>View All Orders</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}

        {/* How Pickup Works Guide */}
        <View style={styles.workflowCard}>
          <Text style={styles.workflowHeading}>Pickup Guide</Text>

          <View style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>1</Text>
            </View>
            <View style={styles.stepBody}>
              <Text style={styles.stepTitle}>Order Confirmation</Text>
              <Text style={styles.stepSub}>Your meal is reserved and waiting at the restaurant.</Text>
            </View>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>2</Text>
            </View>
            <View style={styles.stepBody}>
              <Text style={styles.stepTitle}>Show Order ID</Text>
              <Text style={styles.stepSub}>Present your Order ID to the cashier before the pickup deadline.</Text>
            </View>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>3</Text>
            </View>
            <View style={styles.stepBody}>
              <Text style={styles.stepTitle}>Pay & Enjoy</Text>
              <Text style={styles.stepSub}>Complete payment at pickup (Cash/Card) and enjoy your discounted meal!</Text>
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
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  totalBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  totalBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  filterRow: {
    paddingHorizontal: 16,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 1,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterPillInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filterTextInactive: {
    color: colors.textSecondary,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
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
  orderId: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  orderDate: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 11,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 12,
  },
  mealPlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  restaurantText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  portionsText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceHighlight: {
    fontWeight: '700',
    color: colors.primary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 12,
  },
  pickupTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 6,
  },
  pickupTimeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 5,
  },
  viewDetailLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 2,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  resetFilterBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 14,
  },
  resetFilterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  workflowCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  workflowHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  stepNumText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  stepBody: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 1,
  },
  stepSub: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
