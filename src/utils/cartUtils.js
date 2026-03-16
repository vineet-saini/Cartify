// import AsyncStorage from "@react-native-async-storage/async-storage";

// let cartUpdateCallback = null;

// export const setCartUpdateCallback = (callback) => {
//   cartUpdateCallback = callback;
// };

// export const addProductToCart = async(product) => {
//     const currentUser = await AsyncStorage.getItem('currentUser');

//   if (!currentUser) {
//     return { status: "login_required" };
//   }

//   const user = JSON.parse(currentUser);
//   const cartKey = `cart_${user.email}`;

//   const existingCart = await AsyncStorage.getItem(cartKey);
//   const cart = existingCart ? JSON.parse(existingCart) : [];

//   const itemExists = cart.find(i => i.id === product.id);

//   if (itemExists) {
//     return { status: "exists" };
//   }

//   cart.push(product);

//   await AsyncStorage.setItem(cartKey, JSON.stringify(cart));

//   // Trigger cart update callback
//   if (cartUpdateCallback) {
//     cartUpdateCallback();
//   }

//   return { status: "added" };
// };

// export const getCartCount = async () => {
//   const currentUser = await AsyncStorage.getItem('currentUser');
//   if (!currentUser) return 0;

//   const user = JSON.parse(currentUser);
//   const cartKey = `cart_${user.email}`;
//   const cart = await AsyncStorage.getItem(cartKey);
//   const items = cart ? JSON.parse(cart) : [];
//   return items.length;
// };

// export const removeFromCart = async (productId) => {
//   const currentUser = await AsyncStorage.getItem('currentUser');
//   if (!currentUser) return;

//   const user = JSON.parse(currentUser);
//   const cartKey = `cart_${user.email}`;
//   const cart = await AsyncStorage.getItem(cartKey);
//   const items = cart ? JSON.parse(cart) : [];
  
//   const updatedCart = items.filter(item => item.id !== productId);
//   await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCart));

//   // Trigger cart update callback
//   if (cartUpdateCallback) {
//     cartUpdateCallback();
//   }
// };

// export const clearCart = async () => {
//   const currentUser = await AsyncStorage.getItem('currentUser');
//   if (!currentUser) return;

//   const user = JSON.parse(currentUser);
//   const cartKey = `cart_${user.email}`;
//   await AsyncStorage.setItem(cartKey, JSON.stringify([]));

//   // Trigger cart update callback
//   if (cartUpdateCallback) {
//     cartUpdateCallback();
//   }
// };


// import AsyncStorage from "@react-native-async-storage/async-storage";

// let cartUpdateCallback = null;

// export const setCartUpdateCallback = (callback) => {
//   cartUpdateCallback = callback;
// };

// export const addProductToCart = async(product) => {
//     const currentUser = await AsyncStorage.getItem('currentUser');

//   if (!currentUser) {
//     return { status: "login_required" };
//   }

//   const user = JSON.parse(currentUser);
//   const cartKey = `cart_${user.email}`;

//   const existingCart = await AsyncStorage.getItem(cartKey);
//   const cart = existingCart ? JSON.parse(existingCart) : [];

//   const itemExists = cart.find(i => i.id === product.id);

//   if (itemExists) {
//     return { status: "exists" };
//   }

//   cart.push(product);

//   await AsyncStorage.setItem(cartKey, JSON.stringify(cart));

//   // Trigger cart update callback
//   if (cartUpdateCallback) {
//     cartUpdateCallback();
//   }

//   return { status: "added" };
// };

// export const removeFromCart = async (productId) => {
//   const currentUser = await AsyncStorage.getItem('currentUser');
//   if (!currentUser) return;

//   const user = JSON.parse(currentUser);
//   const cartKey = `cart_${user.email}`;
//   const cart = await AsyncStorage.getItem(cartKey);
//   const items = cart ? JSON.parse(cart) : [];
  
//   const updatedCart = items.filter(item => item.id !== productId);
//   await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCart));

//   // Trigger cart update callback
//   if (cartUpdateCallback) {
//     cartUpdateCallback();
//   }
// };

// export const getCartCount = async () => {
//   const currentUser = await AsyncStorage.getItem('currentUser');
//   if (!currentUser) return 0;

//   const user = JSON.parse(currentUser);
//   const cartKey = `cart_${user.email}`;
//   const cart = await AsyncStorage.getItem(cartKey);
//   const items = cart ? JSON.parse(cart) : [];
//   return items.length;
// };


import AsyncStorage from "@react-native-async-storage/async-storage";

let cartUpdateCallback = null;

export const setCartUpdateCallback = (callback) => {
  cartUpdateCallback = callback;
};

export const addProductToCart = async(product) => {
    const currentUser = await AsyncStorage.getItem('currentUser');

  if (!currentUser) {
    return { status: "login_required" };
  }

  const user = JSON.parse(currentUser);
  const cartKey = `cart_${user.email}`;

  const existingCart = await AsyncStorage.getItem(cartKey);
  const cart = existingCart ? JSON.parse(existingCart) : [];

  const itemExists = cart.find(i => i.id === product.id);

  if (itemExists) {
    return { status: "exists" };
  }

  // Add quantity property when adding to cart
  const productWithQuantity = {
    ...product,
    quantity: 1
  };

  cart.push(productWithQuantity);

  await AsyncStorage.setItem(cartKey, JSON.stringify(cart));

  // Trigger cart update callback
  if (cartUpdateCallback) {
    cartUpdateCallback();
  }

  return { status: "added" };
};

export const removeFromCart = async (productId) => {
  const currentUser = await AsyncStorage.getItem('currentUser');
  if (!currentUser) return;

  const user = JSON.parse(currentUser);
  const cartKey = `cart_${user.email}`;
  const cart = await AsyncStorage.getItem(cartKey);
  const items = cart ? JSON.parse(cart) : [];
  
  const updatedCart = items.filter(item => item.id !== productId);
  await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCart));

  // Trigger cart update callback
  if (cartUpdateCallback) {
    cartUpdateCallback();
  }
};

export const getCartCount = async () => {
  const currentUser = await AsyncStorage.getItem('currentUser');
  if (!currentUser) return 0;

  const user = JSON.parse(currentUser);
  const cartKey = `cart_${user.email}`;
  const cart = await AsyncStorage.getItem(cartKey);
  const items = cart ? JSON.parse(cart) : [];
  return items.length;
};
