import React from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { BackHeader } from '../../components';
import { alignment, colors, scale } from '../../utils';
import Icon from 'react-native-vector-icons/FontAwesome';

const SchemePassbook = ({ navigation, route }) => {
  const { product = {}, status } = route.params;  // Provide default empty object
  
  console.log('Received product:', product, status)

  // Define a formatDate function to handle date formatting
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Dynamically create transaction history from product
  const transactionHistory = [
    {
      status: status || 'unknown',
      date: product?.joindate || new Date().toISOString(),
      weight: product?.amountWeight?.Weight || 0,
      amount: parseFloat(product?.amountWeight?.Amount) || 0,
    }
  ];

  // Render each transaction item
  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor:
                status === 'active' ? '#4CAF50' : status === 'deactivated' ? '#F44336' : '#FFA500',
            },
          ]}
        />
        {status === 'active' && (
          <Icon name="check" size={15} color="green" />
        )}
        {status === 'deactivated' && (
          <Icon name="times" size={15} color="red" />
        )}
      </View>
      <Text style={styles.transactionText}>{formatDate(item.date)}</Text>
      <Text style={styles.transactionWText}>{item.weight} g</Text>
      <Text style={styles.transactioninrText}>₹ {item.amount}</Text>
    </View>
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        title="Scheme Passbook"
        backPressed={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Red Header Box */}
        <View style={styles.redBox} />

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.schemeTitle}>{product?.pname || 'Scheme Name'}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Total Amount Paid</Text>
              <Text style={styles.infoValue}>₹ {product?.amountWeight?.Amount || '0'}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Average Rate / g</Text>
              <Text style={styles.infoValue}>
                ₹ {product?.amountWeight?.Amount || '0'}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Saved Weight</Text>
              <Text style={styles.infoValue}>
                {product?.amountWeight?.Weight || '0'} g
              </Text>
            </View>
         
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Date of Join</Text>
              <Text style={styles.infoValue}>
                {formatDate(product?.joindate) || 'N/A'}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Date of Maturity</Text>
              <Text style={styles.infoValue}>
                {formatDate(product?.maturityDate) || 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.transactionContainer}>
          <Text style={styles.transactionHeader}>Transaction History</Text>

          {/* Transaction List Headers */}
          <View style={styles.transactionHeaderRow}>
            <Text style={styles.headerText}>Status</Text>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>Weight</Text>
            <Text style={styles.headerText}>INR</Text>
          </View>

          {/* FlatList for Transaction History */}
          <FlatList
            data={transactionHistory || []}  
            renderItem={renderTransaction}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: scale(16),
  },
  redBox: {
    backgroundColor: '#FF0000', // Bright red
    height: scale(40),
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
  },
  infoContainer: {
    backgroundColor: '#FDF6D3', // Light yellow
    borderBottomLeftRadius: scale(15),
    borderBottomRightRadius: scale(15),
    ...alignment.PLsmall,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(16),
    gap: scale(107),
  },
  schemeTitle: {
    color: colors.lightmaroon,
    fontSize: scale(20),
    fontWeight: 'bold',
    marginBottom: scale(16),
  },
  infoColumn: {
    flex: 1,
    justifyContent: "space-between",
  },
  infoLabel: {
    color: colors.fontMainColor,
    fontSize: scale(12),
    opacity: 0.8,
    marginBottom: scale(4),
  },
  infoValue: {
    color: colors.fontSecondColor,
    fontSize: scale(12),
    fontWeight: '600',
  },
  transactionContainer: {
    backgroundColor: colors.white,
    borderRadius: scale(0),
    padding: scale(5),
    flex: 1,
  },
  transactionHeader: {
    fontSize: scale(10),
    fontWeight: '600',
    marginBottom: scale(16),
    color: colors.fontMainColor,
  },
  transactionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLinesColor,
    marginBottom: scale(5),
  },
  headerText: {
    color: colors.fontMainColor,
    fontSize: scale(12),
    marginHorizontal: scale(20),
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLinesColor,
    marginHorizontal: scale(0),
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 30,
  },
  transactionText: {
    fontSize: scale(12),
    color: colors.fontMainColor,
    marginHorizontal: scale(14),
  },
  transactionWText: {
    fontSize: scale(12),
    color: colors.fontMainColor,
    flex: 1,
    marginRight: 20,
  },
  transactioninrText: {
    fontSize: scale(14),
    color: colors.fontMainColor,
  },
});

export default SchemePassbook;
