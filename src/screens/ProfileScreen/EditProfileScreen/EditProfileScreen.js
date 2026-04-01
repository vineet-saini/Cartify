import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView, KeyboardAvoidingView, Platform,} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfile } from "../../../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import EditProfileStyle from './style';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addresses, setAddresses] = useState([]);

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddresses(user.addresses || []);
    }
  }, [user]);

  const loadUser = async () => {
    try {
      // const data = await AsyncStorage.getItem("currentUser");
      // if (data) {
      //   const user = JSON.parse(data);
        
      // }
    } catch (error) {
      console.log("Error loading user", error);
    }
  };

  const updateProfileHandler =  () => {
    // try {
      const updatedUser = { name, email, phone, addresses };

      // await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));
      dispatch(updateProfile(updatedUser));

      // const existingUsers = await AsyncStorage.getItem("users");
      // const users = existingUsers ? JSON.parse(existingUsers) : [];

      // const updatedUsers = users.map(u => u.email === email ? { ...u, ...updatedUser, password: u.password || "" } : u);

      // await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

      // Alert.alert("Success", "Profile Updated Successfully");
      Toast.show({
        type:'success',
        text1:"Profile Updated Succesfully",
        // position:"bottom"
      })
      navigation.goBack();
    // } 
    // catch (error) {
    //   console.log("Error saving user", error);
    // }
    const hasEmptyAddress = addresses.some(
      a => !a.street || !a.city || !a.pincode,
    );

    if (hasEmptyAddress) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all address fields',
      });
      return;
    }
  };

  const addNewAddress = () => {
    const newAddress = {
      id: Date.now().toString(),
      label: "Home",
      street: "",
      city: "",
      pincode: "",
      isDefault: addresses.length === 0
    };
    setAddresses(prev => [...prev, newAddress]);
  };

  const updateAddressField = (id, field, value) => {
    setAddresses(prev => prev.map(a => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const removeAddress = (id) => setAddresses(prev => prev.filter(a => a.id !== id));

  const setDefaultAddress = (id) => setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      
      <View style={EditProfileStyle.editHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          
        >
          <MaterialIcons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={[EditProfileStyle.title, { marginLeft: 10 }]}>Edit Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={EditProfileStyle.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Name */}
        <Text style={EditProfileStyle.inputLabel}>Full Name</Text>
        <TextInput
          style={EditProfileStyle.input}
          value={name}
          onChangeText={setName}
        />

        {/* Email */}
        <Text style={EditProfileStyle.inputLabel}>Email</Text>
        <TextInput
          style={EditProfileStyle.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Phone */}
        <Text style={EditProfileStyle.inputLabel}>Phone</Text>
        <TextInput
          style={EditProfileStyle.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={EditProfileStyle.subTitle}>Addresses</Text>

        {addresses.map(addr => (
          <View key={addr.id} style={EditProfileStyle.addressCard}>

            <Text style={EditProfileStyle.inputLabel}>Label</Text>
            <TextInput
              style={EditProfileStyle.input}
              value={addr.label}
              onChangeText={text => updateAddressField(addr.id, "label", text)}
            />

            <Text style={EditProfileStyle.inputLabel}>Street</Text>
            <TextInput
              style={EditProfileStyle.input}
              value={addr.street}
              onChangeText={text => updateAddressField(addr.id, "street", text)}
            />

            <Text style={EditProfileStyle.inputLabel}>City</Text>
            <TextInput
              style={EditProfileStyle.input}
              value={addr.city}
              onChangeText={text => updateAddressField(addr.id, "city", text)}
            />

            <Text style={EditProfileStyle.inputLabel}>Pincode</Text>
            <TextInput
              style={EditProfileStyle.input}
              value={addr.pincode}
              onChangeText={text => updateAddressField(addr.id, "pincode", text)}
            />

            <View style={EditProfileStyle.addressButtons}>
              <TouchableOpacity
                style={[EditProfileStyle.smallButton, addr.isDefault && { backgroundColor: "green" }]}
                onPress={() => setDefaultAddress(addr.id)}
              >
                <Text style={EditProfileStyle.smallButtonText}>
                  {addr.isDefault ? "Default" : "Set Default"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[EditProfileStyle.smallButton, { backgroundColor: "red" }]}
                onPress={() => removeAddress(addr.id)}
              >
                <Text style={EditProfileStyle.smallButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={EditProfileStyle.button} onPress={addNewAddress}>
          <Text style={EditProfileStyle.buttonText}>+ Add Address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={EditProfileStyle.button} onPress={updateProfileHandler}>
          <Text style={EditProfileStyle.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;