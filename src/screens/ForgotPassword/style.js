import { StyleSheet } from "react-native";

const ForgotPasswordStyles = StyleSheet.create({

container:{
    flex:1,
    padding:25,
    backgroundColor:"#f8f9fb"
},

passHeader:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:25
},

title:{
    fontSize:24,
    fontWeight:"bold",
    marginLeft:15,
    color:"#2c3e50"
},

subtitle:{
    fontSize:14,
    color:"#666",
    marginBottom:30
},

input:{
    borderWidth:1,
    borderColor:"#e0e0e0",
    backgroundColor:"#fff",
    padding:14,
    borderRadius:10,
    marginBottom:20,
    fontSize:16
},

passwordContainer:{
    flexDirection:"row",
    alignItems:"center",
    borderWidth:1,
    borderColor:"#e0e0e0",
    borderRadius:10,
    backgroundColor:"#fff",
    paddingHorizontal:14,
    marginBottom:20
},

passwordInput:{
    flex:1,
    paddingVertical:14,
    fontSize:16
},

button:{
    backgroundColor:"#27ae60",
    padding:16,
    borderRadius:10,
    alignItems:"center",
    marginTop:10
},

buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
}

});

export default ForgotPasswordStyles;