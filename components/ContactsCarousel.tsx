import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { Plus } from 'lucide-react-native';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface ContactsCarouselProps {
  contacts: Contact[];
  onSelectContact?: (contactId: string) => void;
}

export const ContactsCarousel = ({ contacts, onSelectContact }: ContactsCarouselProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{ width: '100%' }}
      >
        {/* Add new contact button */}
        <Pressable style={styles.addContactButton}>
          <View style={styles.addIconContainer}>
            <Plus color="#FFFFFF" size={24} />
          </View>
          <Text style={styles.addContactText}>New</Text>
        </Pressable>

        {/* Contact avatars */}
        {contacts.map((contact) => (
          <Pressable
            key={contact.id}
            style={styles.contactItem}
            onPress={() => onSelectContact && onSelectContact(contact.id)}
          >
            <View style={styles.avatarContainer}>
              <Image source={{ uri: contact.avatar }} style={styles.avatar} />
              {contact.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            <Text style={styles.contactName} numberOfLines={1} ellipsizeMode="tail">
              {contact.name.split(' ')[0]}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  scrollContent: {
    paddingVertical: 10,
    paddingRight: 30,
  },
  contactItem: {
    alignItems: 'center',
    marginRight: 15,
    width: 60,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  contactName: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  addContactButton: {
    alignItems: 'center',
    marginRight: 20,
    width: 60,
  },
  addIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addContactText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk-Regular',
  },
});
