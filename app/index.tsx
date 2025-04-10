import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { Camera, Users, User } from 'lucide-react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

type UserType = 'director' | 'actor' | 'model';

export default function WelcomeScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<UserType>('director');
  const [fontsLoaded] = useFonts({
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
  });

  const buttonOffset = useSharedValue(0);
  const arrowsOffset = useSharedValue(0);
  
  const navigateToHome = () => {
    router.push('/(auth)/welcome');
  };

  React.useEffect(() => {
    arrowsOffset.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);
  
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      buttonOffset.value = Math.max(0, Math.min(e.translationX, 200));
    })
    .onEnd(() => {
      if (buttonOffset.value > 100) {
        buttonOffset.value = withSpring(200, { damping: 15 });
        runOnJS(navigateToHome)();
      } else {
        buttonOffset.value = withSpring(0);
      }
    });

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: buttonOffset.value }],
  }));

  const trackStyle = useAnimatedStyle(() => ({
    width: interpolate(
      buttonOffset.value,
      [0, 200],
      ['50%', '100%'],
      Extrapolate.CLAMP
    ),
    opacity: interpolate(
      buttonOffset.value,
      [0, 200],
      [0.15, 0.3],
      Extrapolate.CLAMP
    ),
  }));

  const arrowsStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowsOffset.value }],
  }));

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: 'https://www.theauditionapp.com/wp-content/uploads/2025/04/5e128e1b36a5c63d030098fa8184d728.mp4' }}
        style={styles.video}
        shouldPlay
        isLooping
        resizeMode="cover"
        isMuted
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Audition</Text>
          <Text style={styles.subtitle}>It's Your Time To Glam</Text>
        </View>

        <View style={styles.selectionContainer}>
          <View style={styles.chooseTextContainer}>
            <Text style={styles.chooseTextBold}>Who</Text>
            <Text style={styles.chooseText}>are you?</Text>
          </View>
          
          <View style={styles.optionsContainer}>
            <Pressable 
              style={[styles.option, selectedType === 'director' && styles.activeOption]}
              onPress={() => setSelectedType('director')}
            >
              <LinearGradient
                colors={selectedType === 'director' 
                  ? ['rgba(255, 99, 71, 0.2)', 'rgba(139, 0, 0, 0.1)']
                  : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.optionGradient}
              >
                <View style={styles.optionContent}>
                  <Camera 
                    size={selectedType === 'director' ? 40 : 32} 
                    color={selectedType === 'director' ? "#FF6347" : "#fff"} 
                  />
                  <Text style={[styles.optionText, selectedType === 'director' && styles.activeOptionText]}>
                    Director
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
            
            <Pressable 
              style={[styles.option, selectedType === 'actor' && styles.activeOption]}
              onPress={() => setSelectedType('actor')}
            >
              <LinearGradient
                colors={selectedType === 'actor' 
                  ? ['rgba(255, 99, 71, 0.2)', 'rgba(139, 0, 0, 0.1)']
                  : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.optionGradient}
              >
                <View style={styles.optionContent}>
                  <User 
                    size={selectedType === 'actor' ? 40 : 32} 
                    color={selectedType === 'actor' ? "#FF6347" : "#fff"} 
                  />
                  <Text style={[styles.optionText, selectedType === 'actor' && styles.activeOptionText]}>
                    Actor
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
            
            <Pressable 
              style={[styles.option, selectedType === 'model' && styles.activeOption]}
              onPress={() => setSelectedType('model')}
            >
              <LinearGradient
                colors={selectedType === 'model' 
                  ? ['rgba(255, 99, 71, 0.2)', 'rgba(139, 0, 0, 0.1)']
                  : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.optionGradient}
              >
                <View style={styles.optionContent}>
                  <Users 
                    size={selectedType === 'model' ? 40 : 32} 
                    color={selectedType === 'model' ? "#FF6347" : "#fff"} 
                  />
                  <Text style={[styles.optionText, selectedType === 'model' && styles.activeOptionText]}>
                    Model
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.searchTrack}>
            <Animated.View style={[styles.searchTrackBackground, trackStyle]} />
            <Animated.View style={[styles.arrowsContainer, arrowsStyle]}>
              <Text style={styles.trackArrow}>›</Text>
              <Text style={styles.trackArrow}>›</Text>
              <Text style={styles.trackArrow}>›</Text>
            </Animated.View>
            <GestureDetector gesture={panGesture}>
              <Animated.View style={[styles.searchButtonContainer, buttonStyle]}>
                <LinearGradient
                  colors={['rgba(255, 99, 71, 0.2)', 'rgba(139, 0, 0, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.searchButton}
                >
                  <Text style={styles.searchButtonText}>Continue</Text>
                  <Text style={styles.arrowIcon}>››</Text>
                </LinearGradient>
              </Animated.View>
            </GestureDetector>
          </View>
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
    height: '75%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 60,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 48,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#fff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 32,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#fff',
    opacity: 0.9,
    letterSpacing: -0.3,
  },
  selectionContainer: {
    marginBottom: 40,
  },
  chooseTextContainer: {
    marginBottom: 32,
  },
  chooseTextBold: {
    fontSize: 42,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#fff',
    letterSpacing: -0.3,
    lineHeight: 48,
  },
  chooseText: {
    fontSize: 42,
    color: '#fff',
    letterSpacing: -0.3,
    lineHeight: 48,
    opacity: 0.9,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 16,
  },
  option: {
    flex: 1,
    height: 180,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ scale: 0.85 }],
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  activeOption: {
    transform: [{ scale: 1 }],
    borderColor: 'rgba(255, 99, 71, 0.3)',
  },
  optionGradient: {
    height: '100%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  optionContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    gap: 12,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  activeOptionText: {
    fontSize: 18,
    color: '#FF6347',
  },
  searchTrack: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchTrackBackground: {
    position: 'absolute',
    top: 0,
    left: '50%',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  arrowsContainer: {
    position: 'absolute',
    right: 24,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trackArrow: {
    color: '#fff',
    fontSize: 24,
    opacity: 0.5,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  searchButtonContainer: {
    width: '50%',
    height: 56,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 99, 71, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backdropFilter: 'blur(10px)',
    ...Platform.select({
      web: {
        cursor: 'grab',
      },
    }),
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
    letterSpacing: -0.3,
  },
  arrowIcon: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
  },
});