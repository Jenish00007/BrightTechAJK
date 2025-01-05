import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity,ImageBackground } from 'react-native';
import styles from './styles';

import BottomTab from '../../components/BottomTab/BottomTab';
import { BackHeader } from '../../components/Headers/Headers'; // Import BackHeader component
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons'; // Import MaterialCommunityIcons
import { colors } from '../../utils';
import { TextDefault } from '../../components';
import { textStyles } from '../../utils';
import ProductCard from '../../ui/ProductCard/ProductCard';

function DiscoverPlace({ navigation }) {
  const backPressed = () => {
    navigation.goBack(); // Navigate to the previous screen when the back arrow is pressed
  };



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
        <Text style={styles.title}>{'Your Schemes'}</Text>
      </View>



      {/* Card List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
       <ProductCard/>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTab screen="MyScheme" style={styles.bottomTab} />
      </ImageBackground>
    </View>

  );
}

export default DiscoverPlace;
