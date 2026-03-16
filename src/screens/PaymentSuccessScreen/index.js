import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SuccessStyles from './style';

const { width } = Dimensions.get('window');

const PaymentSuccessScreen = ({ navigation, route }) => {
  const { orderData, paymentData } = route.params;
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Success animation sequence
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={SuccessStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
      {/* Success Animation */}
      <View style={SuccessStyles.animationContainer}>
        <Animated.View
          style={[
            SuccessStyles.successCircle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <MaterialIcons name="check" size={60} color="#fff" />
        </Animated.View>
      </View>

      {/* Success Content */}
      <Animated.View
        style={[
          SuccessStyles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={SuccessStyles.successTitle}>Payment Successful!</Text>
        <Text style={SuccessStyles.successSubtitle}>
          Your order has been placed successfully
        </Text>

        {/* Order Details Card */}
        <View style={SuccessStyles.orderCard}>
          <View style={SuccessStyles.orderHeader}>
            <MaterialIcons name="receipt" size={24} color="#4CAF50" />
            <Text style={SuccessStyles.orderHeaderText}>Order Details</Text>
          </View>

          <View style={SuccessStyles.orderDetail}>
            <Text style={SuccessStyles.detailLabel}>Order ID</Text>
            <Text style={SuccessStyles.detailValue}>{orderData.id}</Text>
          </View>

          {paymentData && (
            <View style={SuccessStyles.orderDetail}>
              <Text style={SuccessStyles.detailLabel}>Payment ID</Text>
              <Text style={SuccessStyles.detailValue}>{paymentData.razorpay_payment_id}</Text>
            </View>
          )}

          <View style={SuccessStyles.orderDetail}>
            <Text style={SuccessStyles.detailLabel}>Total Amount</Text>
            <Text style={SuccessStyles.totalAmount}>
              ₹{(orderData.total / 100).toFixed(2)}
            </Text>
          </View>

          <View style={SuccessStyles.divider} />

          <View style={SuccessStyles.deliveryInfo}>
            <MaterialIcons name="local-shipping" size={20} color="#4CAF50" />
            <View style={SuccessStyles.deliveryText}>
              <Text style={SuccessStyles.deliveryLabel}>Estimated Delivery</Text>
              <Text style={SuccessStyles.deliveryDate}>{getEstimatedDelivery()}</Text>
            </View>
          </View>
        </View>

        {/* Items Summary */}
        <View style={SuccessStyles.itemsCard}>
          <Text style={SuccessStyles.itemsTitle}>
            Items Ordered ({orderData.items.length})
          </Text>
          {orderData.items.slice(0, 3).map((item, index) => (
            <View key={item.id} style={SuccessStyles.itemRow}>
              <Text style={SuccessStyles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={SuccessStyles.itemQty}>x{item.quantity}</Text>
            </View>
          ))}
          {orderData.items.length > 3 && (
            <Text style={SuccessStyles.moreItems}>
              +{orderData.items.length - 3} more items
            </Text>
          )}
        </View>
      </Animated.View>

      {/* Action Buttons */}
      <Animated.View
        style={[
          SuccessStyles.buttonContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={SuccessStyles.primaryButton}
          onPress={() => navigation.navigate('Main', { screen: 'Orders' })}
        >
          <MaterialIcons name="list-alt" size={20} color="#fff" />
          <Text style={SuccessStyles.primaryButtonText}>View Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={SuccessStyles.secondaryButton}
          onPress={() => navigation.navigate('Main', { screen: 'Home' })}
        >
          <MaterialIcons name="shopping-cart" size={20} color="#4CAF50" />
          <Text style={SuccessStyles.secondaryButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </Animated.View>
      </ScrollView>
    </View>
  );
};

export default PaymentSuccessScreen;
