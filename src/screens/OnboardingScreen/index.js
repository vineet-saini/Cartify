import React,{useState, useRef} from 'react';
import {View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingStyles from './style';



const onboardingData = [
    {
        id: 1,
        title:'Welcome to Cartify',
        description: 'Discover amazing products and shop with ease',
        emoji: '🛍️'
    },
    {
        id: 2,
        title: 'Easy Shopping',
        description: 'Browse categories, add to cart and checkout seamlessly',
        emoji: '🛒',
    },
    {
        id: 3,
        title: 'Secure Payment',
        description: 'Multiple payment options with secure payment',
        emoji: '💳',
    },
    // {
    //     id: 4,
    //     title: 'Track Orders',
    //     description: 'Monitor your orders and delivery status in real-time',
    //     emoji: '📦',
    // },
];

const OnboardingScreen = ({navigation}) =>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const { width } = Dimensions.get('window');
    
    const handleNext = () =>{
        if(currentIndex < onboardingData.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({ index: nextIndex });
            setCurrentIndex(nextIndex);
        } else{
            handleFinish();
        }
    };

    const handleSkip = () => {
        handleFinish();
    };

    const handleFinish = async () => {
        await AsyncStorage.setItem('isFirstTime', 'false');
        navigation.replace('Login');
    };

    const renderItem = ({item}) => {
        return (
            <View style={OnboardingStyles.slide}>
                <Text style={OnboardingStyles.emoji}>{item.emoji}</Text>
                <Text style={OnboardingStyles.title}>{item.title}</Text>
                <Text style={OnboardingStyles.description}>{item.description}</Text>
            </View>
        )
    };

    const renderDots = () => (
        <View style={OnboardingStyles.dotsContainer}>
            {onboardingData.map((_, index) => (
                <View
                    key = {index}
                    style={[OnboardingStyles.dot,
                        {backgroundColor: index === currentIndex ? '#4CAF50' : '#E0E0E0'}
                    ]}
                />
            ))}
        </View>
    );

    return(
        <View style={OnboardingStyles.container}>
            <FlatList
                ref={flatListRef}
                data={onboardingData}
                renderItem={renderItem}
                horizontal 
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd = {(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
            />

            {renderDots()}

            <View style={OnboardingStyles.buttonContainer}>
                <TouchableOpacity onPress={handleSkip} style={OnboardingStyles.skipButton}>
                    <Text style={OnboardingStyles.skipText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNext} style={OnboardingStyles.nextButton}>
                    <Text style={OnboardingStyles.nextText}>
                        {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OnboardingScreen;