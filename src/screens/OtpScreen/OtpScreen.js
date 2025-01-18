import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { TextDefault } from '../../components';
import { alignment } from '../../utils';
import { colors } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

function OTP({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  const inputRefs = useRef([]); // Create refs for each OTP input

  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    const otp = generateOtp();
    setGeneratedOtp(otp);

    try {
      const apiUrl = `https://sms.krispal.in/api/smsapi`;
      const params = {
        key: 'f22fc7c406cfd9b0f2767d436a1c7c69',
        route: '2',
        sender: 'VIMJEW',
        number: phoneNumber,
        sms: `Dear Customer, This is your OTP: ${otp} for Login. Thank you for Shopping - Vimala Jewellers - Manali`,
        templateid: '1707172725674467368',
      };

      await axios.post(apiUrl, null, { params });
      Alert.alert('Success', 'OTP sent successfully!');
      setIsOtpVisible(true); // Show OTP input after successful OTP generation
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.join('') === generatedOtp) {
      Alert.alert('Success', 'OTP verification successful!');
      
      try {
        await AsyncStorage.setItem('isOtpVerified', 'true'); // Save the OTP verification flag
        navigation.navigate('MpinScreen', { step: 3 }); // Navigate to MPIN creation screen
      } catch (error) {
        Alert.alert('Error', 'Failed to save OTP status. Please try again.');
        console.error(error);
      }
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };
  

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Move to the next input
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move to the previous input on backspace
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.jpg')} // Correct path
          style={styles.logoImage}
        />

        {/* Title */}
        <TextDefault style={styles.title}>Sign In</TextDefault>

        {!isOtpVisible && (
          <>
            <TextDefault style={styles.subtitle1}>Mobile No</TextDefault>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </>
        )}

        {isOtpVisible && (
          <>
            <TextDefault style={styles.subtitle}>Enter OTP</TextDefault>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)} // Assign refs to inputs
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                />
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Sign Up Text */}
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    ...alignment.Plarge,
  },
  logoImage: {
    width: 100, // Set width according to your logo size
    height: 100, // Set height according to your logo size
    resizeMode: 'contain', // Ensures logo is scaled correctly
    marginTop: -80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 60,
  },
  subtitle: {
    alignSelf: 'flex-start',
    ...alignment.PBsmall,
    marginLeft: 45,
    
  },
  subtitle1:{
    alignSelf: 'flex-start',
    ...alignment.PBsmall,
    marginLeft: 25,
  },

  input: {
    height: 60,
    width: '90%',
    borderColor: colors.greenColor,
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.backgroudGray,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 60,
    height: 70,
    borderWidth: 2,
    borderColor: colors.greenColor,
    borderRadius: 15,
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
    backgroundColor: colors.grayLinesColor,
    shadowColor: colors.greenColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6
  },
  button: {
    backgroundColor: colors.greenColor,
    width: '90%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 80,
  },
  buttonText: {
    color: colors.fontMainColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 50,
    fontSize: 16,
  },
  signUpLink: {
    textDecorationLine: 'underline',
  },
});

export default OTP;
