import { StyleSheet, Dimensions } from "react-native";
const {width : screenWidth} = Dimensions.get('window');

const OnboardingStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    slide:{
        width : screenWidth,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,

    },
    emoji:{
        fontSize: 100,
        marginBottom: 40,
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    description:{
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
    dotsContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    dot:{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingBottom: 40,
    },
    skipButton:{
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    skipText:{
        fontSize: 16,
        color: '#666',
    },
    nextButton:{
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius:25,
    },
    nextText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    }
})
export default OnboardingStyles;