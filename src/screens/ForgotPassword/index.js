// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import ForgotPasswordStyles from "./style";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Toast from "react-native-toast-message";

// const ForgotPasswordScreen = ({ navigation }) => {

//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [showNewPass, setShowNewPass] = useState(false);
//   const [showConfirmPass, setShowConfirmPass] = useState(false);

//   const handleReset = () => {

//     if (!email || !newPassword || !confirmPassword) {
//       Toast.show({
//         type: "error",
//         text1: "All fields are required"
//       });
//       return;
//     }

//     if (newPassword.length < 6) {
//       Toast.show({
//         type: "error",
//         text1: "Password must be at least 6 characters"
//       });
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Toast.show({
//         type: "error",
//         text1: "Passwords do not match"
//       });
//       return;
//     }

//     Toast.show({
//       type: "success",
//       text1: "Password changed successfully 🎉"
//     });

//     setTimeout(() => {
//       navigation.goBack();
//     }, 1500);
//   };

//   return (
//     <View style={ForgotPasswordStyles.container}>

//       {/* HEADER */}
//       <View style={ForgotPasswordStyles.passHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <MaterialIcons name="arrow-back" size={28} color="#000" />
//         </TouchableOpacity>

//         <Text style={ForgotPasswordStyles.title}>
//           Change Password
//         </Text>
//       </View>

//       <Text style={ForgotPasswordStyles.subtitle}>
//         Enter your email and set a new password
//       </Text>

//       {/* EMAIL */}
//       <TextInput
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         style={ForgotPasswordStyles.input}
//       />

//       {/* NEW PASSWORD */}
//       <View style={ForgotPasswordStyles.passwordContainer}>
//         <TextInput
//           placeholder="New Password"
//           value={newPassword}
//           onChangeText={setNewPassword}
//           secureTextEntry={!showNewPass}
//           style={ForgotPasswordStyles.passwordInput}
//         />

//         <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
//           <MaterialIcons
//             name={showNewPass ? "visibility-off" : "visibility"}
//             size={22}
//             color="#777"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* CONFIRM PASSWORD */}
//       <View style={ForgotPasswordStyles.passwordContainer}>
//         <TextInput
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry={!showConfirmPass}
//           style={ForgotPasswordStyles.passwordInput}
//         />

//         <TouchableOpacity
//           onPress={() => setShowConfirmPass(!showConfirmPass)}
//         >
//           <MaterialIcons
//             name={showConfirmPass ? "visibility-off" : "visibility"}
//             size={22}
//             color="#777"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* BUTTON */}
//       <TouchableOpacity
//         style={ForgotPasswordStyles.button}
//         onPress={handleReset}
//       >
//         <Text style={ForgotPasswordStyles.buttonText}>
//           Change Password
//         </Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// export default ForgotPasswordScreen;
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ForgotPasswordStyles from "./style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPasswordScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleReset = async () => {

    if (!email || !newPassword || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "All fields are required"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match"
      });
      return;
    }

    try {

      const storedUsers = await AsyncStorage.getItem("users");
      let users = storedUsers ? JSON.parse(storedUsers) : [];

      const userIndex = users.findIndex(
        user => user.email.toLowerCase() === email.toLowerCase()
      );

      if (userIndex === -1) {
        Toast.show({
          type: "error",
          text1: "User not found"
        });
        return;
      }

      // update password
      users[userIndex].password = newPassword;

      await AsyncStorage.setItem("users", JSON.stringify(users));

      Toast.show({
        type: "success",
        text1: "Password changed successfully 🎉"
      });

      setTimeout(() => {
        navigation.goBack();
      }, 1500);

    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Something went wrong"
      });
    }
  };

  return (
    <View style={ForgotPasswordStyles.container}>

      {/* HEADER */}
      <View style={ForgotPasswordStyles.passHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={ForgotPasswordStyles.title}>
          Change Password
        </Text>
      </View>

      <Text style={ForgotPasswordStyles.subtitle}>
        Enter your email and set a new password
      </Text>

      {/* EMAIL */}
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={ForgotPasswordStyles.input}
      />

      {/* NEW PASSWORD */}
      <View style={ForgotPasswordStyles.passwordContainer}>
        <TextInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPass}
          style={ForgotPasswordStyles.passwordInput}
        />

        <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
          <MaterialIcons
            name={showNewPass ? "visibility-off" : "visibility"}
            size={22}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      {/* CONFIRM PASSWORD */}
      <View style={ForgotPasswordStyles.passwordContainer}>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPass}
          style={ForgotPasswordStyles.passwordInput}
        />

        <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
          <MaterialIcons
            name={showConfirmPass ? "visibility-off" : "visibility"}
            size={22}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={ForgotPasswordStyles.button}
        onPress={handleReset}
      >
        <Text style={ForgotPasswordStyles.buttonText}>
          Change Password
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default ForgotPasswordScreen;