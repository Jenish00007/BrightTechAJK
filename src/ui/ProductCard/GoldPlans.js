import React, { useState, useContext, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextDefault } from '../../components';
import { alignment, colors, scale } from '../../utils';


function GoldPlan(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      // disabled={loadingMutation}
      // activeOpacity={0.9}
      onPress={() => navigation.navigate('ProductDescription', { product: props })}
      style={[styles.cardContainer, props.styles]}>
      <View style={styles.gradientBackground}>
        {/* Top Section */}
        <View style={styles.topSection}>
        
          <View style={styles.rightTop}>
            <TextDefault style={styles.text} bold>DREAM GOLD PLAN</TextDefault>
          </View>
         
        </View>

        {/* Center Section */}
        <View style={styles.centerSection}>
          <TextDefault style={styles.description}>11 PAYMENTS | SAVE AS AMOUNT</TextDefault>
        </View>
        {/* Bottom Section - Align circle and button in a row */}
        <View style={styles.bottomSection}>
        <TouchableOpacity
            style={styles.payButton}
            onPress={() => navigation.navigate('Checkout')}>
            <TextDefault style={styles.payButtonText}>Know More</TextDefault>
          </TouchableOpacity>

          {/* Pay Button */}
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => navigation.navigate('Checkout')}>
            <TextDefault style={styles.payButtonText}>Join Scheme</TextDefault>
          </TouchableOpacity>
        </View>
        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: scale(5),
    borderRadius: scale(15),
    overflow: 'hidden',
  },
  gradientBackground: {
    backgroundColor: colors.lightmaroon,
    padding: scale(5),
    borderRadius: scale(15), // Apply the same borderRadius here
    overflow: 'hidden',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(20),
    ...alignment.Psmall
  },
  rightTop: {
    alignItems: 'flex-end',
  },
  
  
  centerSection: {
    marginBottom: scale(5),
    ...alignment.Psmall
  
  },
  
  bottomSection: {
    flexDirection: 'row', // Align circle and button horizontally
    justifyContent: 'space-between', // Push button to the right and circle to the left
    alignItems: 'center', // Center vertically
    marginTop: scale(10), // Add some space
  },
  
  payButton: {
    backgroundColor:colors.white,
    paddingVertical: scale(8),
    borderRadius: scale(8),
    width: scale(130), // Button width
    alignSelf: 'flex-end', // Align to the right
    // marginTop: 15
  
  },
  text: {
    color: colors.white,
    fontSize: scale(12),
  },
  
  
  payButtonText: {
    color: '#000000',
    fontSize: scale(14),
    fontWeight: 'bold',
    // alignItems: "center",
    padding: 5,
    ...alignment.PLmedium
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 20,
  },
});

export default GoldPlan;
