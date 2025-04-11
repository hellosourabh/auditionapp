import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, Pressable, Platform, Animated } from 'react-native';
import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, LayoutGrid, Heart, MessageSquare, Menu } from 'lucide-react-native';
import { TwoSliders } from '@/components/TwoSliders';
import { BottomNavBar } from '@/components/BottomNavBar';
import { Sidebar } from '@/components/Sidebar';
import { ProductDetail } from '@/components/ProductDetail';
import { useFonts, SpaceGrotesk_700Bold, SpaceGrotesk_400Regular } from '@expo-google-fonts/space-grotesk';

const HORSE_DATA = [
  {
    id: '1',
    title: 'Black Stallion',
    location: 'San Francisco, USA-Black Betty',
    image: require('@/assets/images/1.png'),
    owner: {
      name: 'Randal Ford',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop'
    },
    isFavorite: true
  },
  {
    id: '2',
    title: 'Brown Beauty',
    location: 'Montreal, Canada-Deep Eyes',
    image: require('@/assets/images/2.png'),
    owner: {
      name: 'Sasha Ho',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop'
    },
    isFavorite: true
  },
  {
    id: '3',
    title: 'Grey Majesty',
    location: 'Munich, Germany-Whirlwind',
    image: require('@/assets/images/3.png'),
    owner: {
      name: 'Alyana Thomson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop'
    },
    isFavorite: false
  }
];

export default function ExploreScreen() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(
    HORSE_DATA.filter(horse => horse.isFavorite).map(horse => horse.id)
  );

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // State to control actual visibility after animation completes
  const [searchVisible, setSearchVisible] = useState(false);

  // Handle search popup animations
  useEffect(() => {
    if (isSearchActive) {
      setSearchVisible(true);
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else if (searchVisible) {
      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start(() => {
        setSearchVisible(false);
      });
    }
  }, [isSearchActive]);

  const [fontsLoaded] = useFonts({
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
    'SpaceGrotesk-Regular': SpaceGrotesk_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    );
  };

  // Function to handle closing the search with animation
  const closeSearch = () => {
    setIsSearchActive(false);
  };

  // Function to handle opening the product detail
  const openProductDetail = (product: any) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  // Function to handle closing the product detail
  const closeProductDetail = () => {
    setIsProductDetailOpen(false);
  };

  // Create dynamic styles based on theme
  const dynamicStyles = {
    container: {
      ...styles.container,
      backgroundColor: isDark ? '#121212' : '#F9F9F9',
    },
    card: {
      ...styles.card,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      // Ensure these properties are explicitly set to preserve the card appearance
      borderRadius: 30,
      shadowColor: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 12,
      overflow: 'visible',
    },
    cardContent: {
      ...styles.cardContent,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 30,
      overflow: 'visible',
    },
    cardTitle: {
      ...styles.cardTitle,
      color: isDark ? '#FFFFFF' : '#333333',
    },
    cardLocation: {
      ...styles.cardLocation,
      color: isDark ? '#CCCCCC' : '#666666',
    },
    ownerName: {
      ...styles.ownerName,
      color: isDark ? '#CCCCCC' : '#666666',
    },
    favoriteButton: {
      ...styles.favoriteButton,
      backgroundColor: isDark ? 'rgba(50, 50, 50, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    },
  };

  return (
    <View style={dynamicStyles.container}>
      <View style={styles.header}>
        <Video
          source={{ uri: 'https://www.theauditionapp.com/wp-content/uploads/2025/04/a0efebd34e8fc9544a4120229b59b0a2.mp4' }}
          style={styles.headerImage}
          shouldPlay
          isLooping
          resizeMode="cover"
          isMuted
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.2)']}
          style={styles.headerGradient}
        />
        <View style={styles.headerContent}>
          <View style={styles.topIcons}>
            <Pressable onPress={() => setIsSidebarOpen(true)}>
              <TwoSliders color="rgba(255, 255, 255, 0.7)" size={24} />
            </Pressable>
            <MessageSquare color="rgba(255, 255, 255, 0.7)" size={24} />
          </View>

          <Text style={styles.title}>Horse</Text>
          <Text style={styles.title}>Riding Club</Text>

          <Pressable
            style={styles.searchContainer}
            onPress={() => setIsSearchActive(true)}
          >
            <Search color="#fff" size={20} style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Search</Text>
            <LayoutGrid color="#fff" size={20} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {HORSE_DATA.map((horse) => (
          <Pressable
            key={horse.id}
            style={dynamicStyles.card}
            onPress={() => openProductDetail(horse)}
          >
            <View style={dynamicStyles.cardContent}>
              <Pressable
                style={dynamicStyles.favoriteButton}
                onPress={() => toggleFavorite(horse.id)}
              >
                <Heart
                  size={18}
                  color={favorites.includes(horse.id) ? '#FFA726' : '#DADADA'}
                  fill={favorites.includes(horse.id) ? '#FFA726' : 'none'}
                />
              </Pressable>

              <View style={styles.cardMainContent}>
                <View style={styles.cardText}>
                  <Text style={dynamicStyles.cardTitle}>{horse.title}</Text>
                  <Text style={dynamicStyles.cardLocation} numberOfLines={1} ellipsizeMode="tail">{horse.location}</Text>
                  <View style={styles.ownerContainer}>
                    <Image
                      source={{ uri: horse.owner.avatar }}
                      style={styles.ownerAvatar}
                    />
                    <Text style={dynamicStyles.ownerName}>{horse.owner.name}</Text>
                  </View>
                </View>

                <Image
                  source={horse.image}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      {searchVisible && (
        <Animated.View
          style={[
            styles.searchOverlay,
            { opacity: fadeAnim }
          ]}
        >
          <BlurView
            style={[StyleSheet.absoluteFill, styles.blurView]}
            intensity={10}
            tint="default"
          >
            <Pressable
              style={styles.overlayBackground}
              onPress={closeSearch}
            >
              <View style={styles.frostTexture} />
              <LinearGradient
                colors={['rgba(255,255,255,0.1)', 'rgba(200,200,200,0.15)', 'rgba(255,255,255,0.1)']}
                style={styles.gradientOverlay}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </Pressable>
          </BlurView>
          <Animated.View
            style={[
              styles.searchPopup,
              {
                transform: [
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            <BlurView intensity={80} tint="dark" style={styles.searchPopupContent}>
              <Search color="#fff" size={20} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInputActive}
                placeholder="Search"
                placeholderTextColor="rgba(255,255,255,0.8)"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              <Pressable onPress={closeSearch}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </Pressable>
            </BlurView>
          </Animated.View>
        </Animated.View>
      )}

      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userName="Vaishali"
      />

      {selectedProduct && (
        <ProductDetail
          isVisible={isProductDetailOpen}
          onClose={closeProductDetail}
          product={selectedProduct}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingBottom: 100, // Add padding for the bottom navigation bar
  },
  header: {
    height: '40%',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    overflow: 'hidden',
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerContent: {
    padding: 24,
    paddingTop: 80,
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  title: {
    fontSize: 34,
    color: '#FFFFFF',
    fontFamily: 'SpaceGrotesk-Bold',
    letterSpacing: -0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    marginTop: 24,
    padding: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    flex: 1,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
    marginRight: 8,
  },
  searchInputActive: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
    marginRight: 8,
  },
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(200,200,200,0.25)',
  },
  blurView: {
    flex: 1,
  },
  noiseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    opacity: 0.4,
  },
  frostTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    opacity: 0.9,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  searchPopup: {
    position: 'absolute',
    top: 170,
    left: 24,
    right: 24,
    zIndex: 101,
  },
  searchPopupContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.7)',
    borderRadius: 30,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  cancelButton: {
    color: '#FF9980',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    marginTop: -40,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 10,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'visible',
  },
  cardContent: {
    padding: 18,
    paddingLeft: 50, // Leave space for the heart on the left
    height: 150,
    position: 'relative',
    overflow: 'visible',
  },
  cardMainContent: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 15,
    paddingRight: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 6,
    borderRadius: 20,
    zIndex: 1,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#111111',
    marginBottom: 3,
  },
  cardLocation: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 8,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  ownerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  ownerName: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#111111',
  },
  cardImage: {
    width: '50%',
    height: '100%',
    borderRadius: 18,
    marginRight: -25,
    transform: [{ scale: 1.3 }],
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    bottom: 0,
  },
});