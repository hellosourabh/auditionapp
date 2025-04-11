import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, Animated } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface Chat {
  id: string;
  contactId: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface ChatListProps {
  chats: Chat[];
  contacts: Contact[];
  onSelectChat: (chatId: string) => void;
  isDark: boolean;
}

export const ChatList = ({ chats, contacts, onSelectChat, isDark }: ChatListProps) => {
  const getContactById = (id: string) => {
    return contacts.find(contact => contact.id === id);
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return (
      <Animated.View
        style={[
          styles.rightAction,
          {
            transform: [{ translateX: trans }],
          },
        ]}>
        <Pressable style={styles.deleteButton}>
          <Trash2 color="#FFFFFF" size={22} />
        </Pressable>
      </Animated.View>
    );
  };

  const renderChatItem = ({ item }: { item: Chat }) => {
    const contact = getContactById(item.contactId);

    if (!contact) return null;

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <Pressable
          style={[
            styles.chatItem,
            {
              backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
              borderWidth: isDark ? 1 : 0,
              borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'transparent',
              shadowColor: isDark ? '#FFFFFF' : '#000000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: isDark ? 0.1 : 0.05,
              shadowRadius: 8,
              elevation: isDark ? 4 : 2
            }
          ]}
          onPress={() => onSelectChat(item.id)}
        >
          <Image source={{ uri: contact.avatar }} style={styles.avatar} />

          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <Text style={[
                styles.contactName,
                { color: isDark ? '#FFFFFF' : '#0B0E1B' }
              ]}>
                {contact.name}
              </Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>

            <View style={styles.messageRow}>
              <Text
                style={[
                  styles.messagePreview,
                  { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(11,14,27,0.7)' }
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.lastMessage}
              </Text>

              {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>{item.unread}</Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </Swipeable>
    );
  };

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={renderChatItem}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactName: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messagePreview: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});
