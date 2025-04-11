import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFonts, SpaceGrotesk_700Bold, SpaceGrotesk_400Regular } from '@expo-google-fonts/space-grotesk';
import { ChevronRight, Car, Truck, Bike } from 'lucide-react-native';
import { AuditionLogo } from '@/components/AuditionLogo';

export default function WelcomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('acting');
  const [fontsLoaded] = useFonts({
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
    'SpaceGrotesk-Regular': SpaceGrotesk_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const categories = [
    { id: 'acting', name: 'Acting', icon: <Car color="#FFFFFF" size={20} /> },
    { id: 'modeling', name: 'Modeling', icon: <Car color="#FFFFFF" size={20} /> },
    { id: 'dancing', name: 'Dancing', icon: <Car color="#FFFFFF" size={20} /> },
    { id: 'singing', name: 'Singing', icon: <Truck color="#FFFFFF" size={20} /> },
    { id: 'extras', name: 'Extras', icon: <Bike color="#FFFFFF" size={20} /> },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background Video */}
      <Video
        source={{ uri: 'https://www.theauditionapp.com/wp-content/uploads/2025/04/a0efebd34e8fc9544a4120229b59b0a2.mp4' }}
        style={styles.video}
        shouldPlay
        isLooping
        // @ts-ignore - ResizeMode.COVER is valid but TypeScript doesn't recognize it
        resizeMode="cover"
        isMuted
      />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />

      <View style={styles.content}>
        {/* Top Section */}
        <View style={styles.topSection}>
          {/* iOS Status Bar Styling (just for visual effect) */}
          <View style={styles.statusBarIcons}>
            <Text style={styles.timeText}>9:41</Text>
            <View style={styles.notchArea} />
            <View style={styles.batteryArea}>
              <View style={styles.batteryIcon} />
            </View>
          </View>

          {/* Guest Enter Button */}
          <Pressable style={styles.guestButton} onPress={() => router.push('/(auth)/signin')}>
            <BlurView intensity={20} tint="dark" style={styles.guestButtonBlur}>
              <Text style={styles.guestButtonText}>Guest enter</Text>
            </BlurView>
          </Pressable>

          {/* Brand Name with Grid Effect - positioned on one area of screen */}
          <View style={styles.brandContainer}>
            <View style={styles.logoWrapper}>
              {/* SVG Logo with vertical grid effect */}
              <AuditionLogo width={350} height={350} />

              {/* Subtitle */}
              <Text style={styles.brandSubtitle}>it's your time to glam</Text>
            </View>
          </View>
        </View>

        {/* Bottom Section - Car Categories */}
        <View style={styles.bottomSection}>
          <BlurView intensity={40} tint="dark" style={styles.categoriesContainer}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.9)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />

            <Text style={styles.categoriesTitle}>Choose your talent</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScrollContent}
            >
              {categories.map((category) => (
                <Pressable
                  key={category.id}
                  style={[styles.categoryPill, selectedCategory === category.id && styles.selectedCategoryPill]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <View style={styles.categoryIconContainer}>
                    {category.icon}
                  </View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Navigation Controls */}
            <View style={styles.navigationControls}>
              <Pressable style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
              </Pressable>

              <Pressable
                style={styles.nextButton}
                onPress={() => router.push('/(auth)/signin')}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <ChevronRight color="#000" size={20} />
              </Pressable>
            </View>
          </BlurView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 0,
  },

  // Top Section Styles
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },

  // iOS Status Bar Styling
  statusBarIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  notchArea: {
    width: 120,
    height: 20,
  },
  batteryArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryIcon: {
    width: 25,
    height: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 3,
    marginLeft: 5,
  },

  // Guest Button
  guestButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 10,
  },
  guestButtonBlur: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  guestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
  },

  // Brand Styling
  brandContainer: {
    alignItems: 'center',
    marginTop: 100, // Push content down more
    position: 'relative',
    height: 350, // Increased height for the larger logo
    marginBottom: 20, // Less space below
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 60,
    fontFamily: 'SpaceGrotesk-Bold',
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  brandOutline: {
    position: 'absolute',
    fontSize: 60,
    fontFamily: 'SpaceGrotesk-Bold',
    fontWeight: '900',
    color: '#FFFFFF', // White text color instead of transparent
    letterSpacing: 2,
    // No text shadow or border to avoid the glowing box effect
  },
  brandSubtitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // Bottom Section - Categories
  bottomSection: {
    width: '100%',
    marginTop: 'auto',
  },
  categoriesContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  categoriesTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoriesScrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 15,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedCategoryPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  categoryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
  },

  // Navigation Controls
  navigationControls: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButtonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#9AE66E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#9AE66E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    width: 120,
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
    marginRight: 8,
    textAlign: 'left',
  },
});