import React, { useState, useContext, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextDefault } from '../../components';
import { alignment, colors, scale } from '../../utils';

function ProductCard(props) {
  const navigation = useNavigation();

  const dummyData = [
    { id: '1', title: 'Weight Saved*', value: '0.138 grams' },
    { id: '2', title: 'Total Amount*', value: '1000 ₹' },
    { id: '3', title: 'Benefit Earned*', value: '0.007 grams' }
  ];

  const productStatus = 'Active';

  return (
    <TouchableOpacity
    
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ProductDescription', { product: props })}
      style={[styles.cardContainer, props.styles]}>
      <View style={styles.gradientBackground}>



        {/* Top Section */}
        <View style={styles.topSection}>
          <View>
            <TextDefault style={styles.text} bold>DGA - 76</TextDefault>
          </View>
          <View style={styles.rightTop}>
            <TextDefault style={styles.text} bold>DIGI GOLD</TextDefault>
          </View>
          
        </View>
        <View style={styles.statusContainer}>
            <TextDefault style={styles.text} bold>{productStatus}</TextDefault>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: productStatus === 'Active' ? '#4CAF50' : colors.redColor },
              ]}
            />
          </View>

          <View style={styles.centerSection}>
          <View style={styles.headerRow}>
          {dummyData.map(item => (
          <TextDefault key={item.id} style={[styles.text, styles.headerText]}>
          {item.title}
          </TextDefault>
          ))}
        </View>
        <View style={styles.valueRow}>
        {dummyData.map(item => (
        <TextDefault key={item.id} style={[styles.text, styles.headerText]}>
        {item.value}
        </TextDefault>
        ))}
        </View>
        </View>
        {/* Yellow Line Below Center Section */}
        <View style={styles.yellowLine} />

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Circle Section */}
          <View style={styles.circleContainer}>
            <View style={styles.weightCircle}>
              <TextDefault style={styles.weightText}>Weight Saved</TextDefault>
              <TextDefault style={styles.weightValue}>0.138 grams</TextDefault>
            </View>
          </View>

          {/* Maturity Date and Pay Button */}
          <View style={styles.dateAndButtonContainer}>
            <TextDefault style={styles.maturityText}>Date of Maturity: 22-Dec-2024</TextDefault>
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => navigation.navigate('Checkout')}>
              <TextDefault style={styles.payButtonText}>Pay</TextDefault>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    margin: scale(3),
    borderRadius: scale(15),
    overflow: 'hidden',
    elevation: 6,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradientBackground: {
    backgroundColor: colors.lightmaroon,
    padding: scale(5),
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(20),
    ...alignment.Psmall,
  },
  rightTop: {
    alignItems: 'flex-end',
  },
  statusContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: scale(-30),
    marginRight: scale(10),
  },
  statusDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    marginLeft: scale(5),
  },
  centerSection: {
    paddingVertical: scale(10),
    borderRadius: scale(5),
    marginBottom: scale(10),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    marginTop: scale(5), // Adds spacing between the title and value rows
  },
  headerText: {
    fontSize: scale(11),
    color: colors.white,
    textAlign: 'center',
    flex: 1, // Ensures equal spacing between columns
  },
  // valueText: {
  //   fontSize: scale(14),
  //   color: 'white',
  //   textAlign: 'center',
  //   flex: 1, // Ensures equal spacing between columns
  // },
  
  bottomSection: {
    flexDirection: 'row', // Align circle and button horizontally
    justifyContent: 'space-between', // Push button to the right and circle to the left
    alignItems: 'center', // Center vertically
    marginTop: scale(2), // Add some space
    padding: 13
  },
  circleContainer: {
    alignItems: 'flex-start',
 
  },
  weightCircle: {
    width: scale(75),
    height: scale(75),
    borderRadius: scale(70),
    backgroundColor: colors.greenColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(10),
    borderWidth:5,
    borderColor:'#eab308'
  
  },
  dateAndButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: scale(10),
  },
  maturityText: {
    color: colors.white,
    fontSize: scale(11),
    flex: 1,
    marginLeft: 20
  },
  payButton: {
    backgroundColor: colors.white,
    paddingVertical: scale(8),
    paddingHorizontal: scale(15),
    borderRadius: scale(5),
    width: scale(55),
    alignSelf: 'flex-end',
  },
  text: {
    color: colors.white,
    fontSize: scale(12),
  },
  bold: {
    fontWeight: 'bold',
  },
  weightText: {
    color: colors.fontMainColor,
    fontSize: scale(6),
    textAlign: 'center',
  },
  weightValue: {
    color: colors.fontMainColor,
    fontSize: scale(8),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  payButtonText: {
    color: colors.fontMainColor,
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  yellowLine: {
    height: scale(2), // Thickness of the line
    backgroundColor: colors.greenColor, // Yellow color for the line
    borderRadius: scale(1), 
    marginTop: -10
  },
  
});

export default ProductCard;
