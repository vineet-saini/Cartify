import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addOrder, setOrders, updateOrderStatus } from "../../redux/slices/orderSlice";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RazorpayCheckout from "react-native-razorpay";
import {RAZORPAY_KEY_ID} from '../../config/keys';
// import Config from 'react-native-config';
// import {createOrder, clearSelectedCartItems } from '../../utils/orderUtils';
import CheckoutStyles from "./style";
import { clearAllItems, removeMultipleFromCart } from "../../redux/slices/cartSlice";

const CheckoutScreen = ({ navigation }) => {
  // const [user, setUser] = useState('');
  // const [items, setItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isProcessing, setIsProcessing] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [buttonScale] = useState(new Animated.Value(1));

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.currentUser);
  const {items, selectedItems} = useSelector(state => state.cart);
  // const orders = useSelector(state => state.orders.orders);
  const selectedCartItems = useMemo(() => {
    return items.filter(item =>
      selectedItems?.includes(item.id)
    );
  }, [items, selectedItems]);

  const SHIPPING = 500 * 92;
  const TAX_PERCENT = 0.1;
  
  // const RAZORPAY_KEY_ID = Config.RAZORPAY_KEY_ID;
  const COMPANY_NAME = "Cartify";
  
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     loadCheckoutData();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // const loadCheckoutData = async () => {
  //   try {
  //     setIsLoading(true);
      // const currentUser = await AsyncStorage.getItem('currentUser');
      // if (!user) return;

      // const parsedUser = JSON.parse(currentUser);
      // // setUser(parsedUser);

      // const cartKey = `cart_${parsedUser.email}`;
      // const selectedKey = `selected_cart_${parsedUser.email}`;

      // const cartData = await AsyncStorage.getItem(cartKey);
      // const selectedData = await AsyncStorage.getItem(selectedKey);

      // const cart = cartData ? JSON.parse(cartData) : [];
      // const selected = selectedData ? JSON.parse(selectedData) : [];

      // const selectedItems = cart
      //   .filter(item => selected.includes(item.id))
      //   .map(item => ({
      //     ...item,
      //     quantity: item.quantity || 1,
      //   }));

  //     selectedCartItems;
  //   } catch (error) {
  //     console.log('Checkout error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getSubtotal = () => {
    return selectedCartItems.reduce((sum, item) => {
      const price = item.priceCents * 92 || 0;
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);
  };

  const getTax = () => {
    const subtotal = getSubtotal();
    return subtotal * TAX_PERCENT;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + SHIPPING;
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const processRazorpayPayment = () => {
    const totalAmount = getTotal();
    const amountInPaise = Math.round(totalAmount);

    if (amountInPaise < 100) {
      Alert.alert('Error', 'Minimum amount is ₹1');
      return;
    }

    const options = {
      description: 'Payment for your order',
      currency: 'INR',
      key: RAZORPAY_KEY_ID,
      amount: amountInPaise,
      name: COMPANY_NAME,
      prefill:{
        email: user.email,
        contact: user.phone || '9999999999',
        name: user.name,
      },
      theme: { color: '#4CAF50'},
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        handlePaymentSuccess(data);
      })
      .catch((error) => {
        handlePaymentFailure(error);
      });
  };

  const handlePaymentSuccess = async (paymentData) => {
    try{
      setIsProcessing(true);

      const defaultAddress = user.addresses?.find(a=>a.isDefault);
      const deliveryAddress = defaultAddress
        ? `${defaultAddress.street}, ${defaultAddress.city} - ${defaultAddress.pincode}`
        : 'No address provided';
      
      const orderData = {
        paymentMethod: 'RAZORPAY',
        paymentId: paymentData.razorpay_payment_id,
        PaymentSignature: paymentData.razorpay_signature,
        items: selectedCartItems.map(item => ({
          id:item.id,
          name:item.name,
          image:item.image,
          priceCents: item.priceCents,
          quantity: item.quantity,
        })),
        subtotal: getSubtotal(),
        shipping: SHIPPING,
        tax: getTax(),
        total: getTotal(),
        deliveryAddress,
        paymentStatus: 'PAID',
        status: 'Processing',
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString('en-US', {hour12: true}),
      };

      // const newOrder = await createOrder(orderData);
      const newOrder = {
        id : Date.now(),
        ...orderData,
      }

       dispatch(addOrder(newOrder));

      if(newOrder){
        const selectedItemsIds = selectedCartItems.map(item=> item.id);
        // await clearSelectedCartItems(selectedItemsIds);
        // dispatch(clearAllItems());
        dispatch(removeMultipleFromCart(selectedItemsIds));

        navigation.replace('PaymentSuccess', {
          orderData: newOrder,
          paymentData: paymentData,
        })

      //   Alert.alert(
      //     '🎉 Payment Successful!',
      //     `Order ID: ${newOrder.id}\nPayment ID: ${paymentData.razorpay_payment_id}\nTotal: $${(newOrder.total/100).toFixed(2)}\n\nEstimated delivery: ${getEstimatedDelivery()}`,
      //     [
      //       {
      //         text: 'View Orders',
      //         onPress: ()=>navigation.navigate('Main', {screen:'Orders'}),
      //       },
      //       {
      //         text: 'Continue Shopping',
      //         onPress: ()=> navigation.navigate('Main', {screen : 'Home'}),
      //       },
      //     ],
      //   );
      } 
    } catch(error){
      Alert.alert('Error','Payment successful but order creation failed. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentFailure = (error) => {
    setIsProcessing(false);
    if(error.code === RazorpayCheckout.PAYMENT_CANCELLED) {
      Alert.alert('Payment Cancelled', 'You cancelled the payment.');
    } else{
      Alert.alert('Payment Failed', `Error: ${error.description || 'Something went wrong during payment.'}`);
    }
  };

  const placeOrder = async () => {
    if (!user || selectedCartItems.length === 0) {
      Alert.alert('Error', 'No items selected for checkout');
      return;
    }

    animateButton();

    if(paymentMethod === 'RAZORPAY'){
      processRazorpayPayment();
      return;
    }

    try {
      setIsProcessing(true);
      const defaultAddress = user.addresses?.find(a => a.isDefault);
      const deliveryAddress = defaultAddress
        ? `${defaultAddress.street}, ${defaultAddress.city} - ${defaultAddress.pincode}`
        : 'No address provided';

      const orderData = {
        paymentMethod,
        items: selectedCartItems.map(item => ({
          id: item.id,
          name: item.name,
          image: item.image,
          priceCents: item.priceCents,
          quantity: item.quantity,
        })),
        subtotal: getSubtotal(),
        shipping: SHIPPING,
        tax: getTax(),
        total: getTotal(),
        deliveryAddress,
        paymentStatus: 'PENDING',
        status: 'Processing',
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString('en-US', {hour12: true}),
      };

      // const newOrder = await createOrder(orderData);
      const newOrder = {
        id: Date.now(),
        ...orderData,
      }

      dispatch(addOrder(newOrder));

      if (newOrder) {
        const selectedItemIds = selectedCartItems.map(item => item.id);
        // await clearSelectedCartItems(selectedItemIds);
        // dispatch(clearAllItems());
        dispatch(removeMultipleFromCart(selectedItemIds));
        
        navigation.replace('PaymentSuccess', {
          orderData: newOrder,
          paymentData: null,
        });
      //   Alert.alert(
      //     '🎉 Order Placed Successfully!',
      //     `Order ID: ${newOrder.id}\nTotal: $${(newOrder.total / 100).toFixed(2)}\n\nEstimated delivery: ${getEstimatedDelivery()}`,
      //     [
      //       {
      //         text: 'View Orders',
      //         onPress: () => navigation.navigate('Main', { screen: 'Orders' }),
      //       },
      //       {
      //         text: 'Continue Shopping',
      //         onPress: () => navigation.navigate('Main', { screen: 'Home' }),
      //       },
      //     ],
      //   );
      } else {
        Alert.alert('Error', 'Failed to place order. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // if (isLoading) {
  //   return (
  //     <View style={CheckoutStyles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#2ecc71" />
  //       <Text style={CheckoutStyles.loadingText}>Loading checkout...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={CheckoutStyles.container}>
      <View style={CheckoutStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={CheckoutStyles.headerTitle}>Checkout</Text>
        <View style={CheckoutStyles.headerRight}>
          <MaterialIcons name="security" size={20} color="#4CAF50" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Info */}
        <View style={CheckoutStyles.section}>
          <View style={CheckoutStyles.sectionHeader}>
            <MaterialIcons name="local-shipping" size={20} color="#4CAF50" />
            <Text style={CheckoutStyles.sectionTitle}>
              Delivery Information
            </Text>
          </View>

          {user ? (
            <View style={CheckoutStyles.userInfo}>
              <Text style={CheckoutStyles.userName}>{user.name}</Text>
              <Text style={CheckoutStyles.userContact}>{user.phone}</Text>
              <Text style={CheckoutStyles.userEmail}>{user.email}</Text>
            </View>
          ) : (
            <Text>No user data</Text>
          )}
        </View>

        {/* Address */}
        <View style={CheckoutStyles.section}>
          <View style={CheckoutStyles.sectionHeader}>
            <MaterialIcons name="location-on" size={20} color="#4CAF50" />
            <Text style={CheckoutStyles.sectionTitle}>Delivery Address</Text>
          </View>

          {user && user.addresses && user.addresses.length > 0 ? (
            <>
              {(() => {
                const defaultAddress = user.addresses.find(a => a.isDefault);
                if (!defaultAddress) {
                  return (
                    <View style={CheckoutStyles.noAddress}>
                      <MaterialIcons name="warning" size={20} color="#f39c12" />
                      <Text style={CheckoutStyles.noAddressText}>
                        No default address selected
                      </Text>
                    </View>
                  );
                }

                return (
                  <View style={CheckoutStyles.addressCard}>
                    <View style={CheckoutStyles.addressInfo}>
                      <Text style={CheckoutStyles.addressLabel}>
                        {defaultAddress.label}
                      </Text>
                      <Text style={CheckoutStyles.addressText}>
                        {defaultAddress.street}
                      </Text>
                      <Text style={CheckoutStyles.addressText}>
                        {defaultAddress.city} - {defaultAddress.pincode}
                      </Text>
                      <View style={CheckoutStyles.deliveryEstimate}>
                        <MaterialIcons name="schedule" size={16} color="#666" />
                        <Text style={CheckoutStyles.deliveryText}>
                          Estimated delivery: {getEstimatedDelivery()}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={CheckoutStyles.editButton}
                      onPress={() => navigation.navigate('EditProfile')}
                    >
                      <MaterialIcons name="edit" size={16} color="#3498db" />
                      <Text style={CheckoutStyles.editText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                );
              })()}
            </>
          ) : (
            <View style={CheckoutStyles.noAddress}>
              <MaterialIcons name="add-location" size={20} color="#e74c3c" />
              <Text style={CheckoutStyles.noAddressText}>No Address Added</Text>
              <TouchableOpacity
                style={CheckoutStyles.addAddressButton}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Text style={CheckoutStyles.addAddressText}>Add Address</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Items */}
        <View style={CheckoutStyles.section}>
          <View style={CheckoutStyles.sectionHeader}>
            <MaterialIcons name="shopping-bag" size={20} color="#4CAF50" />
            <Text style={CheckoutStyles.sectionTitle}>
              Items ({selectedCartItems.length})
            </Text>
          </View>

          {selectedCartItems.map(item => (
            <View key={item.id} style={CheckoutStyles.productCard}>
              <Image
                source={{ uri: item.image }}
                style={CheckoutStyles.productImage}
              />
              <View style={CheckoutStyles.productInfo}>
                <Text numberOfLines={2} style={CheckoutStyles.productName}>
                  {item.name}
                </Text>
                <View style={CheckoutStyles.productDetails}>
                  <Text style={CheckoutStyles.productQty}>
                    Qty: {item.quantity}
                  </Text>
                  <Text style={CheckoutStyles.productPrice}>
                    ₹{((item.priceCents * 92) / 100).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Payment */}
        <View style={CheckoutStyles.section}>
          <View style={CheckoutStyles.sectionHeader}>
            <MaterialIcons name="payment" size={20} color="#4CAF50" />
            <Text style={CheckoutStyles.sectionTitle}>Payment Method</Text>
          </View>

          {[
            { key: 'COD', label: 'Cash on Delivery', icon: 'money' },
            {
              key: 'RAZORPAY',
              label: 'Pay Online',
              subtitle: 'Cards/UPI/Wallets',
              icon: 'credit-card',
            },
          ].map(method => (
            <TouchableOpacity
              key={method.key}
              style={[
                CheckoutStyles.paymentOption,
                paymentMethod === method.key && CheckoutStyles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod(method.key)}
            >
              <View style={CheckoutStyles.paymentLeft}>
                <MaterialIcons
                  name={method.icon}
                  size={20}
                  color={paymentMethod === method.key ? '#4CAF50' : '#666'}
                />
                <View style={CheckoutStyles.paymentInfo}>
                  <Text
                    style={[
                      CheckoutStyles.paymentLabel,
                      paymentMethod === method.key &&
                        CheckoutStyles.selectedPaymentText,
                    ]}
                  >
                    {method.label}
                  </Text>
                  {method.subtitle && (
                    <Text style={CheckoutStyles.paymentSubtitle}>
                      {method.subtitle}
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={[
                  CheckoutStyles.radioButton,
                  paymentMethod === method.key && CheckoutStyles.radioSelected,
                ]}
              >
                {paymentMethod === method.key && (
                  <MaterialIcons name="check" size={12} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary */}
        <View style={CheckoutStyles.section}>
          <View style={CheckoutStyles.sectionHeader}>
            <MaterialIcons name="receipt" size={20} color="#4CAF50" />
            <Text style={CheckoutStyles.sectionTitle}>Order Summary</Text>
          </View>

          <View style={CheckoutStyles.summaryRow}>
            <Text style={CheckoutStyles.summaryLabel}>Subtotal</Text>
            <Text style={CheckoutStyles.summaryValue}>
              ₹{(getSubtotal() / 100).toFixed(2)}
            </Text>
          </View>

          <View style={CheckoutStyles.summaryRow}>
            <Text style={CheckoutStyles.summaryLabel}>Shipping</Text>
            <Text style={CheckoutStyles.summaryValue}>
              ₹{(SHIPPING / 100).toFixed(2)}
            </Text>
          </View>

          <View style={CheckoutStyles.summaryRow}>
            <Text style={CheckoutStyles.summaryLabel}>Tax (10%)</Text>
            <Text style={CheckoutStyles.summaryValue}>
              ₹{(getTax() / 100).toFixed(2)}
            </Text>
          </View>

          <View style={CheckoutStyles.divider} />

          <View style={CheckoutStyles.totalRow}>
            <Text style={CheckoutStyles.totalLabel}>Total</Text>
            <Text style={CheckoutStyles.totalValue}>
              ₹{(getTotal() / 100).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Order Button */}
      <View style={CheckoutStyles.bottomContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[
              CheckoutStyles.orderButton,
              (selectedCartItems.length === 0 || isProcessing) &&
                CheckoutStyles.disabledButton,
            ]}
            onPress={placeOrder}
            disabled={selectedCartItems.length === 0 || isProcessing}
          >
            {isProcessing ? (
              <View style={CheckoutStyles.processingContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={CheckoutStyles.processingText}>Processing...</Text>
              </View>
            ) : (
              <View style={CheckoutStyles.buttonContent}>
                <MaterialIcons
                  name={
                    paymentMethod === 'RAZORPAY' ? 'payment' : 'shopping-cart'
                  }
                  size={20}
                  color="#fff"
                />
                <Text style={CheckoutStyles.orderButtonText}>
                  {paymentMethod === 'RAZORPAY' ? 'Pay Now' : 'Place Order'} • ₹
                  {(getTotal() / 100).toFixed(2)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default CheckoutScreen;
