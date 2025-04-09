import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Monitor, Home, Music, Settings, HelpCircle, LogOut, X } from 'lucide-react-native';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export const Sidebar = ({ isOpen, onClose, userName = 'Vaishali' }: SidebarProps) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // Reset position before rendering to ensure animation works
      slideAnim.setValue(-300);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (visible) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onClose();
    });
  };

  const renderNavItem = (icon: JSX.Element, label: string, onPress: () => void) => {
    return (
      <Pressable style={styles.navItem} onPress={onPress}>
        {icon}
        <Text style={styles.navLabel}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.sidebarWrapper,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <BlurView intensity={40} tint="default" style={styles.sidebar}>
          <View style={styles.sidebarBackground} />
          <LinearGradient
            colors={['rgba(255,255,255,0.15)', 'rgba(183,140,101,0.1)', 'rgba(255,255,255,0.08)']}
            style={styles.gradientOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.frostLayer} />

          <Pressable style={styles.closeButton} onPress={handleClose}>
            <X color="#FFFFFF" size={20} />
          </Pressable>

          <View style={styles.sidebarContent}>
            <View style={styles.userSection}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop' }}
                style={styles.avatar}
              />
              <Text style={styles.greeting}>Hi {userName}</Text>
              <Pressable style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </Pressable>
            </View>

            <ScrollView style={styles.navSection}>
              {renderNavItem(
                <Users color="#F9F9F9" size={22} style={styles.navIcon} />,
                'Manage Users',
                () => {}
              )}
              {renderNavItem(
                <Monitor color="#F9F9F9" size={22} style={styles.navIcon} />,
                'Devices',
                () => {}
              )}
              {renderNavItem(
                <Home color="#F9F9F9" size={22} style={styles.navIcon} />,
                'Rooms',
                () => {}
              )}
              {renderNavItem(
                <Music color="#F9F9F9" size={22} style={styles.navIcon} />,
                'Music',
                () => {}
              )}
              {renderNavItem(
                <Settings color="#F9F9F9" size={22} style={styles.navIcon} />,
                'Settings',
                () => {}
              )}
              {renderNavItem(
                <HelpCircle color="#F9F9F9" size={22} style={styles.navIcon} />,
                'Help',
                () => {}
              )}
            </ScrollView>

            <Pressable style={styles.logoutButton}>
              <LogOut color="#F9F9F9" size={22} style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
          </View>
        </BlurView>
      </Animated.View>

      <Pressable style={styles.overlay} onPress={handleClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  },
  sidebarWrapper: {
    position: 'absolute',
    top: '10%',
    bottom: '8%',
    left: 0,
    width: '75%',
    maxWidth: 280,
    zIndex: 1,
  },
  sidebar: {
    flex: 1,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  sidebarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(183, 140, 101, 0.65)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  frostLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRightWidth: 0.5,
    borderRightColor: 'rgba(255, 255, 255, 0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  sidebarContent: {
    flex: 1,
    paddingVertical: 35,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  userSection: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F9F9F9',
    marginBottom: 8,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  editProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  editProfileText: {
    color: '#F9F9F9',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  navSection: {
    flex: 1,
    marginBottom: 20,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  navIcon: {
    marginRight: 16,
  },
  navLabel: {
    fontSize: 16,
    color: '#F9F9F9',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoutIcon: {
    marginRight: 16,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9F9F9',
    fontFamily: 'SpaceGrotesk-Bold',
  },
});
