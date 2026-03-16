import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderStyles from './style';

const Header = () => {

    const navigation = useNavigation();

    return(
        <View style={HeaderStyles.container}>

            <Text style={HeaderStyles.logo}>Cartify</Text>

            {/* <View style={HeaderStyles.buttons}>

                <TouchableOpacity
                    style={HeaderStyles.button}
                    onPress={()=> navigation.navigate("Home")}
                >
                    <Text style={HeaderStyles.buttonText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={HeaderStyles.button}
                    onPress={()=> navigation.navigate("Profile")}
                >
                    <Text style={HeaderStyles.buttonText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={HeaderStyles.button}
                    onPress={()=> navigation.navigate("Cart")}
                >
                    <Text style={HeaderStyles.buttonText}>Cart</Text>
                </TouchableOpacity>

            </View> */}

        </View>
    )
}

export default Header;