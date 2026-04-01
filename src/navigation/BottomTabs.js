// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
// import CartScreen from '../screens/CartScreen/index';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Tab = createBottomTabNavigator();

// const BottomTabs = () =>{
//     return (
//         <Tab.Navigator 
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >

//         {/* <Tab.Screen 
//                 name='Home'
//                 component={HomeScreen}
//                 options={{
//                     tabBarIcon: ({ color, size }) => (
//                         <Icon name="home-outline" size={size} color={color} />
//                     ),
//                 }}
//                 listeners={{
//                     tabPress: getCartCount,
//                 }}
//             /> */}

//         <Tab.Screen 
//             name='Home'
//             component={HomeScreen}
//         />

//         <Tab.Screen 
//             name='Profile'
//             component={ProfileScreen}
//         />

//         <Tab.Screen 
//             name='Cart'
//             component={CartScreen}
//         />

        
//         </Tab.Navigator>
//     );
// };

// export default BottomTabs;

import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useCart } from '../context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen/index';
import CartScreen from '../screens/CartScreen/index';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    // const [cartCount, setCartCount] = useState(0);
    // const {cartCount, updateCartCount} = useCart();

    const cartCount = useSelector(state => state.cart?.items?.length || 0);
    // const cartCount = useSelector(state => state.cart.length);

    // const getCartCount = async () => {
    //     const currentUser = await AsyncStorage.getItem('currentUser');
    //     if (!currentUser) return;

    //     const user = JSON.parse(currentUser);
    //     const cartKey = `cart_${user.email}`;
    //     const cart = await AsyncStorage.getItem(cartKey);
    //     const items = cart ? JSON.parse(cart) : [];
    //     setCartCount(items.length);
    // };

    // useFocusEffect(
    //     React.useCallback(() => {
    //         updateCartCount();   
    //     }, [])
    // );

    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#888',
                tabBarStyle:{
                    // marginBottom:10,
                    height:55,
                }
            }}
        >
            <Tab.Screen 
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
                // listeners={{
                //     tabPress: getCartCount,
                // }}
            />


            <Tab.Screen 
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen 
                name="Orders"
                component={OrdersScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="receipt" size={size} color={color}/>
                    )
                }}
            />

            <Tab.Screen 
                name='Cart'
                component={CartScreen}
                options={{
                    tabBarBadge: cartCount > 0 ? cartCount : null,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cart" size={size} color={color} />
                    ),
                }}
                // listeners={{
                //     tabPress: getCartCount,
                // }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;


// import React, { useState, useEffect } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useFocusEffect } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/Ionicons';

// import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
// import OrdersScreen from '../screens/OrdersScreen/index';
// import CartScreen from '../screens/CartScreen/index';

// const Tab = createBottomTabNavigator();

// const BottomTabs = () => {
//     const [cartCount, setCartCount] = useState(0);

//     const getCartCount = async () => {
//         const currentUser = await AsyncStorage.getItem('currentUser');
//         if (!currentUser) return;

//         const user = JSON.parse(currentUser);
//         const cartKey = `cart_${user.email}`;
//         const cart = await AsyncStorage.getItem(cartKey);
//         const items = cart ? JSON.parse(cart) : [];
//         setCartCount(items.length);
//     };

//     useFocusEffect(
//         React.useCallback(() => {
//             getCartCount();
//         }, [])
//     );

//     return (
//         <Tab.Navigator 
//             screenOptions={{
//                 headerShown: false,
//                 tabBarActiveTintColor: '#4CAF50',
//                 tabBarInactiveTintColor: '#999',
//                 tabBarStyle: {
//                     height: 60,
//                     paddingBottom: 8,
//                     paddingTop: 8,
//                     backgroundColor: '#fff',
//                     borderTopWidth: 1,
//                     borderTopColor: '#f0f0f0',
//                     elevation: 8,
//                     shadowColor: '#000',
//                     shadowOffset: { width: 0, height: -2 },
//                     shadowOpacity: 0.1,
//                     shadowRadius: 4,
//                 },
//                 tabBarLabelStyle: {
//                     fontSize: 12,
//                     fontWeight: '600',
//                 },
//                 tabBarIconStyle: {
//                     marginTop: 4,
//                 },
//             }}
//         >
//             <Tab.Screen 
//                 name='Home'
//                 component={HomeScreen}
//                 options={{
//                     tabBarIcon: ({ color, size, focused }) => (
//                         <Icon 
//                             name={focused ? "home" : "home-outline"} 
//                             size={size} 
//                             color={color} 
//                         />
//                     ),
//                 }}
//                 listeners={{
//                     tabPress: getCartCount,
//                 }}
//             />

//             <Tab.Screen 
//                 name='Orders'
//                 component={OrdersScreen}
//                 options={{
//                     tabBarIcon: ({ color, size, focused }) => (
//                         <Icon 
//                             name={focused ? "receipt" : "receipt-outline"} 
//                             size={size} 
//                             color={color}
//                         />
//                     ),
//                 }}
//             />

//             <Tab.Screen 
//                 name='Cart'
//                 component={CartScreen}
//                 options={{
//                     tabBarBadge: cartCount > 0 ? cartCount : null,
//                     tabBarBadgeStyle: {
//                         backgroundColor: '#e53935',
//                         color: '#fff',
//                         fontSize: 10,
//                         fontWeight: 'bold',
//                         minWidth: 18,
//                         height: 18,
//                         borderRadius: 9,
//                         top: 2,
//                     },
//                     tabBarIcon: ({ color, size, focused }) => (
//                         <Icon 
//                             name={focused ? "cart" : "cart-outline"} 
//                             size={size} 
//                             color={color} 
//                         />
//                     ),
//                 }}
//                 listeners={{
//                     tabPress: getCartCount,
//                 }}
//             />

//             <Tab.Screen 
//                 name='Profile'
//                 component={ProfileScreen}
//                 options={{
//                     tabBarIcon: ({ color, size, focused }) => (
//                         <Icon 
//                             name={focused ? "person" : "person-outline"} 
//                             size={size} 
//                             color={color} 
//                         />
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     );
// };

// export default BottomTabs;

