// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   Alert,
// } from "react-native";
// import { removeFromCart } from "../../utils/cartUtils";
// import { useFocusEffect } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Footer from "../../components/Footer/index";
// import CartStyle from "./style";

// const CartScreen = ({ navigation }) => {
//   const [cart, setCart] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);

//   // useEffect(() => {
//   //   loadCart();
//   //   loadSelectedItems();
//   // }, []);

//   useFocusEffect(
//     React.useCallback(()=>{
//       loadCart();
//       loadSelectedItems();
//     },[])
//   );

//   const loadCart = async () => {
//     try {
//       const currentUser = await AsyncStorage.getItem("currentUser");
//       if (!currentUser) return;

//       const user = JSON.parse(currentUser);
//       const cartKey = `cart_${user.email}`;
//       const storedCart = await AsyncStorage.getItem(cartKey);

//       if (storedCart) {
//         const parsedCart = JSON.parse(storedCart).map(item => ({
//           ...item,
//           quantity: item.quantity || 1,
//         }));

//         setCart(parsedCart);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const loadSelectedItems = async () => {
//     try {
//       const currentUser = await AsyncStorage.getItem('currentUser');
//       if (!currentUser) return;

//       const user = JSON.parse(currentUser);
//       const selectedKey = `selected_cart_${user.email}`;

//       const storedSelected = await AsyncStorage.getItem(selectedKey);

//       if (storedSelected) {
//         setSelectedItems(JSON.parse(storedSelected));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
  

//   const saveCart = async updatedCart => {
//     try {
//       const currentUser = await AsyncStorage.getItem("currentUser");
//       if (!currentUser) return;

//       const user = JSON.parse(currentUser);
//       const cartKey = `cart_${user.email}`;

//       setCart(updatedCart);
//       await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeItem = async id => {
//     const updatedCart = cart.filter(item => item.id !== id);
//     saveCart(updatedCart);

//     await removeFromCart(id);

//     const updatedSelected = selectedItems.filter(itemId => itemId !== id);
//     setSelectedItems(updatedSelected);

//     const currentUser = await AsyncStorage.getItem('currentUser');
//     const user = JSON.parse(currentUser);
//     const selectedKey = `selected_cart_${user.email}`;

//     await AsyncStorage.setItem(selectedKey, JSON.stringify(updatedSelected));
//   };

//   const incrementQuantity = id => {
//     const updatedCart = cart.map(item =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );

//     saveCart(updatedCart);
//   };

//   const decrementQuantity = id => {
//     const updatedCart = cart.map(item =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );

//     saveCart(updatedCart);
//   };

//   const toggleSelect = async id => {
//     try {
//       const currentUser = await AsyncStorage.getItem('currentUser');
//       if (!currentUser) return;

//       const user = JSON.parse(currentUser);
//       const selectedKey = `selected_cart_${user.email}`;

//       let updatedSelection;

//       if (selectedItems.includes(id)) {
//         updatedSelection = selectedItems.filter(item => item !== id);
//       } else {
//         updatedSelection = [...selectedItems, id];
//       }

//       setSelectedItems(updatedSelection);

//       await AsyncStorage.setItem(selectedKey, JSON.stringify(updatedSelection));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getTotalPrice = () => {
//     return cart.reduce((total, item) => {
//       if (selectedItems.includes(item.id)) {
//         return total + item.priceCents * item.quantity;
//       }
//       return total;
//     }, 0);
//   };

//   const viewDetails = item => {
//     navigation.navigate("ProductDetails", { product: item });
//   };

//   return (
//     <View style={CartStyle.container}>
//       <Text style={CartStyle.title}>My Cart</Text>

//       {cart.length === 0 ? (
//         <Text style={CartStyle.emptyText}>Your Cart is Empty</Text>
//       ) : (
//         <FlatList
//           data={cart}
//           keyExtractor={(item, index) => item.id + '_' + index}
//           contentContainerStyle={{ paddingBottom: 100 }}
//           renderItem={({ item }) => {
//             const isSelected = selectedItems.includes(item.id);

//             return (
//               <View
//                 style={[
//                   CartStyle.card,
//                   isSelected && { borderColor: 'green', borderWidth: 2 },
//                 ]}
//               >
//                 {/* CHECKBOX */}
//                 <TouchableOpacity
//                   style={[
//                     CartStyle.checkbox,
//                     isSelected && CartStyle.checkboxSelected,
//                   ]}
//                   onPress={() => toggleSelect(item.id)}
//                 >
//                   {isSelected && <Text style={CartStyle.checkmark}>✓</Text>}
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={{ flexDirection: 'row', flex: 1 }}
//                   onPress={() => viewDetails(item)}
//                 >
//                   <Image source={{ uri: item.image }} style={CartStyle.image} />

//                   <View style={CartStyle.productInfo}>
//                     <Text numberOfLines={2} style={CartStyle.productTitle}>
//                       {item.name}
//                     </Text>

//                     <Text style={CartStyle.price}>
//                       $ {(item.priceCents / 100).toFixed(2)}
//                     </Text>

//                     {/* Quantity */}
//                     <View style={CartStyle.quantityContainer}>
//                       <TouchableOpacity
//                         onPress={() => decrementQuantity(item.id)}
//                         style={CartStyle.qtyBtn}
//                       >
//                         <Text style={CartStyle.qtyText}>-</Text>
//                       </TouchableOpacity>

//                       <Text style={CartStyle.qtyNumber}>{item.quantity}</Text>

//                       <TouchableOpacity
//                         onPress={() => incrementQuantity(item.id)}
//                         style={CartStyle.qtyBtn}
//                       >
//                         <Text style={CartStyle.qtyText}>+</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => removeItem(item.id)}
//                   style={CartStyle.removeBtn}
//                 >
//                   <Text style={CartStyle.removeText}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         />
//       )}

//       {/* <Footer /> */}

//       {selectedItems.length > 0 && (
//         <View style={CartStyle.checkoutBar}>
//           <View style={CartStyle.totalSection}>
//             <Text style={CartStyle.itemsSelected}>
//               {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}{' '}
//               selected
//             </Text>

//             <Text style={CartStyle.totalPrice}>
//               ${(getTotalPrice() / 100).toFixed(2)}
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={CartStyle.checkoutBtn}
//             onPress={() =>
//               navigation.navigate('Checkout')
//               // Alert.alert('Order Placed!', 'Thank you for your order')
//             }
//           >
//             <Text style={CartStyle.checkoutText}>Checkout</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* <Footer /> */}
//     </View>
//   );
// };

// export default CartScreen;


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ScrollView,
} from "react-native";
// import { removeFromCart } from "../../utils/cartUtils";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity, setCart, toggleSelectedItems, selectAllItems, clearAllItems } from "../../redux/slices/cartSlice";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import CartStyle from "./style";

const CartScreen = ({ navigation }) => {
  // const [cart, setCart] = useState([]);
  const user = useSelector(state => state.auth.currentUser);
  const cart = useSelector(state => state.cart.items);
  const selectedItems = useSelector(state => state.cart.selectedItems);
  const selectedProducts = cart.filter(item => selectedItems.includes(item.id));

  const {totalPrice, totalItems} = selectedProducts.reduce(
    (acc, item) => {
      acc.totalPrice += item.priceCents * item.quantity;
      acc.totalItems += item.quantity;
      return acc;
    },
    {totalPrice : 0, totalItems : 0}
  );

  const dispatch = useDispatch();
  // const [selectedItems, setSelectedItems] = useState([]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const loadPresistedCart = async () => {
  //       // const storedCart = await AsyncStorage.getItem("cart");
  //       if(cart){
  //         dispatch(setCart(cart));
  //       }
  //     };
  //     loadPresistedCart();
  //     // loadSelectedItems();
  //   }, [cart])
  // );





  // const loadSelectedItems = async () => {
  //   try {
      // const currentUser = await AsyncStorage.getItem('currentUser');
      // if (!user) return;
      // const selectedProducts = cart.filter(item => selectedItems.includes(item.id));
      // const user = JSON.parse(currentUser);
      // const selectedKey = `selected_cart_${user.email}`;
      // const storedSelected = await AsyncStorage.getItem(selectedKey);
      // const storedSelected = selectedKey;

      // if (storedSelected) {
      //   setSelectedItems(JSON.parse(storedSelected));
      // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const saveCart = async updatedCart => {
  //   try {
  //     const currentUser = await AsyncStorage.getItem("currentUser");
  //     if (!currentUser) return;

  //     const user = JSON.parse(currentUser);
  //     const cartKey = `cart_${user.email}`;

  //     setCart(updatedCart);
  //     await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCart));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const removeItem = async id => {
  //   Alert.alert(
  //     "Remove Item",
  //     "Are you sure you want to remove this item from cart?",
  //     [
  //       { text: "Cancel", style: "cancel" },
  //       {
  //         text: "Remove",
  //         style: "destructive",
  //         onPress: async () => {
  //           const updatedCart = cart.filter(item => item.id !== id);
  //           saveCart(updatedCart);
  //           await removeFromCart(id);

  //           const updatedSelected = selectedItems.filter(itemId => itemId !== id);
  //           setSelectedItems(updatedSelected);

  //           const currentUser = await AsyncStorage.getItem('currentUser');
  //           const user = JSON.parse(currentUser);
  //           const selectedKey = `selected_cart_${user.email}`;
  //           await AsyncStorage.setItem(selectedKey, JSON.stringify(updatedSelected));
  //         }
  //       }
  //     ]
  //   );
  // };

  const removeItem = (id) =>{
    dispatch(removeFromCart({id}));
  };

  
  const incQuantity = (id) => {
    dispatch(incrementQuantity({id}));
  };


 

  const decQuantity = (id) => {
    dispatch(decrementQuantity({id}));
  }

  const toggleSelect = (id) => {
    try {
      // const currentUser = await AsyncStorage.getItem('currentUser');
      if (!user) return;

      // const user = JSON.parse(currentUser);
      // const selectedKey = `selected_cart_${user.email}`;

      // let updatedSelection;
      // if (selectedItems.includes(id)) {
      //   updatedSelection = selectedItems.filter(item => item !== id);
      // } else {
      //   updatedSelection = [...selectedItems, id];
      // }
      dispatch(toggleSelectedItems(id));

      // setSelectedItems(updatedSelection);
      // await AsyncStorage.setItem(selectedKey, JSON.stringify(updatedSelection));
    } catch (error) {
      console.log(error);
    }
  };

  const selectAll =  () => {
    // const allIds = cart.map(item => item.id);
    // setSelectedItems(allIds);
    dispatch(selectAllItems());

    // const currentUser = await AsyncStorage.getItem('currentUser');
    // const user = JSON.parse(currentUser);
    // const selectedKey = `selected_cart_${user.email}`;
    // await AsyncStorage.setItem(selectedKey, JSON.stringify(allIds));
  };

  const deselectAll = () => {
    // setSelectedItems([]);
    dispatch(clearAllItems());

    // const currentUser = await AsyncStorage.getItem('currentUser');
    // const user = JSON.parse(currentUser);
    // const selectedKey = `selected_cart_${user.email}`;
    // await AsyncStorage.setItem(selectedKey, JSON.stringify([]));
  };

  // const getTotalPrice = () => {
  //   return cart.reduce((total, item) => {
  //     if (selectedItems.includes(item.id)) {
  //       const price = item.priceCents || 0;
  //       const qty = item.quantity || 1;
  //       return total +  (price * qty);
  //     }
  //     return total;
  //   }, 0);
  // };

  // const getTotalItems = () => {
  //   return cart.reduce((total, item) => {
  //     if (selectedItems.includes(item.id)) {
  //       return total + item.quantity;
  //     }
  //     return total;
  //   }, 0);
  // };

  const viewDetails = item => {
    navigation.navigate("ProductDetails", { product: item });
  };

  const EmptyCart = () => (
    <View style={CartStyle.emptyContainer}>
      <Icon name="bag-outline" size={80} color="#ccc" />
      <Text style={CartStyle.emptyTitle}>Your Cart is Empty</Text>
      <Text style={CartStyle.emptySubtitle}>
        Add some products to get started
      </Text>
      <TouchableOpacity
        style={CartStyle.shopNowBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={CartStyle.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={CartStyle.container}>
      {/* Header */}
      <View style={CartStyle.header}>
        <Text style={CartStyle.title}>My Cart</Text>
        {cart.length > 0 && (
          <Text style={CartStyle.itemCount}>
            {cart.length} item{cart.length > 1 ? 's' : ''}
          </Text>
        )}
      </View>

      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* Select All Section */}
          <View style={CartStyle.selectAllContainer}>
            <TouchableOpacity
              style={CartStyle.selectAllBtn}
              onPress={selectedItems.length === cart.length ? deselectAll : selectAll}
            >
              <Icon
                name={selectedItems.length === cart.length ? "checkbox" : "square-outline"}
                size={20}
                color="#4CAF50"
              />
              <Text style={CartStyle.selectAllText}>
                {selectedItems.length === cart.length ? "Deselect All" : "Select All"}
              </Text>
            </TouchableOpacity>
            
            {selectedItems.length > 0 && (
              <Text style={CartStyle.selectedCount}>
                {selectedItems.length} selected
              </Text>
            )}
          </View>

          <FlatList
            data={cart}
            keyExtractor={(item, index) => item.id + '_' + index}
            contentContainerStyle={{ paddingBottom: selectedItems.length > 0 ? 120 : 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = selectedItems.includes(item.id);
              const itemTotal = (item.priceCents * 92 * item.quantity / 100).toFixed(2);

              return (
                <View style={[CartStyle.card, isSelected && CartStyle.cardSelected]}>
                  {/* Checkbox */}
                  <TouchableOpacity
                    style={[CartStyle.checkbox, isSelected && CartStyle.checkboxSelected]}
                    onPress={() => toggleSelect(item.id)}
                  >
                    {isSelected && <Icon name="checkmark" size={16} color="#fff" />}
                  </TouchableOpacity>

                  {/* Product Image */}
                  <TouchableOpacity 
                  // activeOpacity={0.7}
                   onPress={() => viewDetails(item)}>
                    <Image source={{ uri: item.image }} style={CartStyle.image} />
                  </TouchableOpacity>

                  {/* Product Info */}
                  <View style={CartStyle.productInfo}>
                    <TouchableOpacity onPress={() => viewDetails(item)}>
                      <Text numberOfLines={2} style={CartStyle.productTitle}>
                        {item.name}
                      </Text>
                      <Text style={CartStyle.price}>
                        ₹{(item.priceCents * 92 / 100).toFixed(2)} each
                      </Text>
                      <Text style={CartStyle.itemTotal}>
                        Total: ₹{itemTotal}
                      </Text>
                    </TouchableOpacity>

                    {/* Quantity Controls */}
                    <View style={CartStyle.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => decQuantity(item.id)}
                        style={[CartStyle.qtyBtn, item.quantity === 1 && CartStyle.qtyBtnDisabled]}
                        disabled={item.quantity === 1}
                      >
                        <Icon name="remove" size={16} color={item.quantity === 1 ? "#ccc" : "#666"} />
                      </TouchableOpacity>

                      <Text style={CartStyle.qtyNumber}>{item.quantity}</Text>

                      <TouchableOpacity
                        onPress={() => incQuantity(item.id)}
                        style={CartStyle.qtyBtn}
                      >
                        <Icon name="add" size={16} color="#666" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Remove Button */}
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={CartStyle.removeBtn}
                  >
                    <Icon name="trash-outline" size={18} color="#ff4757" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </>
      )}

      {/* Checkout Bar */}
      {selectedItems.length > 0 && (
        <View style={CartStyle.checkoutBar}>
          <View style={CartStyle.totalSection}>
            <Text style={CartStyle.itemsSelected}>
              {totalItems} item{totalItems > 1 ? 's' : ''} selected
            </Text>
            <Text style={CartStyle.totalPrice}>
              ₹{(totalPrice *92 / 100).toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={CartStyle.checkoutBtn}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Icon name="bag-check-outline" size={18} color="#fff" style={{ marginRight: 5 }} />
            <Text style={CartStyle.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
