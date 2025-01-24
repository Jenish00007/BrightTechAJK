import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextDefault } from '../../components';
import { alignment, colors, scale } from '../../utils';

function ProductCard() {
  const navigation = useNavigation();
  const [phoneSearchData, setPhoneSearchData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoneSearchData = async () => {
      try {
        // Fetch phone search data
        const phoneResponse = await fetch('https://jerwishtech.site/v1/api/account/phonesearch?phoneNo=9688192922', {
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
              
              return {
                ...item,
                amountWeight: amountWeightJson[0] || null
              };
            } catch (amountError) {
              console.error('Error fetching amount and weight:', amountError);
              return {
                ...item,
                amountWeight: null
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

  const renderProductCard = ({ item }) => {
    if (!item.amountWeight) return null;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ProductDescription', { product: item })}
        style={styles.cardContainer}>
        <View style={styles.gradientBackground}>
          {/* Top Section */}
          <View style={styles.topSection}>
            <View>
              <TextDefault style={styles.text} bold>
                {item.groupcode} - {item.regno}
              </TextDefault>
              <TextDefault style={styles.text}>{item.pname}</TextDefault>
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
              Active
            </TextDefault>
            <View style={[styles.statusDot, { backgroundColor: '#4CAF50' }]} />
          </View>

          {/* Center Section */}
          <View style={styles.centerSection}>
            <View style={styles.headerRow}>
              <View style={styles.headerTextContainer}>
                <TextDefault style={[styles.text, styles.headerText]}>Weight Saved*</TextDefault>
              </View>
              <View style={styles.headerTextContainer}>
                <TextDefault style={[styles.text, styles.headerText]}>Total Amount*</TextDefault>
              </View>
            </View>
            <View style={styles.valueRow}>
              <View style={styles.valueTextContainer}>
                <TextDefault style={[styles.text, styles.headerText]}>
                  {item.amountWeight.Weight} grams
                </TextDefault>
              </View>
              <View style={styles.valueTextContainer}>
                <TextDefault style={[styles.text, styles.headerText]}>
                  {item.amountWeight.Amount} ₹
                </TextDefault>
              </View>
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
                <TextDefault style={styles.weightValue}>
                  {item.amountWeight.Weight} grams
                </TextDefault>
              </View>
            </View>

            {/* Maturity Date Section */}
            <View style={styles.dateContainer}>
              <TextDefault style={styles.maturityText}>Date of Maturity</TextDefault>
              <TextDefault style={styles.dateText}>
                {new Date(item.maturityDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </TextDefault>
            </View>

            {/* Pay Button Section */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => navigation.navigate('ProductDescription', { product: item })}>
                <TextDefault style={styles.payButtonText}>View</TextDefault>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => navigation.navigate('CheckOut', { product: item })}>
                <TextDefault style={styles.payButtonText}> Pay </TextDefault>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color={colors.greenColor} style={{ marginTop: 20 }} />;
  }

  if (error) {
    return (
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TextDefault style={{ color: colors.redColor }}>{error}</TextDefault>
      </View>
    );
  }

  return (
    <FlatList
      data={productData}
      renderItem={renderProductCard}
      keyExtractor={(item) => item.regno.toString()}
      ListEmptyComponent={
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TextDefault style={{ color: colors.redColor }}>
            No products found
          </TextDefault>
        </View>
      }
      contentContainerStyle={{ padding: scale(5) }}
    />
  );
}

const styles = StyleSheet.create({
  // Add your styles here (unchanged from the original code)
  cardContainer: {
    margin: scale(5),
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
    ...alignment.PxSmall,
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
    alignItems: 'center',
  },
  valueTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...alignment.PxSmall,
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
    flexDirection: 'row',
    gap: 10,
  },
  payButton: {
    backgroundColor: colors.white,
    paddingVertical: scale(5),
    paddingHorizontal: scale(10),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
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
    fontWeight: 'bold',
  },
  yellowLine: {
    height: scale(2),
    backgroundColor: colors.greenColor,
    borderRadius: scale(1),
    marginBottom: scale(10),
  },
});

export default ProductCard;
