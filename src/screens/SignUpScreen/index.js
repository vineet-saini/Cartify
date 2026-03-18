import React,{useState} from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import SignUpStyle from './style';

const SignUpScreen = ({navigation}) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignup = async () =>{
        // Alert.alert("Account Created (Demo)");
        // console.log("signup method called======>");
        
        if(!name || !email || !password){
            // Alert.alert("Please provide all details");
            Toast.show({
                type:'info',
                text1:'Please Provide all the details'
            })
            return;
        }
        // navigation.navigate('Login');
        // const user = {name, email, password};
        try{
            const newUser = { name, email, password };

            const existingUsers = await AsyncStorage.getItem('users');
            const users = existingUsers ? JSON.parse(existingUsers) : [];

            const emailExists = users.find(u => u.email === email);

            if(emailExists){
                // Alert.alert("User Already Exists");
                Toast.show({
                    type:'info',
                    text1:'User Already Exists',
                })
                return;
            }
            users.push(newUser);

            await AsyncStorage.setItem('users', JSON.stringify(users));

            // Alert.alert("Account created Successfully");
            Toast.show({
                type:'success',
                text1:'Account Created Successfully',
            })
            navigation.navigate('Login');
        }
        catch(error){
            console.log(error);
        }
    };

    return (
        <Pressable style={SignUpStyle.press} onPress={Keyboard.dismiss}>
        <View style={SignUpStyle.container}>
            <Text style={SignUpStyle.title}>Create Account</Text>

                <View style={SignUpStyle.card}>
                <TextInput

                    placeholder='Enter name'
                    value={name}
                    onChangeText={setName}
                    style={SignUpStyle.input}
                />

                <TextInput
                    placeholder='Enter Email'
                    value={email}
                    onChangeText = {setEmail}
                    keyboardType='email-address'
                    style={SignUpStyle.input}
                />
                <TextInput 
                    placeholder='Enter Password'
                    value = {password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={SignUpStyle.input}

                />

                <TouchableOpacity
                    style={SignUpStyle.signupBtn}
                    onPress={handleSignup}
                >
                    <Text style={SignUpStyle.signupText}>Sign Up</Text>
                </TouchableOpacity>

                <Text style={SignUpStyle.loginText}>
                    Already have an account?
                    <Text
                        style={SignUpStyle.loginLink}
                        onPress={()=>navigation.navigate("Login")}
                    >
                        Login
                    </Text>
                </Text>
            </View>
        </View>
        </Pressable>
    )
}

export default SignUpScreen;