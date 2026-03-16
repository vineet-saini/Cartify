import {StyleSheet} from 'react-native';

const SignUpStyle = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f6fa",
justifyContent:"center",
padding:20
},

title:{
fontSize:28,
fontWeight:"bold",
textAlign:"center",
marginBottom:30
},

card:{
backgroundColor:"#fff",
padding:25,
borderRadius:12,
shadowColor:"#000",
shadowOpacity:0.1,
shadowOffset:{width:0,height:4},
shadowRadius:6,
elevation:4
},

input:{
borderWidth:1,
borderColor:"#ddd",
padding:12,
borderRadius:8,
marginBottom:15,
fontSize:16
},

signupBtn:{
backgroundColor:"#2ecc71",
padding:14,
borderRadius:8,
alignItems:"center",
marginTop:10
},

signupText:{
color:"#fff",
fontSize:16,
fontWeight:"bold"
},

loginText:{
marginTop:15,
textAlign:"center",
color:"#555"
},

loginLink:{
color:"#2ecc71",
fontWeight:"bold"
}

})

export default SignUpStyle;