// import React ,{useState, useEffect} from 'react';
// import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import {addProductToCart} from '../../utils/cartUtils';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Toast from 'react-native-toast-message';
// import ProductDetailsStyle from './style';

// const ProductDetailsScreen = ({ route, navigation }) => {

//   const { product } = route.params;
//   const [cartCount, setCartCount] = useState(0);
//   const insets = useSafeAreaInsets();

//   useEffect(() => {
//     getCartCount();
//     const unsubscribe = navigation.addListener('focus', () => {
//       getCartCount();
//     });

//     return unsubscribe;
//   }, [navigation]);

//   const addToCart = async () => {
//     try {
//       const result = await addProductToCart(product);

//       if (result.status === 'login_required') {
//         Toast.show({
//           type: 'info',
//           text1: 'Login Required',
//         });
//       }

//       if (result.status === 'exists') {
//         Toast.show({
//           type: 'info',
//           text1: 'Item already in Cart',
//           // position:'bottom'
//         });
//       }

//       if (result.status === 'added') {
//         Toast.show({
//           type: 'success',
//           text1: 'Added to Cart 🛒',
//           visibilityTime: 1500,
//           onHide: () => {
//             navigation.navigate("Main", {screen : "Cart"});
//           },
//           // position:'bottom'
//         });
//         getCartCount();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getCartCount = async () => {
//     try {
//       const currentUser = await AsyncStorage.getItem('currentUser');
//       if (!currentUser) {
//         setCartCount(0);
//         return;
//       }

//       const user = JSON.parse(currentUser);
//       const cartKey = `cart_${user.email}`;
//       const cart = await AsyncStorage.getItem(cartKey);

//       if (cart) {
//         const cartItems = JSON.parse(cart);
//         setCartCount(cartItems.length);
//       } else {
//         setCartCount(0);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
//       <View style={ProductDetailsStyle.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={ProductDetailsStyle.backBtn}
//         >
//           <Icon name="arrow-back" size={30} />
//         </TouchableOpacity>

//         <Text style={ProductDetailsStyle.headerTitle} numberOfLines={1}>
//           {product.name}
//         </Text>

//         <TouchableOpacity style={ProductDetailsStyle.cartContainer} onPress={() => navigation.navigate('Main', {screen : "Cart"})}>
//           <Icon name="cart" size={26} />
//           {cartCount > 0 && (
//             <View style={ProductDetailsStyle.cartBadge}>
//               <Text style={ProductDetailsStyle.cartBadgeText}>{cartCount}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//       <ScrollView
//         contentContainerStyle={{
//           padding: 20,
//           paddingBottom: 20 + insets.bottom,
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         <Image
//           source={{ uri: product.image }}
//           style={ProductDetailsStyle.image}
//         />

//         <Text style={ProductDetailsStyle.title}>{product.name}</Text>

//         <Text style={ProductDetailsStyle.price}>
//           $ {(product.priceCents / 100).toFixed(2)}
//         </Text>

//         <Text style={ProductDetailsStyle.description}>
//           {product.description}
//         </Text>

//         <Text style={ProductDetailsStyle.category}>{product.category}</Text>

//         <View style={ProductDetailsStyle.ratingContainer}>
//           <Text style={ProductDetailsStyle.ratingText}>
//             ⭐ {product.rating.stars}
//           </Text>

//           <Text style={ProductDetailsStyle.ratingCount}>
//             ({product.rating.count} reviews)
//           </Text>
//         </View>

//         <TouchableOpacity
//           onPress={addToCart}
//           style={[
//             ProductDetailsStyle.addToCartBtn,
//             { marginBottom: insets.bottom },
//           ]}
//         >
//           <Text style={ProductDetailsStyle.addToCartText}>Add to Cart</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ProductDetailsScreen;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Share,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addProductToCart } from '../../utils/cartUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import ProductDetailsStyle from './style';

const { width, height } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [cartCount, setCartCount] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Mock additional images (in real app, these would come from API)
  const productImages = [
    product.image,
    product.image, // Duplicate for demo
    product.image,
  ];

  useEffect(() => {
    getCartCount();
    checkIfFavorite();
    const unsubscribe = navigation.addListener('focus', () => {
      getCartCount();
    });
    return unsubscribe;
  }, [navigation]);

  const getCartCount = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (!currentUser) {
        setCartCount(0);
        return;
      }

      const user = JSON.parse(currentUser);
      const cartKey = `cart_${user.email}`;
      const cart = await AsyncStorage.getItem(cartKey);

      if (cart) {
        const cartItems = JSON.parse(cart);
        setCartCount(cartItems.length);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (!currentUser) return;

      const user = JSON.parse(currentUser);
      const favoritesKey = `favorites_${user.email}`;
      const favorites = await AsyncStorage.getItem(favoritesKey);

      if (favorites) {
        const favoriteItems = JSON.parse(favorites);
        setIsFavorite(favoriteItems.some(item => item.id === product.id));
      }
    } catch (error) {
      console.log('Error checking favorites:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (!currentUser) {
        Toast.show({
          type: 'info',
          text1: 'Login Required',
          text2: 'Please login to add to favorites'
        });
        return;
      }

      const user = JSON.parse(currentUser);
      const favoritesKey = `favorites_${user.email}`;
      const favorites = await AsyncStorage.getItem(favoritesKey);
      let favoriteItems = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        favoriteItems = favoriteItems.filter(item => item.id !== product.id);
        setIsFavorite(false);
        Toast.show({
          type: 'info',
          text1: 'Removed from Favorites',
        });
      } else {
        favoriteItems.push(product);
        setIsFavorite(true);
        Toast.show({
          type: 'success',
          text1: 'Added to Favorites ❤️',
        });
      }

      await AsyncStorage.setItem(favoritesKey, JSON.stringify(favoriteItems));
    } catch (error) {
      console.log('Error toggling favorite:', error);
    }
  };

  const addToCart = async () => {
    try {
      setIsAddingToCart(true);
      const productWithQuantity = { ...product, quantity };
      const result = await addProductToCart(productWithQuantity);

      if (result.status === 'login_required') {
        Toast.show({
          type: 'info',
          text1: 'Login Required',
          text2: 'Please login to add items to cart'
        });
        navigation.navigate('Login');
        return;
      }

      if (result.status === 'exists') {
        Toast.show({
          type: 'info',
          text1: 'Already in Cart',
          text2: 'This item is already in your cart'
        });
      }

      if (result.status === 'added') {
        Toast.show({
          type: 'success',
          text1: 'Added to Cart! 🛒',
          text2: `${quantity} x ${product.name}`,
          onHide : () => {
            navigation.navigate('Main', {screen : 'Cart'})
          },
        });
        getCartCount();
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add item to cart'
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const buyNow = async () => {
    await addToCart();
    if (cartCount > 0) {
      navigation.navigate('Main', { screen: 'Cart' });
    }
  };

  const shareProduct = async () => {
    try {
      await Share.share({
        message: `Check out this amazing product: ${product.name}\nPrice: ₹${(product.priceCents / 100).toFixed(2)}\n\nShared from Cartify App`,
        title: product.name,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const renderHeader = () => {
    const headerOpacity = scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[ProductDetailsStyle.header, { backgroundColor: `rgba(255,255,255,${headerOpacity})` }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={ProductDetailsStyle.headerBtn}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Animated.Text style={[ProductDetailsStyle.headerTitle, { opacity: headerOpacity }]} numberOfLines={1}>
          {product.name}
        </Animated.Text>

        <View style={ProductDetailsStyle.headerRight}>
          <TouchableOpacity
            onPress={shareProduct}
            style={ProductDetailsStyle.headerBtn}
          >
            <MaterialIcons name="share" size={22} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            style={ProductDetailsStyle.cartContainer}
            onPress={() => navigation.navigate('Main', { screen: 'Cart' })}
          >
            <MaterialIcons name="shopping-cart" size={22} color="#333" />
            {cartCount > 0 && (
              <View style={ProductDetailsStyle.cartBadge}>
                <Text style={ProductDetailsStyle.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const renderImageGallery = () => (
    <View style={ProductDetailsStyle.imageContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setSelectedImageIndex(index);
        }}
      >
        {productImages.map((imageUri, index) => (
          <View key={index} style={ProductDetailsStyle.imageWrapper}>
            <Image source={{ uri: imageUri }} style={ProductDetailsStyle.productImage} />
          </View>
        ))}
      </ScrollView>

      {/* Image Indicators */}
      <View style={ProductDetailsStyle.imageIndicators}>
        {productImages.map((_, index) => (
          <View
            key={index}
            style={[
              ProductDetailsStyle.indicator,
              selectedImageIndex === index && ProductDetailsStyle.activeIndicator
            ]}
          />
        ))}
      </View>

      {/* Favorite Button */}
      <TouchableOpacity
        style={ProductDetailsStyle.favoriteBtn}
        onPress={toggleFavorite}
      >
        <MaterialIcons
          name={isFavorite ? "favorite" : "favorite-border"}
          size={24}
          color={isFavorite ? "#FF6B6B" : "#666"}
        />
      </TouchableOpacity>
    </View>
  );

  const renderProductInfo = () => (
    <View style={ProductDetailsStyle.productInfo}>
      {/* Category Badge */}
      <View style={ProductDetailsStyle.categoryBadge}>
        <Text style={ProductDetailsStyle.categoryText}>{product.category}</Text>
      </View>

      {/* Product Name */}
      <Text style={ProductDetailsStyle.productName}>{product.name}</Text>

      {/* Rating */}
      <View style={ProductDetailsStyle.ratingContainer}>
        <View style={ProductDetailsStyle.ratingStars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <MaterialIcons
              key={star}
              name="star"
              size={16}
              color={star <= Math.floor(product.rating.stars) ? "#FFD700" : "#E0E0E0"}
            />
          ))}
        </View>
        <Text style={ProductDetailsStyle.ratingText}>
          {product.rating.stars} ({product.rating.count} reviews)
        </Text>
      </View>

      {/* Price */}
      <View style={ProductDetailsStyle.priceContainer}>
        <Text style={ProductDetailsStyle.currentPrice}>
          ₹{(product.priceCents *92 / 100).toFixed(2)}
        </Text>
        <Text style={ProductDetailsStyle.originalPrice}>
          ₹{((product.priceCents * 1.2 * 92) / 100).toFixed(2)}
        </Text>
        <View style={ProductDetailsStyle.discountBadge}>
          <Text style={ProductDetailsStyle.discountText}>17% OFF</Text>
        </View>
      </View>

      {/* Features */}
      <View style={ProductDetailsStyle.featuresContainer}>
        <View style={ProductDetailsStyle.feature}>
          <MaterialIcons name="local-shipping" size={20} color="#4CAF50" />
          <Text style={ProductDetailsStyle.featureText}>Free Delivery</Text>
        </View>
        <View style={ProductDetailsStyle.feature}>
          <MaterialIcons name="cached" size={20} color="#4CAF50" />
          <Text style={ProductDetailsStyle.featureText}>7 Days Return</Text>
        </View>
        <View style={ProductDetailsStyle.feature}>
          <MaterialIcons name="verified-user" size={20} color="#4CAF50" />
          <Text style={ProductDetailsStyle.featureText}>Warranty</Text>
        </View>
      </View>
    </View>
  );

  const renderQuantitySelector = () => (
    <View style={ProductDetailsStyle.quantityContainer}>
      <Text style={ProductDetailsStyle.quantityLabel}>Quantity:</Text>
      <View style={ProductDetailsStyle.quantitySelector}>
        <TouchableOpacity
          style={ProductDetailsStyle.quantityBtn}
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <MaterialIcons name="remove" size={20} color={quantity <= 1 ? "#ccc" : "#333"} />
        </TouchableOpacity>
        
        <Text style={ProductDetailsStyle.quantityText}>{quantity}</Text>
        
        <TouchableOpacity
          style={ProductDetailsStyle.quantityBtn}
          onPress={() => setQuantity(quantity + 1)}
        >
          <MaterialIcons name="add" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDescription = () => (
    <View style={ProductDetailsStyle.descriptionContainer}>
      <Text style={ProductDetailsStyle.sectionTitle}>Description</Text>
      <Text
        style={ProductDetailsStyle.description}
        numberOfLines={showFullDescription ? undefined : 3}
      >
        {product.description || "This is a high-quality product with excellent features and great value for money. Perfect for everyday use and built to last."}
      </Text>
      <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
        <Text style={ProductDetailsStyle.readMoreText}>
          {showFullDescription ? "Read Less" : "Read More"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderBottomActions = () => (
    <View style={ProductDetailsStyle.bottomActions}>
      <TouchableOpacity
        style={ProductDetailsStyle.buyNowBtn}
        onPress={buyNow}
        disabled={isAddingToCart}
      >
        <MaterialIcons name="flash-on" size={20} color="#fff" />
        <Text style={ProductDetailsStyle.buyNowText}>Buy Now</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={ProductDetailsStyle.addToCartBtn}
        onPress={addToCart}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? (
          <Text style={ProductDetailsStyle.addToCartText}>Adding...</Text>
        ) : (
          <>
            <MaterialIcons name="add-shopping-cart" size={20} color="#fff" />
            <Text style={ProductDetailsStyle.addToCartText}>Add to Cart</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={ProductDetailsStyle.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {renderHeader()}

      <Animated.ScrollView
        style={ProductDetailsStyle.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {renderImageGallery()}
        {renderProductInfo()}
        {/* {renderQuantitySelector()} */}
        {renderDescription()}
        
        {/* Spacer for bottom actions */}
        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {renderBottomActions()}
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
