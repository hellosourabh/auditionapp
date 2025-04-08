import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter';
import { Camera, Users, User } from 'lucide-react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Inter-Bold': Inter_700Bold,
    'Inter-Regular': Inter_400Regular,
  });

  const buttonOffset = useSharedValue(0);
  
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      buttonOffset.value = Math.max(0, Math.min(e.translationX, 200));
    })
    .onEnd(() => {
      if (buttonOffset.value > 100) {
        buttonOffset.value = withSpring(200);
        router.push('/home');
      } else {
        buttonOffset.value = withSpring(0);
      }
    });

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: buttonOffset.value }],
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
          <Text style={styles.title}>Audition,</Text>
          <Text style={styles.subtitle}>it's your time to glam</Text>
        </View>

        <View style={styles.selectionContainer}>
          <Text style={styles.chooseText}>Who Are You?</Text>
          
          <View style={styles.optionsGrid}>
            <Pressable style={[styles.option, styles.activeOption]}>
              <Camera size={32} color="#9EFFCB" style={styles.optionIcon} />
              <Text style={styles.optionText}>Director</Text>
            </Pressable>
            
            <Pressable style={styles.option}>
              <User size={32} color="#fff" style={styles.optionIcon} />
              <Text style={styles.optionText}>Actor</Text>
            </Pressable>
            
            <Pressable style={styles.option}>
              <Users size={32} color="#fff" style={styles.optionIcon} />
              <Text style={styles.optionText}>Model</Text>
            </Pressable>
          </View>

          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.searchButtonContainer, buttonStyle]}>
              <View style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Continue</Text>
                <Text style={styles.arrowIcon}>››</Text>
              </View>
            </Animated.View>
          </GestureDetector>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 28,
    fontFamily: 'Inter-Regular',
    color: '#fff',
    opacity: 0.9,
    marginTop: 8,
    letterSpacing: -0.3,
  },
  selectionContainer: {
    marginBottom: 40,
  },
  chooseText: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 24,
    letterSpacing: -0.3,
  },
  optionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  option: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 20,
    width: '30%',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  activeOption: {
    backgroundColor: 'rgba(158, 255, 203, 0.15)',
  },
  optionIcon: {
    marginBottom: 12,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  searchButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    width: '100%',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  searchButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.3,
  },
  arrowIcon: {
    marginLeft: 8,
    color: '#000',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
});