// // import React from 'react';
// // import {View, Text} from 'react-native';
// // import OrdersStyle from './style';

// // const OrdersScreen = () => {
// //     return (
// //         <View>
// //             <Text>Orders</Text>
// //         </View>
// //     )
// // };

// // export default OrdersScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useIsFocused } from '@react-navigation/native';
// import { getUserOrders } from '../../utils/orderUtils';
// import Icon from 'react-native-vector-icons/Ionicons';
// import OrdersStyle from './style';

// const OrdersScreen = ({ navigation }) => {
//   const [orders, setOrders] = useState([]);
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     if (isFocused) loadOrders();
//   }, [isFocused]);

//   const loadOrders = async () => {
//     const userOrders = await getUserOrders();
//     setOrders(userOrders.reverse()); // Show latest first
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered': return '#4CAF50';
//       case 'Shipped': return '#2196F3';
//       case 'Processing': return '#FF9800';
//       case 'Cancelled': return '#f44336';
//       default: return '#888';
//     }
//   };

//   const renderOrder = ({ item }) => (
//     <TouchableOpacity 
//       style={OrdersStyle.orderCard}
//       activeOpacity={0.7}
//     >
//       <View style={OrdersStyle.orderHeader}>
//         <View>
//           <Text style={OrdersStyle.orderId}>Order #{item.id}</Text>
//           <Text style={OrdersStyle.orderDate}>{item.date} at {item.time}</Text>
//         </View>
//         <View style={[OrdersStyle.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
//           <Text style={OrdersStyle.statusText}>{item.status}</Text>
//         </View>
//       </View>

//       <View style={OrdersStyle.divider} />

//       <View style={OrdersStyle.orderBody}>
//         <View style={OrdersStyle.itemsContainer}>
//           {item.items?.slice(0, 2).map((product, index) => (
//             <View key={index} style={OrdersStyle.itemRow}>
//               <Image source={{ uri: product.image }} style={OrdersStyle.itemImage} />
//               <View style={OrdersStyle.itemInfo}>
//                 <Text style={OrdersStyle.itemName} numberOfLines={1}>
//                   {product.name}
//                 </Text>
//                 <Text style={OrdersStyle.itemPrice}>
//                   ${(product.priceCents / 100).toFixed(2)} x {product.quantity}
//                 </Text>
//               </View>
//             </View>
//           ))}
//           {item.items?.length > 2 && (
//             <Text style={OrdersStyle.moreItems}>
//               +{item.items.length - 2} more items
//             </Text>
//           )}
//         </View>

//         <View style={OrdersStyle.orderFooter}>
//           <View style={OrdersStyle.totalContainer}>
//             <Text style={OrdersStyle.totalLabel}>Total Amount</Text>
//             <Text style={OrdersStyle.totalAmount}>
//               ${(item.total / 100).toFixed(2)}
//             </Text>
//             <Text style={OrdersStyle.paymentMethod}>
//               Payment: {item.paymentMethod === 'COD' ? 'Cash on Delivery' : item.paymentMethod}
//             </Text>
//           </View>
          
//           <TouchableOpacity style={OrdersStyle.detailsBtn}>
//             <Text style={OrdersStyle.detailsBtnText}>View Details</Text>
//             <Icon name="chevron-forward" size={16} color="#4CAF50" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={OrdersStyle.container}>
//       <View style={OrdersStyle.header}>
//         <Text style={OrdersStyle.headerTitle}>My Orders</Text>
//       </View>

//       {orders.length === 0 ? (
//         <View style={OrdersStyle.emptyContainer}>
//           <Icon name="receipt-outline" size={80} color="#ccc" />
//           <Text style={OrdersStyle.emptyTitle}>No Orders Yet</Text>
//           <Text style={OrdersStyle.emptyText}>
//             Your orders will appear here once you make a purchase
//           </Text>
//           <TouchableOpacity 
//             style={OrdersStyle.shopBtn}
//             onPress={() => navigation.navigate('Home')}
//           >
//             <Text style={OrdersStyle.shopBtnText}>Start Shopping</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <FlatList
//           data={orders}
//           renderItem={renderOrder}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={OrdersStyle.listContent}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default OrdersScreen;


import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  RefreshControl,
  ActivityIndicator,
  Animated,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { getUserOrders } from '../../utils/orderUtils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OrdersStyle from './style';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const isFocused = useIsFocused();

  const filters = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  useEffect(() => {
    if (isFocused) loadOrders();
  }, [isFocused]);

  useEffect(() => {
    filterOrders();
  }, [orders, selectedFilter, searchQuery]);

  const loadOrders = async (isRefresh = false) => {
    try {
      if (!isRefresh) setIsLoading(true);
      const userOrders = await getUserOrders();
      setOrders(userOrders.reverse());
    } catch (error) {
      console.log('Error loading orders:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    loadOrders(true);
  };

  const filterOrders = () => {
    let filtered = orders;

    // Filter by status
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(order => order.status === selectedFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items?.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredOrders(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#4CAF50';
      case 'Shipped': return '#2196F3';
      case 'Processing': return '#FF9800';
      case 'Cancelled': return '#f44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return 'check-circle';
      case 'Shipped': return 'local-shipping';
      case 'Processing': return 'hourglass-empty';
      case 'Cancelled': return 'cancel';
      default: return 'schedule';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getOrderProgress = (status) => {
    switch (status) {
      case 'Processing': return 25;
      case 'Shipped': return 75;
      case 'Delivered': return 100;
      case 'Cancelled': return 0;
      default: return 0;
    }
  };

  const renderFilterChip = ({ item }) => (
    <TouchableOpacity
      style={[
        OrdersStyle.filterChip,
        selectedFilter === item && OrdersStyle.activeFilterChip
      ]}
      onPress={() => setSelectedFilter(item)}
    >
      <Text style={[
        OrdersStyle.filterText,
        selectedFilter === item && OrdersStyle.activeFilterText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderOrder = ({ item, index }) => {
    const progress = getOrderProgress(item.status);
    
    return (
      <Animated.View style={OrdersStyle.orderCard}>
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('OrderDetails', {order : item})}
        >
          {/* Order Header */}
          <View style={OrdersStyle.orderHeader}>
            <View style={OrdersStyle.orderHeaderLeft}>
              <Text style={OrdersStyle.orderId}>#{item.id}</Text>
              <Text style={OrdersStyle.orderDate}>
                {formatDate(item.date)}
              </Text>
            </View>
            
            <View style={OrdersStyle.statusContainer}>
              <View style={[
                OrdersStyle.statusBadge, 
                { backgroundColor: getStatusColor(item.status) }
              ]}>
                <MaterialIcons 
                  name={getStatusIcon(item.status)} 
                  size={14} 
                  color="#fff" 
                />
                <Text style={OrdersStyle.statusText}>{item.status}</Text>
              </View>
            </View>
          </View>

          {/* Progress Bar */}
          {item.status !== 'Cancelled' && (
            <View style={OrdersStyle.progressContainer}>
              <View style={OrdersStyle.progressBar}>
                <View 
                  style={[
                    OrdersStyle.progressFill,
                    { 
                      width: `${progress}%`,
                      backgroundColor: getStatusColor(item.status)
                    }
                  ]} 
                />
              </View>
              <Text style={OrdersStyle.progressText}>{progress}% Complete</Text>
            </View>
          )}

          {/* Order Items */}
          <View style={OrdersStyle.orderBody}>
            <View style={OrdersStyle.itemsHeader}>
              <MaterialIcons name="shopping-bag" size={16} color="#666" />
              <Text style={OrdersStyle.itemsTitle}>
                {item.items?.length} {item.items?.length === 1 ? 'Item' : 'Items'}
              </Text>
            </View>

            <View style={OrdersStyle.itemsContainer}>
              {item.items?.slice(0, 2).map((product, idx) => (
                <View key={idx} style={OrdersStyle.itemRow}>
                  <Image 
                    source={{ uri: product.image }} 
                    style={OrdersStyle.itemImage} 
                  />
                  <View style={OrdersStyle.itemInfo}>
                    <Text style={OrdersStyle.itemName} numberOfLines={1}>
                      {product.name}
                    </Text>
                    <View style={OrdersStyle.itemDetails}>
                      <Text style={OrdersStyle.itemQty}>Qty: {product.quantity}</Text>
                      <Text style={OrdersStyle.itemPrice}>
                        ₹{(product.priceCents * 92 / 100).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
              
              {item.items?.length > 2 && (
                <TouchableOpacity style={OrdersStyle.moreItemsContainer}>
                  <Text style={OrdersStyle.moreItems}>
                    +{item.items.length - 2} more items
                  </Text>
                  <MaterialIcons name="expand-more" size={16} color="#4CAF50" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Order Footer */}
          <View style={OrdersStyle.orderFooter}>
            <View style={OrdersStyle.totalSection}>
              <Text style={OrdersStyle.totalLabel}>Total Amount</Text>
              <Text style={OrdersStyle.totalAmount}>
                ₹{(item.total / 100).toFixed(2)}
              </Text>
              <View style={OrdersStyle.paymentInfo}>
                <MaterialIcons 
                  name={item.paymentMethod === 'COD' ? 'money' : 'credit-card'} 
                  size={12} 
                  color="#666" 
                />
                <Text style={OrdersStyle.paymentMethod}>
                  {item.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Paid Online'}
                </Text>
              </View>
            </View>
            
            <View style={OrdersStyle.actionButtons}>
              {/* <TouchableOpacity style={OrdersStyle.trackButton}>
                <MaterialIcons name="track-changes" size={16} color="#4CAF50" />
                <Text style={OrdersStyle.trackButtonText}>Track</Text>
              </TouchableOpacity> */}
              
              <TouchableOpacity style={OrdersStyle.detailsButton}
                onPress={() => navigation.navigate('OrderDetails', {order: item})}
              >
                <Text style={OrdersStyle.detailsButtonText}>Details</Text>
                <MaterialIcons name="chevron-right" size={16} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <View style={OrdersStyle.emptyContainer}>
      <MaterialIcons name="receipt-long" size={80} color="#E0E0E0" />
      <Text style={OrdersStyle.emptyTitle}>
        {searchQuery || selectedFilter !== 'All' ? 'No Orders Found' : 'No Orders Yet'}
      </Text>
      <Text style={OrdersStyle.emptyText}>
        {searchQuery || selectedFilter !== 'All' 
          ? 'Try adjusting your search or filter criteria'
          : 'Your orders will appear here once you make a purchase'
        }
      </Text>
      {!searchQuery && selectedFilter === 'All' && (
        <TouchableOpacity 
          style={OrdersStyle.shopButton}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialIcons name="shopping-cart" size={20} color="#fff" />
          <Text style={OrdersStyle.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={OrdersStyle.container}>
        <View style={OrdersStyle.header}>
          <Text style={OrdersStyle.headerTitle}>My Orders</Text>
        </View>
        <View style={OrdersStyle.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={OrdersStyle.loadingText}>Loading your orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={OrdersStyle.container}>
      {/* Header */}
      <View style={OrdersStyle.header}>
        <View style={OrdersStyle.headerTop}>
          <Text style={OrdersStyle.headerTitle}>My Orders</Text>
          <TouchableOpacity 
            style={OrdersStyle.searchButton}
            onPress={() => setShowSearch(!showSearch)}
          >
            <MaterialIcons 
              name={showSearch ? "close" : "search"} 
              size={24} 
              color="#333" 
            />
          </TouchableOpacity>
        </View>
        
        {showSearch && (
          <View style={OrdersStyle.searchContainer}>
            <MaterialIcons name="search" size={20} color="#666" />
            <TextInput
              style={OrdersStyle.searchInput}
              placeholder="Search orders or items..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialIcons name="clear" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Filter Chips */}
      <View style={OrdersStyle.filtersContainer}>
        <FlatList
          data={filters}
          renderItem={renderFilterChip}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={OrdersStyle.filtersContent}
        />
      </View>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrder}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={OrdersStyle.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['#4CAF50']}
              tintColor="#4CAF50"
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;
