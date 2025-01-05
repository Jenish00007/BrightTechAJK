import React from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet,ImageBackground} from 'react-native';
import { BackHeader } from '../../components';
import { colors, scale } from '../../utils';
import Icon from 'react-native-vector-icons/FontAwesome';

const SchemePassbook = ({ navigation }) => {
  const transactionHistory = [
    { 
      status: 'Completed', 
      date: '22-Dec-2024', 
      weight: '0.138', 
      amount: '7250'
    }
  ];

  const formatDate = (date) => {
    return date;  // In real app, implement proper date formatting
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.statusContainer}>
        <View style={[styles.statusDot, { backgroundColor: item.status === 'Completed' ? '#4CAF50' : '#FFA500' }]} />

        {item.status === 'Completed' && (
            <Icon name="check" size={20} color="green" />
          )}
        {/* <Text style={styles.transactionText}>{item.status}</Text> */}
      </View>
      <Text style={styles.transactionText}>{item.date}</Text>
      <Text style={styles.transactionText}>{item.weight}</Text>
      <Text style={styles.transactionText}>{item.amount}</Text>
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
  <View style={styles.infoRow}>
    <View style={styles.infoColumn}>
      <Text style={styles.infoLabel}>Total Amount Paid</Text>
      <Text style={styles.infoValue}>₹ 1000</Text>
    </View>
    <View style={styles.infoColumn}>
      <Text style={styles.infoLabel}>Average Rate / g</Text>
      <Text style={styles.infoValue}>₹ 7250</Text>
    </View>
  </View>
  <View style={styles.infoRow}>
    <View style={styles.infoColumn}>
      <Text style={styles.infoLabel}>Saved Weight</Text>
      <Text style={styles.infoValue}>0.138</Text>
    </View>
    <View style={styles.infoColumn}>
      <Text style={styles.infoLabel}>Benefit Weight</Text>
      <Text style={styles.infoValue}>0.007</Text>
    </View>
  </View>
  <View style={styles.infoRow}>
    <View style={styles.infoColumn}>
      <Text style={styles.infoLabel}>Date of Join</Text>
      <Text style={styles.infoValue}>22-Dec-2024</Text>
    </View>
    <View style={styles.infoColumn}>
      <Text style={styles.infoLabel}>Date of Maturity</Text>
      <Text style={styles.infoValue}>22-Dec-2024</Text>
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

          <FlatList
            data={transactionHistory}
            renderItem={renderTransaction}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      {/* <ImageBackground
        source={require('../../assets/bg.jpg')}
        style={styles.mainBackground}
        imageStyle={styles.backgroundImageStyle}
      >
      </ImageBackground> */}
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
  headerCard: {
    backgroundColor:colors.greenColor,
    borderRadius: scale(8),
    padding: scale(15),
    marginBottom: scale(20),
  },
  schemeTitle: {
    color: colors.black,
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: scale(16),
  },
  redBox: {
    backgroundColor: '#FF0000', // Bright red
    height: scale(40), // Adjust height as needed
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
  },
  
  infoContainer: {
    backgroundColor: '#FDF6D3', // Light yellow
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
    padding: scale(16),
  },
  
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(16),
    gap: scale(16),
  },
  
  infoColumn: {
    flex: 1,
    marginHorizontal: scale(8),
  },
  
  infoLabel: {
    color: colors.fontMainColor,
    fontSize: scale(12),
    opacity: 0.8,
    marginBottom: scale(4),
  },
  
  infoValue: {
    color: colors.fontSecondColor,
    fontSize: scale(16),
    fontWeight: '600',
  },
  
  transactionContainer: {
    backgroundColor: colors.white,
    borderRadius: scale(8),
    padding: scale(16),
    flex: 1,
  },
  transactionHeader: {
    fontSize: scale(18),
    fontWeight: '600',
    marginBottom: scale(16),
    color: colors.fontMainColor,
  },
  transactionHeaderRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    // alignSelf: "center",
    paddingBottom: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLinesColor,
    marginBottom: scale(8),
  },
  headerText: {
    color: colors.fontMainColor,
    fontSize: scale(14),
    // flex: 1, 
    // textAlign: 'left',
    marginHorizontal: scale(50),
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLinesColor,
    paddingHorizontal: scale(12),
    borderLeftColor: colors.grayLinesColor,
    borderLeftWidth: 1,
    borderRightColor: colors.grayLinesColor,
    borderRightWidth: 1
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  // statusDot: {
  //   width: scale(16),
  //   height: scale(16),
  //   borderRadius: scale(8),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginRight: scale(8),
  // },
  transactionText: {
    fontSize: scale(14),
    color: colors.fontMainColor,
    // flex: 1,
    marginHorizontal: scale(8),
  },
});

export default SchemePassbook;