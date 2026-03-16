import {StyleSheet} from 'react-native';

const LoginStyles = StyleSheet.create({

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

loginBtn:{
backgroundColor:"#2ecc71",
padding:14,
borderRadius:8,
alignItems:"center",
marginTop:5
},

loginText:{
color:"#fff",
fontSize:16,
fontWeight:"bold"
},

forgotText:{
textAlign:"right",
marginTop:10,
color:"#3498db"
},

signupText:{
marginTop:20,
textAlign:"center",
color:"#555"
},

signupLink:{
color:"#2ecc71",
fontWeight:"bold"
},
passwordContainer:{
  flexDirection:'row',
  alignItems:'center',
  borderWidth:1,
  borderColor:'#ccc',
  borderRadius:8,
  paddingHorizontal:10,
  marginBottom:15
},

passwordInput:{
  flex:1,
  paddingVertical:10
},

})

export default LoginStyles;