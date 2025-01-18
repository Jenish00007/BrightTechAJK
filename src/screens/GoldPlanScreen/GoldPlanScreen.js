import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity,ImageBackground } from 'react-native';


import BottomTab from '../../components/BottomTab/BottomTab';
import { BackHeader } from '../../components/Headers/Headers'; // Import BackHeader component
import { colors, alignment } from '../../utils';
import GoldPlan from '../../ui/ProductCard/GoldPlans';
import { StyleSheet } from 'react-native';

function GoldPlanScreen({ navigation }) {
  const backPressed = () => {
    navigation.goBack(); // Navigate to the previous screen when the back arrow is pressed
  };
  const [schemes, setSchemes] = useState([]);

   // Fetch schemes data
    useEffect(() => {
      const fetchSchemes = async () => {
        try {
          const response = await fetch('https://jerwishtech.site/v1/api/member/scheme');
          const data = await response.json();
          const formattedSchemes = data.map(s => ({
            schemeId: s.SchemeId,
            schemeName: s.schemeName,
          }));
          setSchemes(formattedSchemes); // Store the formatted schemes
        } catch (error) {
          console.error('Error fetching schemes:', error);
        }
      };
  
      fetchSchemes();
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

      {/*title */}
      <View style={styles.title}>
        <Text style={styles.title}>{'Your GoldPlans'}</Text>
      </View>



      {/* Make GoldPlans horizontally scrollable */}
      <ScrollView Vertical showsHorizontalScrollIndicator={false}>
            {schemes.map((scheme, index) => (
              <GoldPlan
                key={index}
                schemeId={scheme.schemeId}
                schemeName={scheme.schemeName}
                styles={styles.itemCardContainer}
              />
            ))}
          </ScrollView>

      {/* Bottom Navigation */}
      <BottomTab screen="GOLDPLANS" style={styles.bottomTab} />
      </ImageBackground>
    </View>

  );
}


const styles = StyleSheet.create({
    mainBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
      backgroundImageStyle: {
        opacity: 0.9, // Adjust opacity as needed
      },
      container: {
        flex: 1,
        backgroundColor: colors.white,
      },
      scrollContainer: {
        paddingVertical: 20,
        padding:20
      },
       title: {
          ...alignment.PxSmall,
          ...alignment.PLxSmall,
          fontWeight: 'bold',
          fontSize: 17, // Ensure the font size is visible enough
          color: colors.greenColor, // Add color for better visibility if needed
      },
})

export default GoldPlanScreen;
