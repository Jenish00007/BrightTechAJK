import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextDefault, BottomTab } from '../../components';
import { alignment, colors, scale } from '../../utils';


function ProductCard(props) {
  const navigation = useNavigation();

  const dummyData = [
    { id: '1', title: 'Weight Saved*', value: '0.138 grams' },
    { id: '2', title: 'Total Amount*', value: '1000 ₹' },
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
            <TextDefault style={styles.text} bold>
              DGA - 76
            </TextDefault>
          </View>
          <View style={styles.rightTop}>
            <TextDefault style={styles.text} bold>
              DIGI GOLD
            </TextDefault>
          </View>
        </View>

        {/* Status Section */}
        <View style={styles.statusContainer}>
          <TextDefault style={styles.text} bold>
            {productStatus}
          </TextDefault>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: productStatus === 'Active' ? '#4CAF50' : colors.redColor },
            ]}
          />
        </View>

        {/* Center Section */}
        <View style={styles.centerSection}>
          <View style={styles.headerRow}>
            {dummyData.map(item => (
              <View key={item.id} style={styles.headerTextContainer}>
              <TextDefault style={[styles.text, styles.headerText]}>{item.title}</TextDefault>
            </View>
            ))}
          </View>
          <View style={styles.valueRow}>
            {dummyData.map(item => (
               <View key={item.id} style={styles.valueTextContainer}>
               <TextDefault style={[styles.text, styles.headerText]}>{item.value}</TextDefault>
             </View>
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

          {/* Maturity Date Section */}
          <View style={styles.dateContainer}>
            <TextDefault style={styles.maturityText}>Date of Maturity</TextDefault>
            <TextDefault style={styles.dateText}>22-Dec-2024</TextDefault>
          </View>

          {/* Pay Button Section */}
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.payButton}
              onPress={() => navigation.navigate('ProductDescription')}>
              <TextDefault style={styles.payButtonText}>View</TextDefault>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => navigation.navigate('CheckOut')}>
              <TextDefault style={styles.payButtonText}> Pay </TextDefault>
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
    paddingVertical: scale(15),
    borderRadius: scale(5),
    marginBottom: scale(5),
    ...alignment.PxSmall
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(5),
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center', // Centering header text
  },
  valueTextContainer: {
    flex: 1,
    alignItems: 'center', // Centering value text
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...alignment.PxSmall
    
  },
  circleContainer: {
    alignItems: 'center',
  },
  weightCircle: {
    width: scale(75),
    height: scale(75),
    borderRadius: scale(70),
    backgroundColor: colors.greenColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(10),
    borderWidth: 5,
    borderColor: '#eab308',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: scale(10),
    alignItems: 'center',
  },
  maturityText: {
    color: colors.greenColor,
    fontSize: scale(11),
    textAlign: 'center',
  },
  dateText: {
    color: colors.greenColor,
    fontSize: scale(10),
    marginTop: scale(2),
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: scale(10),
  },
  payButton: {
    backgroundColor: colors.white,
    paddingVertical: scale(5), // Adjust padding for vertical spacing
    paddingHorizontal: scale(10), // Adjust padding for horizontal spacing
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start', // Makes the button adjust to its content
    marginBottom: scale(10),
  },
  text: {
    color: colors.greenColor,
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
    fontSize: 12,
    fontWeight: "bold"
  },
  yellowLine: {
    height: scale(2),
    backgroundColor: colors.greenColor,
    borderRadius: scale(1),
    marginBottom: scale(10),
  },
});

export default ProductCard;
