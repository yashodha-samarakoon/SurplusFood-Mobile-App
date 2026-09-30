import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function FoodDetailsScreen({ route, navigation }) {
  const foodItem = route?.params?.foodItem;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      {/* Top Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food Details</Text>
        <View style={styles.placeholderRight} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Placeholder Banner */}
        <View style={styles.placeholderCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="restaurant" size={32} color={colors.primary} />
          </View>
          <Text style={styles.screenHeading}>Food Details</Text>
          <Text style={styles.placeholderNote}>
            Stage 1 Navigation Route Active
          </Text>
          <Text style={styles.stageDescription}>
            Full food details, detailed ingredient notes, dietary tags, pickup instructions,
            and order placement will be implemented in the next development stage.
          </Text>
        </View>

        {/* Selected Item Preview (if navigated with item data) */}
        {foodItem ? (
          <View style={styles.itemPreviewCard}>
            <Text style={styles.previewSectionTitle}>Selected Item Preview</Text>
            {foodItem.image ? (
              <Image
                source={{ uri: foodItem.image }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            ) : null}

            <View style={styles.previewDetails}>
              <Text style={styles.previewName}>{foodItem.name}</Text>
              <Text style={styles.previewRestaurant}>{foodItem.restaurant}</Text>

              <View style={styles.priceRow}>
                <Text style={styles.previewPrice}>
                  Rs. {foodItem.discountedPrice?.toLocaleString()}
                </Text>
                <Text style={styles.previewOriginalPrice}>
                  Rs. {foodItem.originalPrice?.toLocaleString()}
                </Text>
                <View style={styles.previewDiscountBadge}>
                  <Text style={styles.previewDiscountText}>
                    {foodItem.discountPercentage}% OFF
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.infoText}>Pickup: {foodItem.pickupTime}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.infoText}>Distance: {foodItem.distance}</Text>
              </View>
            </View>
          </View>
        ) : null}

        {/* Back to Home Button */}
        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backHomeText}>← Back to Home</Text>
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
    fontWeight: '700',
    color: colors.textPrimary,
  },
  placeholderRight: {
    width: 40,
  },
  content: {
    padding: 20,
  },
  placeholderCard: {
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
    marginBottom: 14,
  },
  screenHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  placeholderNote: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  stageDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  itemPreviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 20,
  },
  previewSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  previewImage: {
    width: '100%',
    height: 150,
  },
  previewDetails: {
    padding: 16,
  },
  previewName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  previewRestaurant: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  previewPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginRight: 8,
  },
  previewOriginalPrice: {
    fontSize: 13,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  previewDiscountBadge: {
    backgroundColor: colors.discountBadge,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  previewDiscountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  backHomeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  backHomeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
