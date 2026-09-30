import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function FoodCard({ item, onPress }) {
  const {
    name,
    restaurant,
    image,
    originalPrice,
    discountedPrice,
    discountPercentage,
    quantity,
    pickupTime,
    distance,
  } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={`${name} from ${restaurant}`}
    >
      {/* Food Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Top Badges */}
        <View style={styles.badgeRow}>
          {/* Discount Percentage Badge */}
          <View style={styles.discountBadge}>
            <Ionicons name="pricetag" size={13} color="#FFFFFF" style={styles.badgeIcon} />
            <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
          </View>

          {/* Quantity Left Pill */}
          <View style={styles.quantityBadge}>
            <Ionicons name="hourglass-outline" size={12} color="#92400E" style={styles.badgeIcon} />
            <Text style={styles.quantityText}>{quantity} left</Text>
          </View>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.content}>
        {/* Title and Restaurant */}
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>

        <View style={styles.restaurantRow}>
          <Ionicons name="storefront-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.restaurantName} numberOfLines={1}>
            {restaurant}
          </Text>
        </View>

        {/* Pickup Time & Distance Info */}
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={colors.primaryDark} />
            <Text style={styles.metaText} numberOfLines={1}>
              {pickupTime}
            </Text>
          </View>

          <View style={styles.distanceBadge}>
            <Ionicons name="location-outline" size={13} color={colors.textSecondary} />
            <Text style={styles.distanceText}>{distance}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Price & Action Row */}
        <View style={styles.footerRow}>
          <View style={styles.priceColumn}>
            <Text style={styles.originalPrice}>Rs. {originalPrice.toLocaleString()}</Text>
            <View style={styles.discountedPriceRow}>
              <Text style={styles.currencyPrefix}>Rs. </Text>
              <Text style={styles.discountedPrice}>{discountedPrice.toLocaleString()}</Text>
            </View>
          </View>

          {/* View Details Button */}
          <View style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 165,
    backgroundColor: colors.surfaceAlt,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.discountBadge,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeIcon: {
    marginRight: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  quantityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warningLight,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  quantityText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  metaText: {
    fontSize: 12,
    color: colors.textPrimary,
    marginLeft: 5,
    fontWeight: '500',
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 3,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceColumn: {
    justifyContent: 'center',
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginBottom: 1,
  },
  discountedPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencyPrefix: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 4,
  },
});
