import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { FOOD_CATEGORIES, MOCK_FOOD_ITEMS } from '../data/mockFood';
import SearchBar from '../components/SearchBar';
import CategoryButton from '../components/CategoryButton';
import FoodCard from '../components/FoodCard';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Friendly time-based greeting (fallback "Good evening!")
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning! 👋';
    if (hour < 17) return 'Good afternoon! 👋';
    return 'Good evening! 👋';
  }, []);

  // Filtered food list based on category & search term
  const filteredFoodItems = useMemo(() => {
    return MOCK_FOOD_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.restaurant.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCardPress = (foodItem) => {
    navigation.navigate('FoodDetails', { foodItem });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Top Header Area */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          {/* Logo & Brand Name */}
          <View style={styles.logoRow}>
            <View style={styles.logoIconBg}>
              <Ionicons name="leaf" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.brandTitle}>
              Surplus<Text style={styles.brandTitleAccent}>Food</Text>
            </Text>
          </View>

          {/* Location Indicator */}
          <View style={styles.locationBadge}>
            <Ionicons name="location" size={13} color={colors.primary} />
            <Text style={styles.locationText} numberOfLines={1}>
              Near you • Colombo
            </Text>
          </View>
        </View>

        {/* Greeting & Subtitle */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Text style={styles.subtitleText}>
            Rescue fresh surplus meals before closing time
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search food or restaurants"
          />
        </View>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Mission / Eco Impact Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <View style={styles.bannerTag}>
              <Text style={styles.bannerTagText}>REDUCE FOOD WASTE</Text>
            </View>
            <Text style={styles.bannerTitle}>Save Good Food, Save Money</Text>
            <Text style={styles.bannerSubtext}>
              Up to 50% discount on delicious meals from top local spots.
            </Text>
          </View>
          <View style={styles.bannerIconCircle}>
            <Ionicons name="bag-handle" size={26} color={colors.primary} />
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {FOOD_CATEGORIES.map((category) => (
              <CategoryButton
                key={category.id}
                label={category.label}
                icon={category.icon}
                isSelected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Nearby / Available Food Header */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Nearby Surplus Food</Text>
            <Text style={styles.sectionSubtitle}>
              Available for pickup today
            </Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{filteredFoodItems.length} available</Text>
          </View>
        </View>

        {/* Food List or Empty State */}
        {filteredFoodItems.length > 0 ? (
          filteredFoodItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onPress={() => handleCardPress(item)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No surplus food found</Text>
            <Text style={styles.emptySubtitle}>
              We couldn't find any items matching your filters.
            </Text>
            <TouchableOpacity
              onPress={handleClearFilters}
              style={styles.clearFiltersButton}
              activeOpacity={0.8}
            >
              <Text style={styles.clearFiltersText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconBg: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  brandTitleAccent: {
    color: colors.primary,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    maxWidth: 160,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryDark,
    marginLeft: 4,
  },
  greetingContainer: {
    marginBottom: 12,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  searchSection: {
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  bannerContent: {
    flex: 1,
    marginRight: 10,
  },
  bannerTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  bannerTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#064E3B',
    marginBottom: 3,
  },
  bannerSubtext: {
    fontSize: 12,
    color: '#047857',
    lineHeight: 16,
  },
  bannerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  categoriesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  categoriesList: {
    paddingRight: 8,
    paddingVertical: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  countBadge: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  countText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  clearFiltersButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  clearFiltersText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
