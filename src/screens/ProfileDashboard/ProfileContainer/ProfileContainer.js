import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextDefault } from '../../../components';
import profileImage from '../../../assets/profileimage.jpg';
import { colors } from '../../../utils';

function ProfileContainer(props) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Do you surely want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout canceled'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('mpin');
              await AsyncStorage.removeItem('isMpinCreated');
              navigation.replace('OTP');
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/bg.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Picture and Name */}
        <View style={styles.profileSection}>
          <Image source={profileImage} style={styles.profileImage} />
          <TextDefault style={styles.profileName} H4>
            {'User Name'}
          </TextDefault>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsSection} H5>
          {[ 
            { label: 'Your Profile', icon: 'account-circle', route: 'EditingProfile' }, // Updated to 'user' icon from FontAwesome
            { label: 'Delete', icon: 'delete', route: 'DeleteButton' },
            { label: 'My Scheme', icon: 'list', route: 'MyScheme' },
            { label: 'Help Center', icon: 'help', route: 'HelpCenter' },
            { label: 'Privacy Policy', icon: 'security', route: 'PrivacyPolicy' },
            { label: 'Terms and Condition', icon: 'lock', route: 'TermsandCondition' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingsItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.settingsItemIcon}>
                <MaterialIcons name={item.icon} size={24} color={colors.greenColor} />
              </View>
              <TextDefault style={styles.settingsItemText} H5>
                {item.label}
              </TextDefault>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={colors.greenColor}
              />
            </TouchableOpacity>
          ))}

          {/* Logout Option */}
          <TouchableOpacity style={styles.settingsItem} onPress={handleLogout}>
            <View style={styles.settingsItemIcon}>
              <MaterialIcons name="logout" size={24} color={colors.greenColor} />
            </View>
            <TextDefault style={styles.settingsItemText} H5>
              Log Out
            </TextDefault>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={colors.greenColor}
            />
          </TouchableOpacity>
        </View>

        <View style={{ height: 300 }} />
      </ScrollView>
    </ImageBackground>
  );
}

export default ProfileContainer;
