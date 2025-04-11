import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Pressable, Image, TextInput, Animated, BackHandler } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import { Search, Plus, ArrowLeft, Mic, Send, Play, Pause } from 'lucide-react-native';
import { TwoSliders } from '@/components/TwoSliders';
import { useFonts, SpaceGrotesk_700Bold, SpaceGrotesk_400Regular } from '@expo-google-fonts/space-grotesk';
import { BottomNavBar } from '@/components/BottomNavBar';
import { ChatList } from '@/components/ChatList';
import { ChatView } from '@/components/ChatView';
import { ContactsCarousel } from '@/components/ContactsCarousel';
import { Sidebar } from '@/components/Sidebar';

// Mock data for contacts
const CONTACTS_DATA = [
  {
    id: '1',
    name: 'Randal Ford',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Sasha Ho',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop',
    isOnline: false,
  },
  {
    id: '4',
    name: 'Olivia Kim',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop',
    isOnline: true,
  },
  {
    id: '5',
    name: 'David Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop',
    isOnline: false,
  },
];

// Mock data for chats
const CHATS_DATA = [
  {
    id: '1',
    contactId: '1',
    lastMessage: 'Hey, are you available for a photoshoot next week?',
    timestamp: '10:30 AM',
    unread: 2,
  },
  {
    id: '2',
    contactId: '2',
    lastMessage: 'I loved your portfolio! Can we discuss a potential collaboration?',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    contactId: '3',
    lastMessage: 'The casting director was impressed with your audition tape.',
    timestamp: 'Yesterday',
    unread: 1,
  },
  {
    id: '4',
    contactId: '4',
    lastMessage: 'Please send me your updated resume when you get a chance.',
    timestamp: 'Monday',
    unread: 0,
  },
  {
    id: '5',
    contactId: '5',
    lastMessage: 'Are you interested in a commercial shoot next month?',
    timestamp: 'Sunday',
    unread: 0,
  },
];

// Mock data for messages in a conversation
const MESSAGES_DATA = [
  {
    id: '1',
    senderId: '1', // contact
    text: 'Hey, are you available for a photoshoot next week?',
    timestamp: '10:30 AM',
    isVoice: false,
  },
  {
    id: '2',
    senderId: 'me', // user
    text: 'Hi Randal! Yes, I should be available. What days were you thinking?',
    timestamp: '10:32 AM',
    isVoice: false,
  },
  {
    id: '3',
    senderId: '1',
    text: 'Great! I was thinking Tuesday or Wednesday afternoon.',
    timestamp: '10:35 AM',
    isVoice: false,
  },
  {
    id: '4',
    senderId: 'me',
    text: '',
    timestamp: '10:40 AM',
    isVoice: true,
    duration: '0:42',
  },
  {
    id: '5',
    senderId: '1',
    text: 'Perfect! I\'ll send you the details and location soon.',
    timestamp: '10:45 AM',
    isVoice: false,
  },
];

export default function MessagingScreen() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('messaging');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Animation values for search
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [searchVisible, setSearchVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
    'SpaceGrotesk-Regular': SpaceGrotesk_400Regular,
  });

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      if (selectedChat) {
        // If in chat view, go back to chat list
        setSelectedChat(null);
        return true; // Prevent default behavior
      }
      // Otherwise, let the default back behavior happen
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Clean up the event listener
  }, [selectedChat]);

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

  // Function to handle closing the search with animation
  const closeSearch = () => {
    setIsSearchActive(false);
  };

  if (!fontsLoaded) {
    return null;
  }

  // Find the selected contact
  const selectedContact = selectedChat
    ? CONTACTS_DATA.find(contact => contact.id === CHATS_DATA.find(chat => chat.id === selectedChat)?.contactId)
    : null;

  // Dynamic styles based on theme
  const dynamicStyles = {
    container: {
      ...styles.container,
      backgroundColor: isDark ? '#121212' : '#F9F9F9',
    },
    header: {
      ...styles.header,
      backgroundColor: isDark ? '#2A2A2A' : '#0B0E1B',
    },
    title: {
      ...styles.title,
      color: '#FFFFFF',
    },
    searchContainer: {
      ...styles.searchContainer,
      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
    },
    searchInput: {
      ...styles.searchInput,
      color: '#FFFFFF',
    },
    contentPanel: {
      ...styles.contentPanel,
      backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
    },
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would add the message to the database
      // and update the state with the new message
      setNewMessage('');
    }
  };

  // Function to handle contact selection from the carousel
  const handleContactSelect = (contactId: string) => {
    // Find the chat associated with this contact
    const chat = CHATS_DATA.find(chat => chat.contactId === contactId);
    if (chat) {
      setSelectedChat(chat.id);
    }
  };

  return (
    <View style={dynamicStyles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={dynamicStyles.header}>
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
          {selectedChat ? (
            // Chat view header
            <View style={styles.chatViewHeader}>
              <Pressable onPress={handleBackToList} style={styles.backButton}>
                <ArrowLeft color="#FFFFFF" size={24} />
              </Pressable>

              {selectedContact && (
                <View style={styles.selectedContactInfo}>
                  <Image
                    source={{ uri: selectedContact.avatar }}
                    style={styles.selectedContactAvatar}
                  />
                  <View>
                    <Text style={styles.selectedContactName}>{selectedContact.name}</Text>
                    <Text style={styles.activeStatus}>
                      {selectedContact.isOnline ? 'Active now' : 'Offline'}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            // Chat list header
            <View style={styles.chatListHeader}>
              <View style={styles.topIcons}>
                <Pressable onPress={() => setIsSidebarOpen(true)}>
                  <TwoSliders color="rgba(255, 255, 255, 0.7)" size={24} />
                </Pressable>
                <Pressable onPress={() => setIsSearchActive(true)}>
                  <Search color="rgba(255, 255, 255, 0.7)" size={24} />
                </Pressable>
              </View>

              <Text style={dynamicStyles.title}>Messages</Text>

              {/* Contacts carousel */}
              <ContactsCarousel
                contacts={CONTACTS_DATA}
                onSelectContact={handleContactSelect}
              />
            </View>
          )}
        </View>
      </View>

      {/* Content Panel */}
      <View style={dynamicStyles.contentPanel}>
        {selectedChat ? (
          // Individual chat view
          <ChatView
            messages={MESSAGES_DATA}
            contact={selectedContact!}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            isDark={isDark}
          />
        ) : (
          // Chat list view
          <ChatList
            chats={CHATS_DATA}
            contacts={CONTACTS_DATA}
            onSelectChat={setSelectedChat}
            isDark={isDark}
          />
        )}
      </View>

      {/* Bottom Navigation - only show when not in a chat */}
      {!selectedChat && <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userName="Vaishali"
      />

      {/* Search Popup */}
      {searchVisible && (
        <Animated.View
          style={[
            styles.searchOverlay,
            { opacity: fadeAnim }
          ]}
        >
          <Animated.View
            style={[
              styles.searchPopup,
              {
                transform: [{ scale: scaleAnim }]
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
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
    flex: 1,
  },
  chatListHeader: {
    flex: 1,
    paddingRight: 0,
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  chatViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  backButton: {
    padding: 8,
  },
  selectedContactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  selectedContactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedContactName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  activeStatus: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  title: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  searchPopup: {
    width: '90%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  searchPopupContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  searchInputActive: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
    marginRight: 8,
  },
  cancelButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  contentPanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});
