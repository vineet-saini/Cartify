import {StyleSheet} from 'react-native';
const SplashStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#4CAF50',
        justifyContent:'center',
        alignItems: 'center',
    },
    logoContainer:{
        alignItems:'center',
    },
    // logo:{
    //     fontSize: 80,
    //     marginBottom: 20,
    // },
    logoImage:{
        width: 120,
        height : 120,
        marginBottom: 20,
    },
    title:{
        fontSize: 32,
        fontWeight:'bold',
        color: 'white',
        marginBottom: 8,
    },
    subtitle:{
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
    },
});

export default SplashStyles;