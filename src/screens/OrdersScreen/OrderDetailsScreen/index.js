import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OrderDetailsStyles from './style';

const OrderDetailsScreen = ({ navigation, route }) => {
  const { order } = route.params;

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

  const formatDate = (dateString, timeString) => {
    try {
      // Handle different date formats
      let date;

      if (dateString && timeString) {
        // If we have separate date and time strings
        date = new Date(`${dateString} ${timeString}`);
      } else if (dateString) {
        // If we only have date string
        date = new Date(dateString);
      } else {
        // Fallback to current date
        date = new Date();
      }

      // Check if date is valid
      if (isNaN(date.getTime())) {
        // Try parsing as timestamp if it's a number
        const timestamp = parseInt(dateString);
        if (!isNaN(timestamp)) {
          date = new Date(timestamp);
        } else {
          // Final fallback
          date = new Date();
        }
      }

      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.log('Date formatting error:', error);
      return 'Date not available';
    }
  };

  const formatTime = (timeString, dateString) => {
    try {
      let date;

      if (timeString) {
        // If time is provided separately
        if (timeString.includes(':')) {
          return timeString;
        }
        // If it's a timestamp
        date = new Date(parseInt(timeString) || timeString);
      } else if (dateString) {
        // Extract time from date string
        date = new Date(dateString);
      } else {
        date = new Date();
      }

      if (isNaN(date.getTime())) {
        return 'Time not available';
      }

      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch (error) {
      console.log('Time formatting error:', error);
      return 'Time not available';
    }
  };


  const getTrackingSteps = (status) => {
    const steps = [
      { label: 'Order Placed', icon: 'shopping-cart', completed: true },
      { label: 'Processing', icon: 'hourglass-empty', completed: status !== 'Cancelled' },
      { label: 'Shipped', icon: 'local-shipping', completed: ['Shipped', 'Delivered'].includes(status) },
      { label: 'Delivered', icon: 'check-circle', completed: status === 'Delivered' },
    ];

    if (status === 'Cancelled') {
      return [
        { label: 'Order Placed', icon: 'shopping-cart', completed: true },
        { label: 'Cancelled', icon: 'cancel', completed: true, isError: true },
      ];
    }

    return steps;
  };

  const handleCallSupport = () => {
    // Linking.openURL('tel:+1234567890');
    Linking.openURL('tel:1234567890');
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@cartify.com');
  };

  const trackingSteps = getTrackingSteps(order.status);

  return (
    <SafeAreaView style={OrderDetailsStyles.container}>
      {/* Header */}
      <View style={OrderDetailsStyles.header}>
        <TouchableOpacity 
          style={OrderDetailsStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={OrderDetailsStyles.headerTitle}>Order Details</Text>
        <TouchableOpacity 
            style={OrderDetailsStyles.shareButton}
        >
          {/* <MaterialIcons name="share" size={24} color="#333" /> */}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={OrderDetailsStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Status Card */}
        <View style={OrderDetailsStyles.statusCard}>
          <View style={OrderDetailsStyles.statusHeader}>
            <View style={[
              OrderDetailsStyles.statusBadge,
              { backgroundColor: getStatusColor(order.status) }
            ]}>
              <MaterialIcons 
                name={getStatusIcon(order.status)} 
                size={16} 
                color="#fff" 
              />
              <Text style={OrderDetailsStyles.statusText}>{order.status}</Text>
            </View>
            <Text style={OrderDetailsStyles.orderId}>#{order.id}</Text>
          </View>
          
          <Text style={OrderDetailsStyles.orderDate}>
            Placed on {formatDate(order.date)} at {formatTime(order.time)}
          </Text>

          {/* Tracking Timeline */}
          <View style={OrderDetailsStyles.trackingContainer}>
            <Text style={OrderDetailsStyles.trackingTitle}>Order Tracking</Text>
            {trackingSteps.map((step, index) => (
              <View key={index} style={OrderDetailsStyles.trackingStep}>
                <View style={OrderDetailsStyles.stepIndicator}>
                  <View style={[
                    OrderDetailsStyles.stepCircle,
                    step.completed && OrderDetailsStyles.completedStep,
                    step.isError && OrderDetailsStyles.errorStep,
                  ]}>
                    <MaterialIcons 
                      name={step.icon} 
                      size={16} 
                      color={step.completed ? '#fff' : '#ccc'} 
                    />
                  </View>
                  {index < trackingSteps.length - 1 && (
                    <View style={[
                      OrderDetailsStyles.stepLine,
                      step.completed && OrderDetailsStyles.completedLine,
                      step.isError && OrderDetailsStyles.errorLine,
                    ]} />
                  )}
                </View>
                <Text style={[
                  OrderDetailsStyles.stepLabel,
                  step.completed && OrderDetailsStyles.completedLabel,
                  step.isError && OrderDetailsStyles.errorLabel,
                ]}>
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Items Section */}
        <View style={OrderDetailsStyles.section}>
          <View style={OrderDetailsStyles.sectionHeader}>
            <MaterialIcons name="shopping-bag" size={20} color="#4CAF50" />
            <Text style={OrderDetailsStyles.sectionTitle}>
              Items ({order.items?.length})
            </Text>
          </View>

          {order.items?.map((item, index) => (
            <View key={index} style={OrderDetailsStyles.itemCard}>
              <Image 
                source={{ uri: item.image }} 
                style={OrderDetailsStyles.itemImage}
              />
              <View style={OrderDetailsStyles.itemInfo}>
                <Text style={OrderDetailsStyles.itemName}>{item.name}</Text>
                <View style={OrderDetailsStyles.itemDetails}>
                  <Text style={OrderDetailsStyles.itemQty}>Quantity: {item.quantity}</Text>
                  <Text style={OrderDetailsStyles.itemPrice}>
                    ₹{(item.priceCents * 92 / 100).toFixed(2)} each
                  </Text>
                </View>
                <Text style={OrderDetailsStyles.itemTotal}>
                  Subtotal: ₹{((item.priceCents *92 * item.quantity) / 100).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Information */}
        <View style={OrderDetailsStyles.section}>
          <View style={OrderDetailsStyles.sectionHeader}>
            <MaterialIcons name="payment" size={20} color="#4CAF50" />
            <Text style={OrderDetailsStyles.sectionTitle}>Payment Information</Text>
          </View>

          <View style={OrderDetailsStyles.paymentCard}>
            <View style={OrderDetailsStyles.paymentRow}>
              <Text style={OrderDetailsStyles.paymentLabel}>Payment Method</Text>
              <View style={OrderDetailsStyles.paymentMethod}>
                <MaterialIcons 
                  name={order.paymentMethod === 'COD' ? 'money' : 'credit-card'} 
                  size={16} 
                  color="#666" 
                />
                <Text style={OrderDetailsStyles.paymentValue}>
                  {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
                </Text>
              </View>
            </View>

            {order.paymentId && (
              <View style={OrderDetailsStyles.paymentRow}>
                <Text style={OrderDetailsStyles.paymentLabel}>Payment ID</Text>
                <Text style={OrderDetailsStyles.paymentValue}>{order.paymentId}</Text>
              </View>
            )}

            {order.paymentSigature && (
                <View style={OrderDetailsStyles.paymentRow}>
                    <Text style={OrderDetailsStyles.paymentLabel}>Payment Signature</Text>
                    <Text style={[OrderDetailsStyles.paymentValue, {fontSize:10, fontFamily:'monospace'}]}>
                        {order.paymentSigature.substring(0,20)}...
                    </Text>
                </View>
            )}

            <View style={OrderDetailsStyles.paymentRow}>
              <Text style={OrderDetailsStyles.paymentLabel}>Payment Status</Text>
              <View style={[
                OrderDetailsStyles.paymentStatusBadge,
                { backgroundColor: order.paymentStatus === 'PAID' ? '#4CAF50' :
                                order.paymentStatus === 'PENDING' ?  '#FF9800' : '#f44336' 
                }
              ]}>
                <Text style={OrderDetailsStyles.paymentStatusText}>
                  {order.paymentStatus === 'PAID' ? 'Paid' : 
                    order.paymentStatus === 'PENDING' ? 'Pending' : 'Failed' }
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={OrderDetailsStyles.section}>
          <View style={OrderDetailsStyles.sectionHeader}>
            <MaterialIcons name="receipt" size={20} color="#4CAF50" />
            <Text style={OrderDetailsStyles.sectionTitle}>Price Details</Text>
          </View>

          <View style={OrderDetailsStyles.priceCard}>
            <View style={OrderDetailsStyles.priceRow}>
              <Text style={OrderDetailsStyles.priceLabel}>
                Subtotal ({order.items?.length} items)
              </Text>
              <Text style={OrderDetailsStyles.priceValue}>
                ₹{(order.subtotal / 100).toFixed(2)}
              </Text>
            </View>

            <View style={OrderDetailsStyles.priceRow}>
              <Text style={OrderDetailsStyles.priceLabel}>Shipping</Text>
              <Text style={OrderDetailsStyles.priceValue}>
                ₹{(order.shipping  / 100).toFixed(2)}
              </Text>
            </View>

            <View style={OrderDetailsStyles.priceRow}>
              <Text style={OrderDetailsStyles.priceLabel}>Tax</Text>
              <Text style={OrderDetailsStyles.priceValue}>
                ₹{(order.tax / 100).toFixed(2)}
              </Text>
            </View>

            <View style={OrderDetailsStyles.divider} />

            <View style={OrderDetailsStyles.totalRow}>
              <Text style={OrderDetailsStyles.totalLabel}>Total Amount</Text>
              <Text style={OrderDetailsStyles.totalValue}>
                ₹{(order.total / 100).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={OrderDetailsStyles.section}>
          <View style={OrderDetailsStyles.sectionHeader}>
            <MaterialIcons name="location-on" size={20} color="#4CAF50" />
            <Text style={OrderDetailsStyles.sectionTitle}>Delivery Address</Text>
          </View>

          <View style={OrderDetailsStyles.addressCard}>
            <Text style={OrderDetailsStyles.addressText}>
              {order.deliveryAddress || 'Address not available'}
            </Text>
          </View>
        </View>

        {/* Support Section */}
        <View style={OrderDetailsStyles.section}>
          <View style={OrderDetailsStyles.sectionHeader}>
            <MaterialIcons name="help" size={20} color="#4CAF50" />
            <Text style={OrderDetailsStyles.sectionTitle}>Need Help?</Text>
          </View>

          <View style={OrderDetailsStyles.supportCard}>
            <TouchableOpacity 
              style={OrderDetailsStyles.supportButton}
              onPress={handleCallSupport}
            >
              <MaterialIcons name="phone" size={20} color="#4CAF50" />
              <Text style={OrderDetailsStyles.supportButtonText}>Call Support</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={OrderDetailsStyles.supportButton}
              onPress={handleEmailSupport}
            >
              <MaterialIcons name="email" size={20} color="#4CAF50" />
              <Text style={OrderDetailsStyles.supportButtonText}>Email Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={OrderDetailsStyles.bottomActions}>
        {order.status === 'Delivered' && (
          <TouchableOpacity style={OrderDetailsStyles.reorderButton}>
            <MaterialIcons name="refresh" size={20} color="#4CAF50" />
            <Text style={OrderDetailsStyles.reorderButtonText}>Reorder Items</Text>
          </TouchableOpacity>
        )}
        
        {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
          <TouchableOpacity style={OrderDetailsStyles.trackButton}
            onPress={()=> navigation.goBack()}
          >
            {/* <MaterialIcons name="track-changes" size={20} color="#fff" /> */}
            {/* <Text style={OrderDetailsStyles.trackButtonText}>Track Order</Text> */}
            <Text style={OrderDetailsStyles.trackButtonText}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
