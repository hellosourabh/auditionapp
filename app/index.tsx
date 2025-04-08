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
  Extrapolate
} from 'react-native-reanimated';

export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
  });

  const buttonOffset = useSharedValue(0);
  const arrowsOffset = useSharedValue(0);
  
  // Start the arrows animation when component mounts
  React.useEffect(() => {
    arrowsOffset.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1, // Infinite repetition
      true // Reverse animation
    );
  }, []);
  
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      buttonOffset.value = Math.max(0, Math.min(e.translationX, 200));
    })
    .onEnd(() => {
      if (buttonOffset.value > 100) {
        buttonOffset.value = withSpring(200, { damping: 15 });
        router.push('/home');
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
                  colors={['#9EFFCB', '#3DD598']}
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
  chooseText: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk-Bold',
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
    fontFamily: 'SpaceGrotesk-Bold',
  },
  searchTrack: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    height: 56,
  },
  searchTrackBackground: {
    position: 'absolute',
    top: 0,
    left: '50%',
    bottom: 0,
    backgroundColor: '#fff',
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
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    ...Platform.select({
      web: {
        cursor: 'grab',
      },
    }),
  },
  searchButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
    letterSpacing: -0.3,
  },
  arrowIcon: {
    marginLeft: 8,
    color: '#000',
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
  },
});