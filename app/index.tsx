import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFonts, SpaceGrotesk_700Bold, SpaceGrotesk_400Regular } from '@expo-google-fonts/space-grotesk';
import { ChevronRight, Theater, Camera, Music, Mic, Users } from 'lucide-react-native';
import { AuditionLogo } from '@/components/AuditionLogo';
import { AuditionCircleLogo } from '@/components/AuditionCircleLogo';

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
    { id: 'acting', name: 'Acting', icon: <Theater color="#FFFFFF" size={20} /> },
    { id: 'modeling', name: 'Modeling', icon: <Camera color="#FFFFFF" size={20} /> },
    { id: 'dancing', name: 'Dancing', icon: <Music color="#FFFFFF" size={20} /> },
    { id: 'singing', name: 'Singing', icon: <Mic color="#FFFFFF" size={20} /> },
    { id: 'extras', name: 'Extras', icon: <Users color="#FFFFFF" size={20} /> },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background Video */}
      <Video
        source={{ uri: 'https://www.theauditionapp.com/wp-content/uploads/2025/04/5e128e1b36a5c63d030098fa8184d728.mp4' }}
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
          {/* Logo in circle at the top */}
          <View style={styles.logoCircleContainer}>
            <AuditionCircleLogo size={100} />
          </View>

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
          <BlurView intensity={25} tint="dark" style={styles.categoriesContainer}>
            <LinearGradient
              colors={['rgba(100, 100, 100, 0.7)', 'rgba(80, 80, 80, 0.8)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />

            {/* Inner border for more depth */}
            <View style={styles.categoriesInnerBorder} />

            <View style={styles.categoriesContent}>
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
              <Pressable
                style={styles.nextButton}
                onPress={() => router.push('/(auth)/signin')}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <ChevronRight color="#FFFFFF" size={20} />
              </Pressable>
            </View>
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

  // Logo in circle
  logoCircleContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  logoImageContainer: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: 85,
    height: 85,
  },
  logoBlur: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Brand Styling
  brandContainer: {
    alignItems: 'center',
    marginTop: 80, // Reduced top margin to move content up
    position: 'relative',
    height: 300, // Reduced height to prevent pushing content down
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
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: 'hidden',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 0,
    position: 'relative',
  },
  categoriesInnerBorder: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 0,
    borderTopLeftRadius: 59,
    borderTopRightRadius: 59,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomWidth: 0,
    zIndex: 1,
  },
  categoriesContent: {
    position: 'relative',
    zIndex: 2,
  },
  categoriesTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#FFFFFF',
    marginBottom: 15,
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedCategoryPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    // Enhanced shadow for selected state but with inset shadow to prevent white line
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    // Fix for white line in the middle
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 1 },
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    width: 120,
    alignSelf: 'center',
    // Match active category pill shadow
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    width: 120,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
    marginRight: 8,
    textAlign: 'left',
  },
});