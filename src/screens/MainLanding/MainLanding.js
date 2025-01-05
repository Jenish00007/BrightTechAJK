import React, { useState, useEffect } from 'react';
import { View, FlatList, ImageBackground, TouchableOpacity } from 'react-native';

import styles from './styles';
import GoldPlan from '../../ui/ProductCard/GoldPlans';
import { BottomTab, TextDefault,   Slider } from '../../components';
import { Text } from 'react-native';
import { verticalScale, scale, colors, alignment } from '../../utils';
import ProductCard from '../../ui/ProductCard/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const caroselImage = [
  require('../../assets/images/MainLanding/slide1.jpg'),
  require('../../assets/images/MainLanding/slide2.jpg'),
  require('../../assets/images/MainLanding/slide3.jpg'),
  require('../../assets/images/MainLanding/slide4.jpg'),
  require('../../assets/images/MainLanding/slide5.jpg'),
  require('../../assets/images/MainLanding/slide6.jpg'),
];

function MainLanding(props) {
  const navigation = useNavigation();

  const [goldRate, setGoldRate] = useState(null);
  const [silverRate, setSilverRate] = useState(null);

  const fetchRates = async () => {
    try {
      const response = await fetch('http://13.234.113.254:8080/v1/api/account/todayrate');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      if (data) {
        setGoldRate(data.Rate); // Adjust based on actual response structure
        setSilverRate(data.SILVERRATE); // Adjust based on actual response structure
      } else {
        console.warn('No rates data found.');
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  function renderHeader() {
    return (
      <>
        <View style={styles.headerContainer}>
          <View style={styles.locationWrapper}>
            <View style={styles.locationContainer}>
              <Image source={require('../../assets/logo.jpg')} style={styles.locationImage} />
              <TextDefault style={styles.title} H4 bold>AKJ Gold </TextDefault>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Drawer', { screen: 'noDrawer', params: { screen: 'Login' } })}
            style={styles.notificationIconWrapper}>
            <MaterialCommunityIcons color={colors.greenColor} name="account-circle" size={scale(20)} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Gold & Silver Rate</Text>
          <View style={styles.trendingContainer}>
            <View style={styles.card}>
              <Image source={require('../../assets/gold.png')} style={styles.logo} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.titlecard}>Gold</Text>
                <Text style={[styles.subtitle, { alignSelf: 'flex-start' }]}>
                  {goldRate ? `₹${goldRate}` : 'Loading...'}
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <Image source={require('../../assets/silver.png')} style={styles.logo} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.titlecard}>Silver</Text>
                <Text style={[styles.subtitle, { alignSelf: 'flex-start' }]}>
                  {silverRate ? `₹${silverRate}` : 'Loading...'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Slider />

        <View style={styles.titleSpacer}>
          <TextDefault textColor={colors.greenColor} H5 bold>
            {'Your Schemes'}
          </TextDefault>
          <View style={styles.seeAllTextContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('WhereToGo')}>
              <TextDefault textColor={colors.greenColor} H5 style={styles.seeAllText}>View All</TextDefault>
            </TouchableOpacity>
          </View>
          <ProductCard styles={styles.itemCardContainer} />
        </View>

        <View style={styles.titleSpacer}>
          <TextDefault textColor={colors.greenColor} H5 bold>
            {'Gold Plans'}
          </TextDefault>
          <View style={styles.seeAllTextContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('WhereToGo')}>
              <TextDefault textColor={colors.greenColor} H5 style={styles.seeAllText}>View All</TextDefault>
            </TouchableOpacity>
          </View>
          <GoldPlan styles={styles.itemCardContainer} />
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

        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <View>
         
           

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              ListHeaderComponent={renderHeader}
            />

          </View>
        </ScrollView>
        <BottomTab screen="HOME" />
      </ImageBackground>
    </SafeAreaView>
  );
}

export default MainLanding;
