import React, { useEffect, useState, useRef } from 'react';
import { Animated, Image, View, FlatList, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTab, TextDefault, Slider } from '../../components';
import GoldPlan from '../../ui/ProductCard/GoldPlans';
import ProductCard from '../../ui/ProductCard/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { verticalScale, scale, colors } from '../../utils';

function MainLanding() {
  const navigation = useNavigation();
  const [goldRate, setGoldRate] = useState(null);
  const [silverRate, setSilverRate] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [rateUpdated, setRateUpdated] = useState(null);

  // Animation values
  const goldAnimation = useRef(new Animated.Value(0)).current;
  const silverAnimation = useRef(new Animated.Value(0)).current;

// Create animated styles for coins
const createAnimatedStyle = (animatedValue) => {
  const rotateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 1],
  });

  return {
    transform: [{ rotateY }, { scale }],
    opacity,
  };
};

// Start animations
useEffect(() => {
  const animateGold = Animated.loop(
    Animated.timing(goldAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    })
  );

  const animateSilver = Animated.loop(
    Animated.timing(silverAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    })
  );

  animateGold.start();
  setTimeout(() => animateSilver.start(), 1000);

  return () => {
    goldAnimation.stopAnimation();
    silverAnimation.stopAnimation();
  };
}, []);


  // Fetch rates
  const fetchRates = async () => {
    try {
      const response = await fetch('https://jerwishtech.site/v1/api/account/todayrate');
      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      if (data) {
        setGoldRate(data.Rate);
        setSilverRate(data.SILVERRATE);
        setRateUpdated(formatDate(new Date()));
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  // Fetch schemes
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch('https://jerwishtech.site/v1/api/member/scheme');
        const data = await response.json();
        setSchemes(
          data.map((s) => ({
            schemeId: s.SchemeId,
            schemeName: s.schemeName,
            description: s.SchemeSName,
          }))
        );
      } catch (error) {
        console.error('Error fetching schemes:', error);
      }
    };
    fetchSchemes();
  }, []);

  useEffect(() => {
    fetchRates();
  }, []);

  const formatDate = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

    return `Rate updated on ${formattedTime} ${formattedDate}`;
  };

  function renderHeader() {
    return (
      <>
        <View style={styles.headerContainer}>
          <View style={styles.locationWrapper}>
            <View style={styles.locationContainer}>
              <Image source={require('../../assets/logo.jpg')} style={styles.locationImage} />
              <TextDefault style={styles.title} H4 bold>
                AKJ Gold
              </TextDefault>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Gold & Silver Rate</Text>
          {rateUpdated && <Text style={styles.rateUpdatedText}>{rateUpdated}</Text>}

          <View style={styles.trendingContainer}>
            <View style={styles.card}>
              <Animated.View style={[styles.animatedContainer, createAnimatedStyle(goldAnimation)]}>
                <Image source={require('../../assets/gold.png')} style={styles.logo} resizeMode="contain" />
              </Animated.View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.titlecard}>Gold</Text>
                <Text style={[styles.subtitle, { alignSelf: 'flex-start' }]}>
                  {goldRate ? `₹${goldRate}` : 'Loading...'}
                </Text>
                <Text style={styles.subtitle1}>22KT Per gram</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Animated.View style={[styles.animatedContainer, createAnimatedStyle(silverAnimation)]}>
                <Image source={require('../../assets/silver.png')} style={styles.logo} resizeMode="contain" />
              </Animated.View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.titlecard}>Silver</Text>
                <Text style={[styles.subtitle, { alignSelf: 'flex-start' }]}>
                  {silverRate ? `₹${silverRate}` : 'Loading...'}
                </Text>
                <Text style={styles.subtitle1}>Per gram</Text>
              </View>
            </View>
          </View>
        </View>

        <Slider />

        <View style={styles.contentWrapper}>
          <Text style={styles.contentText}>
            Welcome to the Digital home of AKJ Jewellers:
          </Text>
          <Text style={styles.contentText1}>The ideal place to join a savings scheme and save up to buy your dream jewels. AKJ DIGIGOLD empowers you to save and buy jewels conveniently in the plan of your hand. Start saving in gold from today.</Text>
        </View>

        <View style={styles.titleSpacer}>
          <TextDefault textColor={colors.greenColor} H5 bold>
            {'Your Schemes'}
          </TextDefault>
          <View style={styles.seeAllTextContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('MyScheme')}>
              <TextDefault textColor={colors.greenColor} H5 style={styles.seeAllText}>View All</TextDefault>
            </TouchableOpacity>
          </View>
          <ProductCard styles={styles.itemCardContainer} />
        </View>

        <View style={styles.contentWrapper}>
          <Text style={styles.contentText}>
            Customized Gold Plans for You:
          </Text>
          <Text style={styles.contentText1}>Choose from a range of Gold Plans with unique benefits to suit your needs and convenience.</Text>
        </View>

        <View style={styles.titleSpacer}>
          <TextDefault textColor={colors.greenColor} H5 bold>
            {'Gold Plans'}
          </TextDefault>
          <View style={styles.seeAllTextContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('GoldPlanScreen')}>
              <TextDefault textColor={colors.greenColor} H5 style={styles.seeAllText}>View All</TextDefault>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {schemes.map((scheme, index) => (
              <GoldPlan
                key={index}
                schemeId={scheme.schemeId}
                schemeName={scheme.schemeName}
                description={scheme.description}
                styles={styles.itemCardContainer}
              />
            ))}
          </ScrollView>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <ImageBackground
        source={require('../../assets/bg.jpg')}
        style={styles.mainBackground}
        imageStyle={styles.backgroundImageStyle}
      >
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={renderHeader}
        />
        <BottomTab screen="HOME" />
      </ImageBackground>
    </SafeAreaView>
  );
}

export default MainLanding;
