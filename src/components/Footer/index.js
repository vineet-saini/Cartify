// import React from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import FooterStyle from './style';

// const Footer = () =>{
//     const navigation = useNavigation();
//     return (
//         <View style={FooterStyle.container}>
//             <TouchableOpacity
//                 onPress={()=> navigation.navigate('Home')}
//             >
//                 <Text style={FooterStyle.navBtnText}>Home</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 onPress={()=>navigation.navigate('Profile')}
//             >
//                 <Text style={FooterStyle.navBtnText}>Profile</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 onPress={()=>navigation.navigate('Cart')}
//             >
//                 <Text style={FooterStyle.navBtnText}>Cart</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default Footer;

// import React from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import FooterStyle from './style';

// const Footer = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={FooterStyle.container}>

//       <TouchableOpacity
//         style={FooterStyle.navItem}
//         onPress={() => navigation.navigate('Home')}
//       >
//         <Icon name="home-outline" size={22} color="#333" />
//         <Text style={FooterStyle.navText}>Home</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={FooterStyle.navItem}
//         onPress={() => navigation.navigate('Profile')}
//       >
//         <Icon name="person-outline" size={22} color="#333" />
//         <Text style={FooterStyle.navText}>Profile</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={FooterStyle.navItem}
//         onPress={() => navigation.navigate('Cart')}
//       >
//         <Icon name="cart-outline" size={22} color="#333" />
//         <Text style={FooterStyle.navText}>Cart</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// export default Footer;

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FooterStyle from './style';
const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = screenName => route.name === screenName;
  return (
    <View style={FooterStyle.container}>
       
      <TouchableOpacity
        style={
          isActive('Home') ? FooterStyle.navItemActive : FooterStyle.navItem
        }
        onPress={() => navigation.navigate('Home')}
      >
         
        <Icon
          name={isActive('Home') ? "home" : "home-outline"}
          size={isActive('Home') ? 26 : 22}
          color={isActive('Home') ? '#000' : '#333'}
        /> 
        <Text
          style={
            isActive('Home') ? FooterStyle.navTextActive : FooterStyle.navText
          }
        >
          Home
        </Text> 
      </TouchableOpacity> 
      <TouchableOpacity
        style={
          isActive('Profile') ? FooterStyle.navItemActive : FooterStyle.navItem
        }
        onPress={() => navigation.navigate('Profile')}
      >
         
        <Icon
          name={isActive('Profile') ? "person" : "person-outline"}
          size={isActive('Profile') ? 26 : 22}
          color={isActive('Profile') ? '#000' : '#333'}
        /> 
        <Text
          style={
            isActive('Profile')
              ? FooterStyle.navTextActive
              : FooterStyle.navText
          }
        >
          Profile
        </Text> 
      </TouchableOpacity> 
      <TouchableOpacity
        style={
          isActive('Cart') ? FooterStyle.navItemActive : FooterStyle.navItem
        }
        onPress={() => navigation.navigate('Cart')}
      >
         
        <Icon
          name={isActive('Cart') ? "cart":"cart-outline"}
          size={isActive('Cart') ? 26 : 22}
          color={isActive('Cart') ? '#000' : '#333'}
        /> 
        <Text
          style={
            isActive('Cart') ? FooterStyle.navTextActive : FooterStyle.navText
          }
        >
          Cart
        </Text> 
      </TouchableOpacity>
    </View>
  );
};
export default Footer;