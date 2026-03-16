import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addProductToCart } from '../../utils/cartUtils';
import HomeStyles from './HomeStyles';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getProducts();
    getCartCount();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) {
        setUser(JSON.parse(currentUser));
      }
    } catch (error) {
      console.log('Error getting user:', error);
    }
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json'
      );
      const data = await response.json();
      
      setProducts(data);
      setFeaturedProducts(data.slice(0, 5));
      
      const uniqueCategories = ["All", ...new Set(data.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error loading products',
        text2: 'Please check your internet connection'
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getCartCount = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (!currentUser) return;
      
      const user = JSON.parse(currentUser);
      const cartKey = `cart_${user.email}`;
      const cart = await AsyncStorage.getItem(cartKey);
      const items = cart ? JSON.parse(cart) : [];
      setCartCount(items.length);
    } catch (error) {
      console.log('Error getting cart count:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getProducts();
    getCartCount();
  };

  const handleCategoryChange = (category) => {
    setLoading(true);

    setTimeout(()=>{
      setSelectedCategory(category);
      setLoading(false);
    },100);
  };

  const categoryFiltered = selectedCategory === "All"
    ? products
    : products.filter(item => item.category === selectedCategory);

  const filteredProducts = search.length < 3
    ? categoryFiltered
    : categoryFiltered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );

  const addToCart = async (product) => {
    const result = await addProductToCart(product);

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
        text2: product.name
      });
      getCartCount();
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'All': 'apps',
      'Electronics': 'devices',
      'Clothing': 'checkroom',
      'Home & Garden': 'home',
      'Sports': 'sports-soccer',
      'Books': 'menu-book',
      'Beauty': 'face',
      'Toys': 'toys',
    };
    return icons[category] || 'category';
  };

  const renderHeader = () => (
    <View style={HomeStyles.header}>
      <View style={HomeStyles.headerLeft}>
        <Text style={HomeStyles.greeting}>
          Hello {user ? user.name?.split(' ')[0] : 'Guest'} 👋
        </Text>
        <Text style={HomeStyles.headerTitle}>What are you looking for?</Text>
      </View>
      
      <View style={HomeStyles.headerRight}>
        <TouchableOpacity 
          style={HomeStyles.notificationBtn}
          // onPress={() => navigation.navigate("AddTask")}
        >
          <MaterialIcons name="notifications-none" size={24} color="#333" />
          <View style={HomeStyles.notificationDot} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={HomeStyles.cartBtn}
          onPress={() => navigation.navigate('Cart')}
        >
          <MaterialIcons name="shopping-cart" size={24} color="#333" />
          {cartCount > 0 && (
            <View style={HomeStyles.cartBadge}>
              <Text style={HomeStyles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={HomeStyles.searchContainer}>
      <MaterialIcons name="search" size={20} color="#999" />
      <TextInput
        style={HomeStyles.searchInput}
        placeholder="Search products, brands..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#999"
      />
      {search.length > 0 && (
        <TouchableOpacity onPress={() => setSearch('')}>
          <MaterialIcons name="close" size={20} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderPromoBanner = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={HomeStyles.promoContainer}
    >
      <View style={[HomeStyles.promoBanner, { backgroundColor: '#FF6B6B' }]}>
        <View style={HomeStyles.promoContent}>
          <Text style={HomeStyles.promoTitle}>Summer Sale</Text>
          <Text style={HomeStyles.promoSubtitle}>Up to 50% OFF</Text>
          <TouchableOpacity style={HomeStyles.promoBtn}>
            <Text style={HomeStyles.promoBtnText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
        <MaterialIcons name="local-offer" size={60} color="rgba(255,255,255,0.3)" />
      </View>

      <View style={[HomeStyles.promoBanner, { backgroundColor: '#4ECDC4' }]}>
        <View style={HomeStyles.promoContent}>
          <Text style={HomeStyles.promoTitle}>Free Shipping</Text>
          <Text style={HomeStyles.promoSubtitle}>On orders ₹50+</Text>
          <TouchableOpacity style={HomeStyles.promoBtn}>
            <Text style={HomeStyles.promoBtnText}>Learn More</Text>
          </TouchableOpacity>
        </View>
        <MaterialIcons name="local-shipping" size={60} color="rgba(255,255,255,0.3)" />
      </View>
    </ScrollView>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategoryChange(item)}
      style={[
        HomeStyles.categoryCard,
        selectedCategory === item && HomeStyles.activeCategoryCard
      ]}
    >
      <View style={[
        HomeStyles.categoryIcon,
        selectedCategory === item && HomeStyles.activeCategoryIcon
      ]}>
        <MaterialIcons 
          name={getCategoryIcon(item)} 
          size={24} 
          color={selectedCategory === item ? '#fff' : '#4CAF50'} 
        />
      </View>
      <Text style={[
        HomeStyles.categoryText,
        selectedCategory === item && HomeStyles.activeCategoryText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderCategories = () => (
    <View style={HomeStyles.section}>
      <View style={HomeStyles.sectionHeader}>
        <Text style={HomeStyles.sectionTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={HomeStyles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        contentContainerStyle={HomeStyles.categoriesContent}
      />
    </View>
  );

  const renderFeaturedProduct = ({ item }) => (
    <TouchableOpacity
      style={HomeStyles.featuredCard}
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <Image source={{ uri: item.image }} style={HomeStyles.featuredImage} />
      <View style={HomeStyles.featuredInfo}>
        <Text numberOfLines={2} style={HomeStyles.featuredTitle}>
          {item.name}
        </Text>
        <View style={HomeStyles.featuredRating}>
          <MaterialIcons name="star" size={14} color="#FFD700" />
          <Text style={HomeStyles.ratingText}>
            {item.rating.stars} ({item.rating.count})
          </Text>
        </View>
        <Text style={HomeStyles.featuredPrice}>
          {/* ₹{(item.priceCents / 100).toFixed(2)} */}
          ₹{(item.priceCents / 100).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={HomeStyles.featuredAddBtn}
        onPress={(e) => {
          e.stopPropagation();
          addToCart(item);
        }}
      >
        <MaterialIcons name="add" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderFeaturedProducts = () => (
    <View style={HomeStyles.section}>
      <View style={HomeStyles.sectionHeader}>
        <Text style={HomeStyles.sectionTitle}>Featured Products</Text>
        <TouchableOpacity>
          <Text style={HomeStyles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={featuredProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        // renderItem={renderFeaturedProduct}
        contentContainerStyle={HomeStyles.featuredContent}
      />
    </View>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={HomeStyles.productCard}
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <View style={HomeStyles.productImageContainer}>
        <Image source={{ uri: item.image }} style={HomeStyles.productImage} />
        <TouchableOpacity
          style={HomeStyles.wishlistBtn}
          onPress={(e) => {
            e.stopPropagation();
            // Handle wishlist
          }}
        >
          <MaterialIcons name="favorite-border" size={18} color="#999" />
        </TouchableOpacity>
      </View>
      
      <View style={HomeStyles.productInfo}>
        <Text numberOfLines={2} style={HomeStyles.productTitle}>
          {item.name}
        </Text>
        
        <View style={HomeStyles.productRating}>
          <MaterialIcons name="star" size={12} color="#FFD700" />
          <Text style={HomeStyles.ratingText}>
            {item.rating.stars}
          </Text>
          <Text style={HomeStyles.ratingCount}>
            ({item.rating.count})
          </Text>
        </View>
        
        <View style={HomeStyles.productFooter}>
          <Text style={HomeStyles.productPrice}>
            ₹{(item.priceCents * 92 / 100).toFixed(2)}
            {/* ₹{(item.priceCents / 100).toFixed(2)} */}
          </Text>
          
          <TouchableOpacity
            style={HomeStyles.addToCartBtn}
            onPress={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
          >
            <MaterialIcons name="add-shopping-cart" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={HomeStyles.emptyContainer}>
      <MaterialIcons name="search-off" size={80} color="#E0E0E0" />
      <Text style={HomeStyles.emptyTitle}>No products found</Text>
      <Text style={HomeStyles.emptyText}>
        Try adjusting your search or filter criteria
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={HomeStyles.container}>
        <View style={HomeStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={HomeStyles.loadingText}>Loading amazing products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={HomeStyles.container}>
      {renderHeader()}
      {renderSearchBar()}
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']}
            tintColor="#4CAF50"
          />
        }
      >
        {renderPromoBanner()}
        {renderCategories()}
        {/* {renderFeaturedProducts()} */}
        
        {/* Products Section */}
        <View style={HomeStyles.section}>
          <View style={HomeStyles.sectionHeader}>
            <Text style={HomeStyles.sectionTitle}>
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </Text>
            <Text style={HomeStyles.productCount}>
              {filteredProducts.length} items
            </Text>
          </View>
          
          {filteredProducts.length === 0 ? (
            renderEmptyState()
          ) : (
            <FlatList
              data={filteredProducts}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderProduct}
              contentContainerStyle={HomeStyles.productsContent}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;





// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import { addProductToCart } from '../../utils/cartUtils';
// import {useCart} from '../../context/CartCotext';
// import HomeStyles from './HomeStyles';
// import Toast from 'react-native-toast-message';
// import Header from '../../components/Header/index';
// import Footer from '../../components/Footer/index';
// import SearchHeader from '../../components/SearchHeader/index';

// const HomeScreen = ({ navigation }) => {

//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [loading, setLoading] = useState(true);

//   // FETCH PRODUCTS
//   const getProducts = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(
//         'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json'
//       );

//       const data = await response.json();

//       setProducts(data);

//       const uniqueCategories = ["All", ...new Set(data.map(p => p.category))];
//       setCategories(uniqueCategories);

//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   // HANDLE CATEGORY CHANGE
//   const handleCategoryChange = (category) => {
//     setLoading(true);

//     setTimeout(() => {
//       setSelectedCategory(category);
//       setLoading(false);
//     }, 400);
//   };

//   // CATEGORY FILTER
//   const categoryFiltered =
//     selectedCategory === "All"
//       ? products
//       : products.filter(item => item.category === selectedCategory);

//   // SEARCH FILTER
//   const filteredProducts =
//     search.length < 3
//       ? categoryFiltered
//       : categoryFiltered.filter(item =>
//           item.name.toLowerCase().includes(search.toLowerCase())
//         );

//   const addToCart = async product => {
//     const result = await addProductToCart(product);

//     if (result.status === 'login_required') {
//       Toast.show({
//         type: 'info',
//         text1: 'Login Required',
//       });
//     }

//     if (result.status === 'exists') {
//       Toast.show({
//         type: 'info',
//         text1: 'Item already in Cart',
//         position:"top",
        
//       });
//     }

//     if (result.status === 'added') {
//       Toast.show({
//         type: 'success',
//         text1: 'Added to Cart 🛒',
//         position:"top"
//       });
//     }
//   };

//   // PRODUCT CARD
//   const renderProduct = ({ item }) => (
//     <TouchableOpacity
//       style={HomeStyles.card}
//       onPress={() =>
//         navigation.navigate("ProductDetails", { product: item })
//       }
//     >
//       <Image source={{ uri: item.image }} style={HomeStyles.image} />

//       <Text numberOfLines={2} style={HomeStyles.productTitle}>
//         {item.name}
//       </Text>

//       <Text style={HomeStyles.rating}>
//         ⭐ {item.rating.stars} ({item.rating.count})
//       </Text>

//       <Text style={HomeStyles.price}>
//         $ {(item.priceCents / 100).toFixed(2)}
//       </Text>

//       <TouchableOpacity
//         style={HomeStyles.addBtn}
//         onPress={() => addToCart(item)}
//       >
//         <Text style={HomeStyles.addBtnText}>
//           Add to Cart
//         </Text>
//       </TouchableOpacity>

//     </TouchableOpacity>
//   );

//   // CATEGORY BUTTON
//   const renderCategory = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => handleCategoryChange(item)}
//       style={[
//         HomeStyles.categoryBtn,
//         selectedCategory === item && HomeStyles.activeCategory
//       ]}
//     >
//       <Text
//         style={[
//           HomeStyles.categoryText,
//           selectedCategory === item && HomeStyles.activeCategoryText
//         ]}
//       >
//         {item}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={HomeStyles.container}>

//       <Header />

//       <View style={HomeStyles.titleRow}>
//         <Text style={HomeStyles.title}>Discover</Text>

//         <SearchHeader
//           value={search}
//           onChange={setSearch}
//           style={HomeStyles.searchInput}
//         />
//       </View>

//       {/* HERO BANNER */}
//       <View style={HomeStyles.hero}>
//         <Text style={HomeStyles.heroTitle}>Summer Sale</Text>
//         <Text style={HomeStyles.heroSubtitle}>Up to 50% OFF</Text>
//       </View>

//       {/* CATEGORY LIST */}
//       <FlatList
//         data={categories}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderCategory}
//         style={HomeStyles.categoryContainer}
//       />

//       {/* PRODUCT GRID */}
//       <FlatList
//         data={filteredProducts}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={{ paddingBottom: 80 }}
//         renderItem={renderProduct}
//       />

//       {/* <Footer /> */}

//       {/* LOADING OVERLAY */}
//       {loading && (
//         <View
//           style={{
//             position: 'absolute',
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'rgba(255,255,255,0.8)',
//           }}
//         >
//           <ActivityIndicator size="large" color="#000" />
//           <Text style={{ marginTop: 10 }}>Loading...</Text>
//         </View>
//       )}

//     </View>
//   );
// };

// export default HomeScreen;