import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  // ActionSheetIOS,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout, updateProfile } from "../../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileStyle from "./style";

const ProfileScreen = ({ navigation }) => {
  // const [user, setUser] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const isFocused = useIsFocused();

  const user = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.addresses?.length > 0) {
        const defaultAddr = user.addresses.find(a => a.isDefault);
        setDefaultAddress(defaultAddr);
      }
      setProfileImage(user?.profileImage || null)
  }, [user]);

  // const loadUser = async () => {
  //   // const data = await AsyncStorage.getItem("currentUser");
    
  //   if (data) {
  //     const parsedUser = JSON.parse(data);
  //     // setUser(parsedUser);
  //     setProfileImage(parsedUser.profileImage || null);

  //     if (user?.addresses?.length > 0) {
  //       const defaultAddr = user.addresses.find(a => a.isDefault);
  //       setDefaultAddress(defaultAddr);
  //     }
  //   }
  // };

  const handleLogout = async () => {
    // await AsyncStorage.removeItem("currentUser");
    dispatch(logout())
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const showImagePicker = () =>{
    
      Alert.alert(
        'Select Profile Picture',
        'Choose an option',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Camera', onPress: ()=> handleImageSelection(0) },
          { text:'Gallery', onPress: ()=> handleImageSelection(1) },
          // { text: 'Files' , onPress: ()=> handleImageSelection(2) },
        ],
        {cancelable:true}
      );
    
  };

  const handleImageSelection = (index) => {
    const imagePickerOptions = {
      mediaType: 'photo',
      quality:0.7,
      maxWidth: 300,
      maxHeight: 300,
    };

    switch(index) {
      case 0: 
        launchCamera(imagePickerOptions,(response)=>{
          console.log("Camera response:", response);
          handleImageResponse(response);
        });
        break;
      case 1:
        launchImageLibrary({
          ...imagePickerOptions,
          selectionLimit:1,
        }, handleImageResponse);
        break;
      case 2:
        launchImageLibrary({
          ...imagePickerOptions,
          selectionLimit:1,
          includeBase64: false,
        }, handleImageResponse);
        break;
      default:
        break;
    }
  };

  const handleImageResponse = async (response) => {
    if(response.didCancel || response.errorMessage){
      return;
    }

    if(response.errorMessage){
      Toast.show({
        type:"error",
        text1: "Error",
        text2: response.errorMessage,
      });
      return;
    }

    if(response.assets && response.assets[0]){
      const imageUri = response.assets[0].uri;
      setProfileImage(imageUri);

      if(user){
        const updatedUser = {
          ...user,
          profileImage: imageUri
        };

        // setUser(updatedUser);
        dispatch(updateProfile({profileImage: imageUri}));
        // await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));

        Toast.show({
          type:'success',
          text1:"Profile Picture Updated"
        });
      }
    }
  };

  const removeProfilePicture = async () => {
    Alert.alert(
      "Remove Profile Picture",
      "Are you Sure you want to remove you profile picture?",
        [
        {text: "Cancel", style:"cancel"},
        {
          text:"Remove",
          style:"destructive",
          onPress: async () => {
            setProfileImage(null);

            if(user){
              const updatedUser = {
                ...user,
                profileImage: null
              };

              setUser(updatedUser);
              await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));

              Toast.show({
                type:"success",
                text1:"Profile Picture removed",
              });
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={ProfileStyle.container}>
      <ScrollView
        contentContainerStyle={ProfileStyle.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={ProfileStyle.header}>
          <Text style={ProfileStyle.headerTitle}>Profile</Text>
        </View>

        {/* Avatar Section */}
        <View style={ProfileStyle.avatarSection}>
          <View style={ProfileStyle.avatarWrapper}>
            <Image
              source={{ uri: profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
              style={ProfileStyle.avatar}
            />
            <TouchableOpacity style={ProfileStyle.editAvatarBtn} onPress={showImagePicker}>
              <Icon name="camera" size={18} color="#fff" />
            </TouchableOpacity>

            {profileImage && (
              <TouchableOpacity
                style={ProfileStyle.removeAvatarBtn}
                onPress={removeProfilePicture}
              >
                <Icon name="close" size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={ProfileStyle.userName}>{user?.name || "Guest User"}</Text>
          <Text style={ProfileStyle.userEmail}>{user?.email || "No Email"}</Text>
        </View>

        {/* Info Cards */}
        <View style={ProfileStyle.section}>
          <Text style={ProfileStyle.sectionTitle}>Personal Information</Text>
          
          <View style={ProfileStyle.card}>
            <View style={ProfileStyle.infoItem}>
              <View style={ProfileStyle.iconContainer}>
                <Icon name="person-outline" size={22} color="#4CAF50" />
              </View>
              <View style={ProfileStyle.infoContent}>
                <Text style={ProfileStyle.infoLabel}>Full Name</Text>
                <Text style={ProfileStyle.infoValue}>{user?.name || "Not Added"}</Text>
              </View>
            </View>

            <View style={ProfileStyle.divider} />

            <View style={ProfileStyle.infoItem}>
              <View style={ProfileStyle.iconContainer}>
                <Icon name="mail-outline" size={22} color="#4CAF50" />
              </View>
              <View style={ProfileStyle.infoContent}>
                <Text style={ProfileStyle.infoLabel}>Email</Text>
                <Text style={ProfileStyle.infoValue}>{user?.email || "Not Added"}</Text>
              </View>
            </View>

            <View style={ProfileStyle.divider} />

            <View style={ProfileStyle.infoItem}>
              <View style={ProfileStyle.iconContainer}>
                <Icon name="call-outline" size={22} color="#4CAF50" />
              </View>
              <View style={ProfileStyle.infoContent}>
                <Text style={ProfileStyle.infoLabel}>Phone</Text>
                <Text style={ProfileStyle.infoValue}>{user?.phone || "Not Added"}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Address Section */}
        <View style={ProfileStyle.section}>
          <Text style={ProfileStyle.sectionTitle}>Default Address</Text>
          
          <View style={ProfileStyle.card}>
            <View style={ProfileStyle.infoItem}>
              <View style={ProfileStyle.iconContainer}>
                <Icon name="location-outline" size={22} color="#4CAF50" />
              </View>
              <View style={ProfileStyle.infoContent}>
                <Text style={ProfileStyle.infoLabel}>Delivery Address</Text>
                <Text style={ProfileStyle.infoValue}>
                  {defaultAddress
                    ? `${defaultAddress.street}, ${defaultAddress.city} - ${defaultAddress.pincode}`
                    : "No Address Added"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={ProfileStyle.actionSection}>
          <TouchableOpacity
            style={ProfileStyle.actionButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Icon name="create-outline" size={22} color="#4CAF50" />
            <Text style={ProfileStyle.actionButtonText}>Edit Profile</Text>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={ProfileStyle.actionButton}
            onPress={() => navigation.navigate('Forgot Password')}
          >
            <Icon name="lock-closed-outline" size={22} color="#FF9800" />
            <Text style={ProfileStyle.actionButtonText}>Change Password</Text>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[ProfileStyle.actionButton, ProfileStyle.logoutButton]}
            onPress={handleLogout}
          >
            <Icon name="log-out-outline" size={22} color="#e53935" />
            <Text style={[ProfileStyle.actionButtonText, ProfileStyle.logoutText]}>
              Logout
            </Text>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
