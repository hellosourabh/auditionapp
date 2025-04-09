import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Home, MessageSquare, ClipboardCheck, User, Star } from 'lucide-react-native';

interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavBar = ({ activeTab, onTabChange }: BottomNavBarProps) => {
  const renderIcon = (name: string, icon: JSX.Element, title: string, hasNewBadge: boolean = false) => {
    const isActive = activeTab === name;

    return (
      <Pressable
        style={[
          styles.iconContainer,
          isActive && styles.activeIconContainer
        ]}
        onPress={() => onTabChange(name)}
      >
        {isActive ? (
          <View style={styles.activeIconWrapper}>
            <View style={styles.activeIconContent}>
              {icon}
              <Text style={styles.iconText}>{title}</Text>
            </View>
            {hasNewBadge && <View style={styles.newBadge}><Text style={styles.newBadgeText}>New</Text></View>}
          </View>
        ) : (
          <View style={styles.inactiveIconWrapper}>
            {icon}
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        {renderIcon(
          'home',
          <Home size={24} color={activeTab === 'home' ? '#FFFFFF' : '#2E2E2E'} />,
          'Home',
          true
        )}
        {renderIcon(
          'messaging',
          <MessageSquare size={24} color={activeTab === 'messaging' ? '#FFFFFF' : '#2E2E2E'} />,
          'Messaging'
        )}
        {renderIcon(
          'applied',
          <ClipboardCheck size={24} color={activeTab === 'applied' ? '#FFFFFF' : '#2E2E2E'} />,
          'Applied'
        )}
        {renderIcon(
          'profile',
          <User size={24} color={activeTab === 'profile' ? '#FFFFFF' : '#2E2E2E'} />,
          'Profile'
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FCFCFC',
    height: 72,
    paddingHorizontal: 16,
    borderRadius: 24,
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    transform: [{ translateY: -2 }],
  },
  activeIconWrapper: {
    backgroundColor: '#0B0E1B',
    minWidth: 100,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 12,
  },
  activeIconContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    marginLeft: 6,
  },
  inactiveIconWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FDCB58',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  newBadgeText: {
    color: '#0B0E1B',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'SpaceGrotesk-Bold',
  },
});
