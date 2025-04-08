import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Video } from 'expo-av';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { ChevronLeft } from 'lucide-react-native';

export default function SignInScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: 'https://www.theauditionapp.com/wp-content/uploads/2025/04/d41f4b20ba12328cc745932d9797e74f.mp4' }}
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
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#fff" size={24} />
        </Pressable>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Login to your account</Text>

          <View style={styles.form}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#rgba(255,255,255,0.5)"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#rgba(255,255,255,0.5)"
              secureTextEntry
              style={styles.input}
            />

            <View style={styles.rememberContainer}>
              <View style={styles.checkboxContainer}>
                <Pressable style={styles.checkbox} />
                <Text style={styles.rememberText}>Remember me</Text>
              </View>
              <Link href="/forgot-password" style={styles.forgotText}>
                Forgot Password?
              </Link>
            </View>

            <Pressable style={styles.loginButton}>
              <LinearGradient
                colors={['rgba(255, 99, 71, 0.2)', 'rgba(139, 0, 0, 0.1)']}
                style={styles.buttonGradient}
              >
                <Text style={styles.loginText}>Login</Text>
              </LinearGradient>
            </Pressable>

            <View style={styles.signupPrompt}>
              <Text style={styles.promptText}>Don't have an account? </Text>
              <Link href="/signup" style={styles.signupLink}>
                Sign up
              </Link>
            </View>
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
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -100,
  },
  title: {
    fontSize: 32,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#rgba(255,255,255,0.7)',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  input: {
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 28,
    paddingHorizontal: 24,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FF6347',
  },
  rememberText: {
    color: '#fff',
    fontSize: 14,
  },
  forgotText: {
    color: '#FF6347',
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 99, 71, 0.3)',
  },
  buttonGradient: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  promptText: {
    color: '#rgba(255,255,255,0.7)',
  },
  signupLink: {
    color: '#FF6347',
  },
});