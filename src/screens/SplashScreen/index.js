import React,{useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated, Image} from 'react-native';
import SplashStyles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingStyles from '../OnboardingScreen/style';

const SplashScreen = ({navigation}) => {
    const fadeAnim = new Animated.Value(0);

    useEffect(()=>{
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        setTimeout(checkUserStatus, 2500);
    })

    const checkUserStatus = async () =>{
        try{
            // const isFirstTime = await AsyncStorage.getItem('isFirstTime');
            const userEmail = await AsyncStorage.getItem('userEmail');
            navigation.replace('Onboard');

            // if(isFirstTime === null){
            //     navigation.replace('Onboard');
            // } 
             if(userEmail){
                navigation.replace('Main');
            } 
            // else{
            //     navigation.replace('Login');
            // }
        }
        catch(error) {
            navigation.replace('Login');
        }
    }
    return (
        <View style={SplashStyles.container}>
            <Animated.View style={[SplashStyles.logoContainer , {opacity: fadeAnim}]}>
                {/* <Text style={SplashStyles.logo}></Text> */}
                <Image 
                    source={require('../../assets/Images/logo.png')}
                    style={OnboardingStyles.logoImage}
                    resizeMode= 'contain'
                />
                <Text style={SplashStyles.title}>Cartify</Text>
                <Text stylr={SplashStyles.subtitle}>Your Shopping Companion</Text>
            </Animated.View>
            {/* <Text>Splash</Text> */}
            {/* <TouchableOpacity
                onPress={()=> navigation.navigate('Onboard')}
            >
                <Text>To Onboard</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default SplashScreen;