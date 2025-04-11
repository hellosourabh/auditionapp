import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Minus, Plus } from 'lucide-react-native';

interface ProductDetailProps {
  isVisible: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    image: any;
    owner: {
      name: string;
      avatar: string;
    };
  };
}

const { width, height } = Dimensions.get('window');

export const ProductDetail = ({ isVisible, onClose, product }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [detailVisible, setDetailVisible] = useState(false);

  // Animation values
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setDetailVisible(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else if (detailVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start(() => {
        setDetailVisible(false);
      });
    }
  }, [isVisible]);

  const handleClose = () => {
    onClose();
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!detailVisible) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.overlay,
          { opacity: fadeAnim }
        ]}
      >
        <Pressable style={styles.overlayBackground} onPress={handleClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.detailContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <LinearGradient
          colors={['rgba(183, 140, 101, 0.85)', 'rgba(183, 140, 101, 0.85)']}
          style={styles.background}
        />

        <View style={styles.header}>
          <BlurView intensity={5} tint="default" style={[StyleSheet.absoluteFill, {borderRadius: 0}]}>
            <LinearGradient
              colors={['rgba(183, 140, 101, 0.05)', 'rgba(183, 140, 101, 0.02)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </BlurView>
          <Pressable style={styles.backButton} onPress={handleClose}>
            <ChevronLeft color="#000" size={24} />
          </Pressable>
          <Text style={styles.headerTitle}>Product Detail</Text>
          <Image
            source={{ uri: product.owner.avatar }}
            style={styles.profilePic}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="cover"
          />
          <BlurView intensity={15} tint="default" style={styles.imageBlur} />
          <LinearGradient
            colors={[
              'rgba(183, 140, 101, 0)',
              'rgba(183, 140, 101, 0.2)',
              'rgba(183, 140, 101, 0.5)',
              'rgba(183, 140, 101, 0.8)',
              'rgba(183, 140, 101, 0.95)',
              'rgba(183, 140, 101, 0.95)',
              'rgba(183, 140, 101, 0.95)'
            ]}
            style={styles.imageGradient}
            start={{ x: 0.5, y: 0.25 }}
            end={{ x: 0.5, y: 1.1 }}
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          scrollEventThrottle={16}
        >

            <View style={styles.productInfo}>
              <BlurView intensity={10} tint="default" style={[StyleSheet.absoluteFill, {borderTopLeftRadius: 30, borderTopRightRadius: 30}]}>
                <LinearGradient
                  colors={['rgba(183, 140, 101, 0.15)', 'rgba(183, 140, 101, 0.1)']}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </BlurView>
              <Text style={styles.productTitle}>{product.title}</Text>

              <View style={styles.sizeContainer}>
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <Pressable
                    key={size}
                    style={[
                      styles.sizeButton,
                      selectedSize === size && styles.selectedSizeButton
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedSize === size && styles.selectedSizeText
                      ]}
                    >
                      {size}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.reviewCount}>45+ Reviews</Text>

              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.descriptionText}>
                  This elegant golden satin suit features premium fabric with a luxurious sheen.
                  The tailored fit creates a sophisticated silhouette, while the warm golden tone
                  adds a touch of opulence to your wardrobe. Perfect for special occasions or
                  making a statement at professional events.
                </Text>
              </View>
            </View>
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.footer}>
            <View style={styles.quantityContainer}>
              <Pressable style={styles.quantityButton} onPress={decrementQuantity}>
                <Minus color="#8B5A2B" size={16} />
              </Pressable>
              <Text style={styles.quantityText}>{quantity}</Text>
              <Pressable style={styles.quantityButton} onPress={incrementQuantity}>
                <Plus color="#8B5A2B" size={16} />
              </Pressable>
            </View>

            <Pressable style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
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
  overlayBackground: {
    flex: 1,
  },
  detailContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 0, // Removed border radius completely
    overflow: 'visible',
    zIndex: 1,
    paddingTop: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20, // Increased further to ensure it's above everything
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    overflow: 'visible',
    height: 100, // Fixed height for header
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    marginBottom: 80, // Space for footer
    position: 'relative',
    zIndex: 2,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.5, // Increased height for more image visibility
    overflow: 'visible',
    position: 'relative',
    marginTop: 80, // Reduced to prevent cutting off the top
    zIndex: 1, // Below everything else
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0, // Remove border radius
    resizeMode: 'cover',
    position: 'absolute', // Make sure image is positioned absolutely
    top: 0,
    left: 0,
  },
  imageBlur: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    zIndex: 1,
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -5, // Extend further beyond container to eliminate seam
    height: '80%',
    zIndex: 2,
    shadowColor: 'rgba(183, 140, 101, 0.95)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  productInfo: {
    padding: 20,
    marginTop: 0,
    position: 'relative',
    zIndex: 15,
    backgroundColor: 'rgba(183, 140, 101, 0.2)', // More transparent background
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  productTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  sizeButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedSizeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#FFFFFF',
  },
  sizeText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  selectedSizeText: {
    color: '#FFFFFF',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  reviewCount: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginBottom: 15,
  },
  descriptionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 8,
  },
  descriptionText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontFamily: 'SpaceGrotesk-Regular',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.5,
    elevation: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityText: {
    color: '#8B5A2B',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
    marginHorizontal: 15,
  },
  addToCartButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  addToCartText: {
    color: '#8B5A2B',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
});
