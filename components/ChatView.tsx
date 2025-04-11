import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Image } from 'react-native';
import { Mic, Send, Play, Pause } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isVoice: boolean;
  duration?: string;
}

interface ChatViewProps {
  messages: Message[];
  contact: Contact;
  newMessage: string;
  setNewMessage: (text: string) => void;
  handleSendMessage: () => void;
  isDark: boolean;
}

export const ChatView = ({
  messages,
  contact,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isDark
}: ChatViewProps) => {
  const [playingVoiceMessage, setPlayingVoiceMessage] = useState<string | null>(null);

  const toggleVoicePlay = (messageId: string) => {
    if (playingVoiceMessage === messageId) {
      setPlayingVoiceMessage(null);
    } else {
      setPlayingVoiceMessage(messageId);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUserMessage = item.senderId === 'me';

    return (
      <View style={[
        styles.messageContainer,
        isUserMessage ? styles.userMessageContainer : styles.contactMessageContainer
      ]}>
        {!isUserMessage && !item.isVoice && (
          <Image source={{ uri: contact.avatar }} style={styles.messageAvatar} />
        )}

        {item.isVoice ? (
          // Voice message
          <View style={[
            styles.voiceMessageBubble,
            isUserMessage ?
              [styles.userMessageBubble, { backgroundColor: '#4CAF50' }] :
              [styles.contactMessageBubble, {
                backgroundColor: isDark ? '#333333' : '#F0F0F0',
                borderWidth: isDark ? 1 : 0,
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'transparent',
                shadowColor: isDark ? '#FFFFFF' : '#000000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: isDark ? 0.1 : 0,
                shadowRadius: 5,
                elevation: isDark ? 3 : 0
              }]
          ]}>
            <Pressable
              style={styles.playButton}
              onPress={() => toggleVoicePlay(item.id)}
            >
              {playingVoiceMessage === item.id ? (
                <Pause color={isUserMessage ? '#FFFFFF' : isDark ? '#FFFFFF' : '#0B0E1B'} size={18} />
              ) : (
                <Play color={isUserMessage ? '#FFFFFF' : isDark ? '#FFFFFF' : '#0B0E1B'} size={18} />
              )}
            </Pressable>

            <View style={styles.waveformContainer}>
              {/* Simulated waveform */}
              {Array.from({ length: 15 }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.waveformBar,
                    {
                      height: Math.random() * 15 + 5,
                      backgroundColor: isUserMessage ?
                        'rgba(255,255,255,0.8)' :
                        isDark ? 'rgba(255,255,255,0.8)' : 'rgba(11,14,27,0.6)'
                    }
                  ]}
                />
              ))}
            </View>

            <Text style={[
              styles.voiceDuration,
              { color: isUserMessage ? '#FFFFFF' : isDark ? '#FFFFFF' : '#0B0E1B' }
            ]}>
              {item.duration}
            </Text>
          </View>
        ) : (
          // Text message
          <View style={[
            styles.messageBubble,
            isUserMessage ?
              [styles.userMessageBubble, { backgroundColor: '#4CAF50' }] :
              [styles.contactMessageBubble, {
                backgroundColor: isDark ? '#333333' : '#F0F0F0',
                borderWidth: isDark ? 1 : 0,
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'transparent',
                shadowColor: isDark ? '#FFFFFF' : '#000000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: isDark ? 0.1 : 0,
                shadowRadius: 5,
                elevation: isDark ? 3 : 0
              }]
          ]}>
            <Text style={[
              styles.messageText,
              { color: isUserMessage ? '#FFFFFF' : isDark ? '#FFFFFF' : '#0B0E1B' }
            ]}>
              {item.text}
            </Text>
          </View>
        )}

        <Text style={[
          styles.messageTimestamp,
          isUserMessage ? styles.userMessageTimestamp : styles.contactMessageTimestamp
        ]}>
          {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={[
        styles.inputContainer,
        { backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF' }
      ]}>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: isDark ? '#333333' : '#F0F0F0',
              color: isDark ? '#FFFFFF' : '#000000'
            }
          ]}
          placeholder="Type a message..."
          placeholderTextColor={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />

        <View style={styles.inputActions}>
          <Pressable style={[
            styles.actionButton,
            { backgroundColor: isDark ? '#333333' : '#F0F0F0' }
          ]}>
            <Mic color={isDark ? '#FFFFFF' : '#000000'} size={20} />
          </Pressable>

          <Pressable
            style={[
              styles.sendButton,
              { opacity: newMessage.trim() ? 1 : 0.5 }
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <LinearGradient
              colors={['#4CAF50', '#2E7D32']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Send color="#FFFFFF" size={20} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  contactMessageContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  messageBubble: {
    borderRadius: 18,
    padding: 12,
    maxWidth: '100%',
  },
  userMessageBubble: {
    borderTopRightRadius: 4,
  },
  contactMessageBubble: {
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  userMessageTimestamp: {
    alignSelf: 'flex-end',
  },
  contactMessageTimestamp: {
    alignSelf: 'flex-start',
    marginLeft: 36, // To align with the message bubble
  },
  voiceMessageBubble: {
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 150,
    maxWidth: '95%',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  waveformContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginHorizontal: 8,
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  waveformBar: {
    width: 3,
    marginHorizontal: 1,
    borderRadius: 3,
  },
  voiceDuration: {
    fontSize: 12,
    marginLeft: 8,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  inputActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
