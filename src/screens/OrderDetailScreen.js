import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function OrderDetailScreen({ route, navigation }) {
  const order = route?.params?.order;

  if (!order) {
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Order not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const {
    orderId,
    foodName,
    restaurant,
    image,
    quantity,
    unitPrice,
    totalPrice,
    totalSavings,
    pickupTime,
    pickupLocation,
    distance,
    status = 'Ready for Pickup',
    createdAt,
    instructions,
  } = order;

  // Helper for status styling
  const getStatusConfig = () => {
    switch (status) {
      case 'Ready for Pickup':
        return {
          color: colors.primaryDark,
          bg: '#DCFCE7',
          border: '#86EFAC',
          icon: 'bag-check',
          label: 'Ready for Pickup',
          desc: 'Your surplus meal is packed and ready for collection at the counter.',
        };
      case 'Confirmed':
        return {
          color: '#B45309',
          bg: '#FEF3C7',
          border: '#FDE68A',
          icon: 'checkmark-circle',
          label: 'Confirmed',
          desc: 'The restaurant has confirmed your reservation. Pickup window starts soon.',
        };
      case 'Completed':
        return {
          color: '#475569',
          bg: '#F1F5F9',
          border: '#CBD5E1',
          icon: 'checkmark-done-circle',
          label: 'Completed',
          desc: 'Meal was successfully picked up. Thank you for reducing food waste!',
        };
      default:
        return {
          color: colors.primaryDark,
          bg: '#DCFCE7',
          border: '#86EFAC',
          icon: 'receipt',
          label: status,
          desc: 'Order reservation is recorded.',
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order #{orderId?.replace('#', '')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status Card */}
        <View style={[styles.statusCard, { borderColor: statusConfig.border }]}>
          <View style={styles.statusTopRow}>
            <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
              <Ionicons name={statusConfig.icon} size={15} color={statusConfig.color} style={{ marginRight: 5 }} />
              <Text style={[styles.statusBadgeText, { color: statusConfig.color }]}>
                {statusConfig.label}
              </Text>
            </View>
            <Text style={styles.orderPlacedText}>{createdAt || 'Recent'}</Text>
          </View>
          <Text style={styles.statusDesc}>{instructions || statusConfig.desc}</Text>
        </View>

        {/* Meal Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Meal Details</Text>
          <View style={styles.mealRow}>
            {image ? (
              <Image source={{ uri: image }} style={styles.mealImg} resizeMode="cover" />
            ) : (
              <View style={styles.mealImgPlaceholder}>
                <Ionicons name="restaurant" size={24} color={colors.primary} />
              </View>
            )}
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{foodName}</Text>
              <View style={styles.restaurantRow}>
                <Ionicons name="storefront-outline" size={13} color={colors.textSecondary} />
                <Text style={styles.restaurantText}>{restaurant}</Text>
              </View>
              {distance ? (
                <View style={styles.distanceRow}>
                  <Ionicons name="location-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.distanceText}>{distance} away</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Quantity & Unit Price */}
          <View style={styles.qtyPriceRow}>
            <Text style={styles.qtyPriceLabel}>Reserved Quantity</Text>
            <Text style={styles.qtyPriceValue}>{quantity} portion{quantity > 1 ? 's' : ''}</Text>
          </View>
          {unitPrice ? (
            <View style={styles.qtyPriceRow}>
              <Text style={styles.qtyPriceLabel}>Discounted Unit Price</Text>
              <Text style={styles.qtyPriceValue}>Rs. {unitPrice.toLocaleString()}</Text>
            </View>
          ) : null}
        </View>

        {/* Pickup Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Pickup Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="time" size={18} color={colors.primary} />
            </View>
            <View style={styles.infoTextGroup}>
              <Text style={styles.infoLabel}>Designated Pickup Window</Text>
              <Text style={styles.infoValue}>{pickupTime}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="location" size={18} color={colors.primary} />
            </View>
            <View style={styles.infoTextGroup}>
              <Text style={styles.infoLabel}>Restaurant Pickup Address</Text>
              <Text style={styles.infoValue}>{pickupLocation || 'Colombo, Sri Lanka'}</Text>
            </View>
          </View>

          {/* Pickup Counter Guideline */}
          <View style={styles.pickupGuideline}>
            <Ionicons name="information-circle" size={18} color={colors.primaryDark} style={{ marginRight: 8, marginTop: 2 }} />
            <Text style={styles.guidelineText}>
              Present your Order ID (<Text style={{ fontWeight: '700' }}>{orderId}</Text>) at the takeaway counter.
              Payment is made directly at the restaurant using Cash or Card.
            </Text>
          </View>
        </View>

        {/* Payment & Savings Summary */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Payment Summary</Text>

          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Total Amount (Pay on Pickup)</Text>
            <Text style={styles.summaryAmount}>Rs. {totalPrice?.toLocaleString()}</Text>
          </View>

          {totalSavings ? (
            <View style={styles.savingsBanner}>
              <Ionicons name="sparkles" size={14} color="#047857" style={{ marginRight: 6 }} />
              <Text style={styles.savingsBannerText}>
                You saved Rs. {totalSavings.toLocaleString()} on this order!
              </Text>
            </View>
          ) : null}
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backToOrdersBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backToOrdersText}>← Back to My Orders</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 30,
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statusTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  orderPlacedText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statusDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealImg: {
    width: 68,
    height: 68,
    borderRadius: 12,
    marginRight: 14,
  },
  mealImgPlaceholder: {
    width: 68,
    height: 68,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  restaurantText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 3,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 12,
  },
  qtyPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  qtyPriceLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  qtyPriceValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextGroup: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
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
  pickupGuideline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginTop: 2,
  },
  guidelineText: {
    flex: 1,
    fontSize: 12,
    color: '#166534',
    lineHeight: 17,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
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
  savingsBannerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
  backToOrdersBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  backToOrdersText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
