import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { MOCK_FOOD_ITEMS } from '../data/mockFood';
import { useOrders } from '../context/OrderContext';

export default function FoodDetailsScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { addOrder } = useOrders();

  // Retrieve item from params or fallback to first item
  const foodItem = route?.params?.foodItem || MOCK_FOOD_ITEMS[0];

  const {
    id,
    name,
    restaurant,
    image,
    originalPrice,
    discountedPrice,
    discountPercentage,
    quantity: availableQuantity,
    pickupTime,
    distance,
    location,
    description,
    dietary,
  } = foodItem;

  // Quantity selection state (starts at 1)
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Calculated values
  const totalPrice = discountedPrice * selectedQuantity;
  const originalTotalPrice = originalPrice * selectedQuantity;
  const totalSavings = originalTotalPrice - totalPrice;

  const handleDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (selectedQuantity < availableQuantity) {
      setSelectedQuantity((prev) => prev + 1);
    }
  };

  const handleOrderNow = () => {
    const newOrder = {
      orderId: `#SF-${Math.floor(1000 + Math.random() * 9000)}`,
      foodId: id,
      foodName: name,
      restaurant,
      image,
      quantity: selectedQuantity,
      unitPrice: discountedPrice,
      totalPrice,
      totalSavings,
      pickupTime,
      pickupLocation: location || 'Colombo City Center, Sri Lanka',
      distance,
      status: 'Ready for Pickup',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    addOrder(newOrder);

    navigation.navigate('OrderConfirmation', { order: newOrder });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + insets.bottom }]}
      >
        {/* Prominent Hero Food Image Container */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

          {/* Floating Back Button Overlay */}
          <SafeAreaView edges={['top']} style={styles.floatingHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButtonCircle}
              activeOpacity={0.8}
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
            </TouchableOpacity>

            <View style={styles.discountBadgeTop}>
              <Ionicons name="pricetag" size={13} color="#FFFFFF" style={styles.badgeIcon} />
              <Text style={styles.discountBadgeText}>{discountPercentage}% OFF</Text>
            </View>
          </SafeAreaView>

          {/* Bottom curve card overlay */}
          <View style={styles.imageCurve} />
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Tags Row */}
          <View style={styles.tagsRow}>
            {dietary ? (
              <View style={styles.dietaryBadge}>
                <Ionicons
                  name={dietary === 'Vegetarian' ? 'leaf-outline' : 'restaurant-outline'}
                  size={12}
                  color={dietary === 'Vegetarian' ? colors.primary : colors.textSecondary}
                  style={styles.tagIcon}
                />
                <Text
                  style={[
                    styles.dietaryText,
                    dietary === 'Vegetarian' && styles.dietaryTextGreen,
                  ]}
                >
                  {dietary}
                </Text>
              </View>
            ) : null}

            {/* Available stock pill */}
            <View style={styles.stockBadge}>
              <Ionicons name="hourglass-outline" size={13} color="#92400E" style={styles.tagIcon} />
              <Text style={styles.stockText}>{availableQuantity} portions left</Text>
            </View>
          </View>

          {/* Food Title & Restaurant */}
          <Text style={styles.foodTitle}>{name}</Text>
          <View style={styles.restaurantRow}>
            <Ionicons name="storefront-outline" size={16} color={colors.primary} />
            <Text style={styles.restaurantName}>{restaurant}</Text>
          </View>

          {/* Price Header Row */}
          <View style={styles.pricingCard}>
            <View>
              <Text style={styles.pricingLabel}>Discounted Surplus Price</Text>
              <View style={styles.priceNumbersRow}>
                <Text style={styles.currencyPrefix}>Rs. </Text>
                <Text style={styles.priceDiscounted}>{discountedPrice.toLocaleString()}</Text>
                <Text style={styles.priceOriginal}>Rs. {originalPrice.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.savingsBubble}>
              <Text style={styles.savingsBubbleText}>
                Save Rs. {(originalPrice - discountedPrice).toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>About this Surplus Meal</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>

          {/* Quantity Selector Section */}
          <View style={styles.quantityCard}>
            <View style={styles.quantityInfo}>
              <Text style={styles.quantityHeading}>Select Quantity</Text>
              <Text style={styles.quantitySubtext}>
                Max {availableQuantity} portions available
              </Text>
            </View>

            {/* + / - Controls */}
            <View style={styles.stepperContainer}>
              <TouchableOpacity
                onPress={handleDecrease}
                disabled={selectedQuantity <= 1}
                style={[
                  styles.stepperButton,
                  selectedQuantity <= 1 && styles.stepperButtonDisabled,
                ]}
                activeOpacity={0.7}
                accessibilityLabel="Decrease quantity"
              >
                <Ionicons
                  name="remove"
                  size={20}
                  color={selectedQuantity <= 1 ? colors.textMuted : colors.textPrimary}
                />
              </TouchableOpacity>

              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityNumber}>{selectedQuantity}</Text>
              </View>

              <TouchableOpacity
                onPress={handleIncrease}
                disabled={selectedQuantity >= availableQuantity}
                style={[
                  styles.stepperButton,
                  selectedQuantity >= availableQuantity && styles.stepperButtonDisabled,
                ]}
                activeOpacity={0.7}
                accessibilityLabel="Increase quantity"
              >
                <Ionicons
                  name="add"
                  size={20}
                  color={selectedQuantity >= availableQuantity ? colors.textMuted : colors.textPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Pickup Details Card */}
          <View style={styles.pickupCard}>
            <Text style={styles.sectionHeading}>Pickup Details</Text>

            {/* Time Window */}
            <View style={styles.pickupRow}>
              <View style={styles.pickupIconBg}>
                <Ionicons name="time-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.pickupTextGroup}>
                <Text style={styles.pickupLabel}>Pickup Window</Text>
                <Text style={styles.pickupValue}>{pickupTime}</Text>
              </View>
            </View>

            {/* Location & Address */}
            <View style={styles.pickupRow}>
              <View style={styles.pickupIconBg}>
                <Ionicons name="location-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.pickupTextGroup}>
                <Text style={styles.pickupLabel}>Pickup Location ({distance} away)</Text>
                <Text style={styles.pickupValue}>
                  {location || 'Main Street, Colombo'}
                </Text>
              </View>
            </View>

            {/* Pickup Notice */}
            <View style={styles.pickupNotice}>
              <Ionicons name="information-circle" size={16} color={colors.primary} style={styles.noticeIcon} />
              <Text style={styles.noticeText}>
                Pay on pickup (Cash/Card). Arrive before closing time with your order reservation.
              </Text>
            </View>
          </View>

          {/* Price Calculation Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Price Breakdown</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Unit Price ({selectedQuantity} portion{selectedQuantity > 1 ? 's' : ''})
              </Text>
              <Text style={styles.summaryValue}>Rs. {totalPrice.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Regular Price</Text>
              <Text style={styles.summaryRegularValue}>
                Rs. {originalTotalPrice.toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalSavingsText}>Your Total Savings</Text>
              <Text style={styles.totalSavingsValue}>- Rs. {totalSavings.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Order Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 14) }]}>
        <View style={styles.bottomPriceColumn}>
          <Text style={styles.bottomPriceLabel}>Total Amount</Text>
          <View style={styles.bottomPriceRow}>
            <Text style={styles.bottomCurrency}>Rs. </Text>
            <Text style={styles.bottomPriceValue}>{totalPrice.toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleOrderNow}
          style={styles.orderNowButton}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Order now"
        >
          <Text style={styles.orderNowText}>Order Now</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={styles.orderNowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: '100%',
    height: 290,
    backgroundColor: colors.surfaceAlt,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backButtonCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 4,
  },
  discountBadgeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.discountBadge,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeIcon: {
    marginRight: 4,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  imageCurve: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dietaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagIcon: {
    marginRight: 4,
  },
  dietaryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  dietaryTextGreen: {
    color: colors.primaryDark,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warningLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  stockText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  foodTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  restaurantName: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '600',
    marginLeft: 6,
  },
  pricingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  pricingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 2,
  },
  priceNumbersRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencyPrefix: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  priceDiscounted: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.primary,
    marginRight: 10,
  },
  priceOriginal: {
    fontSize: 14,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  savingsBubble: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  savingsBubbleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionBlock: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  quantityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  quantityHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  quantitySubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 3,
  },
  stepperButton: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonDisabled: {
    opacity: 0.4,
  },
  quantityDisplay: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  pickupCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  pickupRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  pickupIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  pickupTextGroup: {
    flex: 1,
  },
  pickupLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  pickupValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 19,
  },
  pickupNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  noticeIcon: {
    marginRight: 6,
    marginTop: 2,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: '#166534',
    lineHeight: 16,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  summaryRegularValue: {
    fontSize: 13,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 8,
  },
  totalSavingsText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  totalSavingsValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomPriceColumn: {
    justifyContent: 'center',
  },
  bottomPriceLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  bottomPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bottomCurrency: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  bottomPriceValue: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
  },
  orderNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 4,
  },
  orderNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6,
  },
  orderNowIcon: {
    marginLeft: 2,
  },
});
