import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Get the current logged-in user from AsyncStorage
 */
export const getCurrentUser = async () => {
  try {
    const data = await AsyncStorage.getItem("currentUser");
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.log("Error fetching current user:", error);
    return null;
  }
};

/**
 * Get the default address of the current user
 */
export const getDefaultAddress = async () => {
  const user = await getCurrentUser();
  if (user && user.addresses && user.addresses.length > 0) {
    const defaultAddr = user.addresses.find(a => a.isDefault);
    return defaultAddr || user.addresses[0]; // fallback to first address
  }
  return null;
};