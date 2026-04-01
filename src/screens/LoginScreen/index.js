import React,{useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Keyboard, Pressable} from 'react-native';
import {login, clearError} from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginStyles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
// import Footer from '../../components/Footer';
import ForgotPasswordScreen from '../ForgotPassword';

const LoginScreen = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const {error, isAuthenticated} = useSelector(state => state.auth);

    // const givenEmail = "admin@gmail.com";
    // const givenPassword = "123456";

    useEffect(() => {
      if(error){
        Toast.show({
          type:'error',
          text1: error, 
        });
      }
    },[error]);

    useEffect(() => {
      if(isAuthenticated){
        navigation.navigate('Main');
      }
    }, [isAuthenticated]);

    const handleLogin =  () =>{
      if(!email || !password){
        // Alert.alert("Enter Email and Password");
        Toast.show({
          type:'info',
          text1:'Enter Email and Password',
        })
        return;
      }
      dispatch(clearError());
      dispatch(login({email, password}));
      // navigation.navigate('Main');
      // try{
      //   dispatch(login({email, password}));
      //   if(error){
      //     Toast.show({
      //       type:'error',
      //       text1:error,
      //     })
      //   }
      //   else if(isAuthenticated){
      //     navigation.navigate('Main');
      //   }
        // const storedUsers = await AsyncStorage.getItem('users');
        // if(!storedUsers){
        //   Alert.alert("No user exists!, Please Sign up");
        //   Toast.show({
        //     type:'info',
        //     text1:'No user Exists! Please Sign up',
        //   })
        //   return;
        // }

        // const users = JSON.parse(storedUsers);

        // const user =  users.find(
        //   u=>u.email === email && u.password === password
        // );

        // if(user){
        //   await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        //   // navigation.navigate('Home');
          // navigation.navigate('Main');
        // }
        // else{
        //   Toast.show({
        //     type:'info',
        //     text1:'Invalid Credentials',
        //   })
        // }
        
      // } 
      // catch(error){
      //     Toast.show({
      //       type:'error',
      //       text1: error.message,
      //     });
      // };
    };
    

    return (
      <Pressable style={LoginStyles.press} onPress={Keyboard.dismiss}>
      <View style={LoginStyles.container}>
        <Text style={LoginStyles.title}>Welcome Back</Text>

        <View style={LoginStyles.card}>
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={LoginStyles.input}
          />
          <View style={LoginStyles.passwordContainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={LoginStyles.passwordInput}
            />
            <TouchableOpacity
              onPress={()=>setShowPassword(!showPassword)}
            >
              <Icon 
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={LoginStyles.loginBtn} onPress={handleLogin}>
            <Text style={LoginStyles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Forgot Password')}
          >
            <Text style={LoginStyles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Text style={LoginStyles.signupText}>
            Don't have an account?
            <Text
              style={LoginStyles.signupLink}
              onPress={() => navigation.navigate('Sign Up')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
        {/* <Footer /> */}
      </View>
      </Pressable>
    );

}
export default LoginScreen;