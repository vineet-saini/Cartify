import AsyncStorage from '@react-native-async-storage/async-storage';

export const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD${timestamp}${random}`;
};

export const createOrder = async (orderData) => {
  try {
    const currentUser = await AsyncStorage.getItem('currentUser');
    if (!currentUser) return null;

    const user = JSON.parse(currentUser);
    const ordersKey = `orders_${user.email}`;
    
    // Get existing orders
    
    const orderId = 'ORD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Create new order
    // const newOrder = {
    //     id: generateOrderId(),
    //     date: new Date().toISOString(),
    //     time: new Date().toLocaleTimeString(),
    //   status: 'Processing',
    //   paymentMethod: orderData.paymentMethod,
    //   items: orderData.items,
    //   subtotal: orderData.subtotal,
    //   shipping: orderData.shipping,
    //   tax: orderData.tax,
    //   total: orderData.total,
    //   deliveryAddress: orderData.deliveryAddress,
    //   customerInfo: {
    //       name: user.name,
    //       email: user.email,
    //       phone: user.phone,
    //     }
    // };

    const newOrder = {
        ...orderData,
        id: orderId,
        date: orderData.date || new Date().toISOString(),
        time: orderData.time || new Date().toLocaleTimeString('en-US', {hour12:true}),
        createdAt: Date.now(),
    }

    const existingOrders = await AsyncStorage.getItem(ordersKey);
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    
    // Add to orders array
    orders.push(newOrder);
    
    // Save back to storage
    await AsyncStorage.setItem(ordersKey, JSON.stringify(orders));
    
    return newOrder;
  } catch (error) {
    console.log('Error creating order:', error);
    return null;
  }
};

export const getUserOrders = async () => {
  try {
    const currentUser = await AsyncStorage.getItem('currentUser');
    if (!currentUser) return [];

    const user = JSON.parse(currentUser);
    const ordersKey = `orders_${user.email}`;
    
    const orders = await AsyncStorage.getItem(ordersKey);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.log('Error getting orders:', error);
    return [];
  }
};

export const clearSelectedCartItems = async (selectedItemIds) => {
  try {
    const currentUser = await AsyncStorage.getItem('currentUser');
    if (!currentUser) return;

    const user = JSON.parse(currentUser);
    const cartKey = `cart_${user.email}`;
    const selectedKey = `selected_cart_${user.email}`;
    
    // Get current cart
    const cartData = await AsyncStorage.getItem(cartKey);
    const cart = cartData ? JSON.parse(cartData) : [];
    
    // Remove selected items from cart
    const updatedCart = cart.filter(item => !selectedItemIds.includes(item.id));
    
    // Save updated cart
    await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCart));
    
    // Clear selected items
    await AsyncStorage.removeItem(selectedKey);
    
  } catch (error) {
    console.log('Error clearing cart items:', error);
  }
};
