import {StyleSheet} from 'react-native';

const HeaderStyles = StyleSheet.create({

container:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:15,
    paddingVertical:12,
    backgroundColor:"#ffffff",

    shadowColor:"#000",
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.1,
    shadowRadius:3,
    justifyContent:"center"
    // elevation:4
},

logo:{
    fontSize:20,
    fontWeight:"bold",
    color:"#27ae60",
    // justifyContent:"center"
},

buttons:{
    flexDirection:"row",
    alignItems:"center"
},

button:{
    marginLeft:15,
    paddingVertical:6,
    paddingHorizontal:10,
    borderRadius:6
},

buttonText:{
    fontSize:14,
    fontWeight:"500",
    color:"#333"
}

});

export default HeaderStyles;