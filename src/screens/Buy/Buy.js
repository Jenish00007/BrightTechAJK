import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { alignment, colors } from '../../utils';

function Buy() {
  const [amount, setAmount] = useState('');
  const [weight, setWeight] = useState('');
  const [goldRate, setGoldRate] = useState(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const passedGoldRate = route.params?.goldRate;

  const fetchGoldRate = async () => {
    try {
      const response = await fetch('https://jerwishtech.site/v1/api/account/todayrate');
      if (!response.ok) throw new Error('Failed to fetch gold rate');
      const data = await response.json();
      setGoldRate(data.Rate);
    } catch (error) {
      console.error('Error fetching gold rate:', error);
      setGoldRate('N/A');
    } finally {
      setLoading(false);
    }
  };

  // If a gold rate is passed via route params, use it, else fetch from the API
  useEffect(() => {
    if (passedGoldRate) {
      setGoldRate(passedGoldRate);
      setLoading(false);
    } else {
      fetchGoldRate();
    }
  }, [passedGoldRate]);

  // Convert the entered amount into weight based on the gold rate
  const convertAmountToWeight = (amount) => {
    if (goldRate && amount) {
      const weightInGrams = (amount / goldRate).toFixed(2);
      setWeight(weightInGrams);
    } else {
      setWeight('');
    }
  };

  const handleAmountChange = (text) => {
    setAmount(text);
    convertAmountToWeight(text); // Convert when the amount changes
  };

  const handlePay = () => {
    alert('Proceeding to Pay');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scheme Passbook</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Buying Rate</Text>
        <Text style={styles.cardSubtitle}>Value added and GST will be applicable</Text>
        <View style={styles.innerCard}>
          <View style={styles.rateSection}>
            <Image source={require('../../assets/gold.png')} style={styles.goldImage} />
            <View>
              <Text style={styles.goldText}>Gold 22K (916)</Text>
              {loading ? (
                <ActivityIndicator size="small" color={colors.greenColor} />
              ) : (
                <Text style={styles.rateText}>{`₹${goldRate} / gm`}</Text>
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Pay</Text>
        <View style={styles.quickPaySection}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={handleAmountChange}  // Handle amount change
              placeholder="Enter amount"
            />
          </View>
          <Text style={styles.swapIcon}>⇄</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight (grams)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              editable={false}  // Disable manual input for weight
              placeholder="Weight will be calculated"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Proceed to pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  header: {
    backgroundColor: colors.greenColor,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  innerCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 30,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    width: '90%',
    height: 120,
    alignSelf: 'center',
    ...alignment.MBlarge,
    ...alignment.MTlarge,
    shadowColor: '#000',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    ...alignment.MBsmall,
    ...alignment.MTsmall,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.fontThirdColor,
    ...alignment.MBmedium,
  },
  rateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldImage: {
    width: 40,
    height: 40,
    marginRight: 40,
  },
  goldText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.fontMainColor,
    ...alignment.PxSmall,
  },
  rateText: {
    fontSize: 14,
    color: colors.greenTextColor,
    ...alignment.PxSmall,
  },
  quickPaySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    color: colors.fontMainColor,
    ...alignment.MBmedium,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: colors.graycolor,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  swapIcon: {
    fontSize: 55,
    color: colors.black,
    ...alignment.MTlarge,
  },
  payButton: {
    backgroundColor: colors.greenColor,
    paddingVertical: 12,
    borderRadius: 8,
  },
  payButtonText: {
    textAlign: 'center',
    color: colors.fontMainColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Buy;
