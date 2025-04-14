import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import styles from './styles';
import React, { useEffect, useState } from 'react';
import BottomTab from '../../components/BottomTab/BottomTab';
import { BackHeader } from '../../components/Headers/Headers';
import { colors } from '../../utils';
import { TextDefault } from '../../components';
import ProductCard from '../../ui/ProductCard/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DiscoverPlace({ navigation }) {
  const backPressed = () => {
    navigation.goBack(); 
  };

  const [phoneSearchData, setPhoneSearchData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(true);
  useEffect(() => {
    
    const fetchPhoneSearchData = async () => {
      const storedPhoneNumber = await AsyncStorage.getItem('userPhoneNumber');
      console.log(storedPhoneNumber)
      try {
        // Fetch phone search data
        const phoneResponse = await fetch(`https://jerwishtech.site/v1/api/account/phonesearch?phoneNo=${storedPhoneNumber}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        // Check if response is successful
        if (!phoneResponse.ok) {
          throw new Error(`Phone Search HTTP error! status: ${phoneResponse.status}`);
        }

        const phoneJson = await phoneResponse.json();
        
        if (phoneJson && phoneJson.length > 0) {
          setPhoneSearchData(phoneJson);
          
          // Fetch amount and weight for each item
          const productPromises = phoneJson.map(async (item) => {
            try {
              const amountWeightResponse = await fetch(
                `https://jerwishtech.site/v1/api/getAmountWeight?REGNO=${item.regno}&GROUPCODE=${item.groupcode}`, 
                {
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                }
              );

              // Check if response is successful
              if (!amountWeightResponse.ok) {
                throw new Error(`Amount Weight HTTP error! status: ${amountWeightResponse.status}`);
              }

              const amountWeightJson = await amountWeightResponse.json();
               // Check the maturityDate and joindate to determine if it's active or deactivated
           const isActive = !(item.joindate);  // If both dates are null, it's active
           const itemStatus = isActive ? 'active' : 'deactivated'; // Determine status
           setStatus(itemStatus)
              return {
                ...item,
                amountWeight: amountWeightJson[0] || null,
                status: itemStatus,
              };
            } catch (amountError) {
              console.error('Error fetching amount and weight:', amountError);
              return {
                ...item,
                amountWeight: null,
                status: 'deactivated',
              };
            }
          });
          
          const resolvedProductData = await Promise.all(productPromises);
          
          // Filter out items with null amountWeight
          const validProductData = resolvedProductData.filter(item => item.amountWeight !== null);
          
          setProductData(validProductData);
          
          if (validProductData.length === 0) {
            setError('No valid product data found');
          }
        } else {
          setError('No phone search data available');
        }
      } catch (err) {
        console.error('Detailed fetch error:', err);
        setError(`Failed fetch data: ${err.message}`);
        
        // Optional: Show an alert to the user
        Alert.alert('Fetch Error', `Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneSearchData();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/bg.jpg')}
        style={styles.mainBackground}
        imageStyle={styles.backgroundImageStyle}
      >
        {/* BackHeader component */}
        <BackHeader backPressed={backPressed} />

        {/* Title */}
        <View style={styles.title}>
          <Text style={styles.title}>{'Your Schemes'}</Text>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainer} // Add padding and margin
          style={styles.scrollView}
          showsVerticalScrollIndicator={false} // Optional: hides the vertical scrollbar
        >
          {/* Display Product Cards */}
          <View style={styles.titleSpacer}>
            {productData && productData.length > 0 ? (
              productData.map((item, index) => (
                <ProductCard
                  key={index}
                  productData={item}
                  loading={loading}
                  error={error}
                  navigation={navigation}
                  status={status} 
                />
              ))
            ) : (
              <TextDefault textColor={colors.redColor}>No products available.</TextDefault>
            )}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomTab screen="SCHEMES" style={styles.bottomTab} />
      </ImageBackground>
    </View>
  );
}

export default DiscoverPlace;
