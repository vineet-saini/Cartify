// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import BottomTabs from './BottomTabs';

// import SignUpScreen from '../screens/SignUpScreen/index';
// import LoginScreen from '../screens/LoginScreen/index';
// import ForgotPasswordScreen from '../screens/ForgotPassword/index';
// import ProductDetailsScreen from '../screens/ProductDetailsScreen/index';
// // import AddTaskScreen from '../screens/AddTaskScreen/AddTaskScreen';

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>

//         <Stack.Screen
//           name="Sign Up"
//           component={SignUpScreen}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="Forgot Password"
//           component={ForgotPasswordScreen}
//         />

//         <Stack.Screen
//           name="Main"
//           component={BottomTabs}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="ProductDetails"
//           component={ProductDetailsScreen}
//           options={{ title: "Product Details" }}
//         />

//         {/* <Stack.Screen
//           name="Add Task"
//           component={AddTaskScreen}
//         /> */}

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import AddTaskScreen from '../screens/AddTaskScreen/AddTaskScreen';
import SignUpScreen from '../screens/SignUpScreen/index';
import LoginScreen from '../screens/LoginScreen/index';
import ForgotPasswordScreen from '../screens/ForgotPassword/index';
import CartScreen from '../screens/CartScreen/index';
import ProductDetailsScreen from '../screens/ProductDetailsScreen/index';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen/EditProfileScreen';
import CheckoutScreen from '../screens/CheckoutScreen/index';
import OrdersScreen from '../screens/OrdersScreen/index';
import BottomTabs from '../navigation/BottomTabs';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen/index';
import OrderDetailsScreen from '../screens/OrdersScreen/OrderDetailsScreen/index';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown:false}}>
        <Stack.Screen 
          name= "Sign Up"
          component={SignUpScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name='Forgot Password'
          component={ForgotPasswordScreen}
        />
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{title : "Cartify", headerBackVisible:false, headerTitleAlign:'center'}}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
        />
        <Stack.Screen name='Main'component={BottomTabs} />
        <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        />
        <Stack.Screen 
          name = "Cart"
          component={CartScreen}
        />
        <Stack.Screen 
          name = "ProductDetails"
          component={ProductDetailsScreen}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
        <Stack.Screen name='OrderDetails' component={OrderDetailsScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import BottomTabs from './BottomTabs';

// import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
// import AddTaskScreen from '../screens/AddTaskScreen/AddTaskScreen';
// import SignUpScreen from '../screens/SignUpScreen/index';
// import LoginScreen from '../screens/LoginScreen/index';
// import ForgotPasswordScreen from '../screens/ForgotPassword/index';
// import CartScreen from '../screens/CartScreen/index';
// import ProductDetailsScreen from '../screens/ProductDetailsScreen/index';

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator  screenOptions={{headerShown:true}}>
//         <Stack.Screen 
//           name= "Sign Up"
//           component={SignUpScreen}
//           options={{headerShown:false}}
//         />
//         <Stack.Screen 
//           name="Login"
//           component={LoginScreen}
//           options={{headerShown:false}}
//         />
//         <Stack.Screen 
//           name='Forgot Password'
//           component={ForgotPasswordScreen}
//         />
//         {/* <Stack.Screen 
//           name="Home"
//           component={HomeScreen}
//           options={{title : "Cartify", headerBackVisible:false}}
//         />
//         <Stack.Screen 
//           name="Profile" 
//           component={ProfileScreen} 
//         /> */}
//         {/* <Stack.Screen
//         name="Add Task"
//         component={AddTaskScreen}
//         />
//         <Stack.Screen 
//           name = "Cart"
//           component={CartScreen}
//         /> */}
//         <Stack.Screen 
//           name='Main'
//           component={BottomTabs}
//           screenOptions={{headerShown:false}}
//         />
//         <Stack.Screen 
//           name = "ProductDetails"
//           component={ProductDetailsScreen}
//         />
        
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;