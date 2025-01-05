import React, { useContext } from 'react';
import { TouchableOpacity, View, Image, ScrollView, ImageBackground } from 'react-native';
import styles from './styles';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextDefault, BackHeader } from '../../../components';

// Import your profile image
import profileImage from '../../../assets/profileimage.jpg';
import { colors } from '../../../utils';

function ProfileContainer(props) {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/bg.jpg')}
      // source={require('../../../assets/background.jpg')}  
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* <BackHeader
          title={'Profile'}
          backPressed={() => navigation.goBack()}
          
        /> */}

        {/* Profile Picture and Name */}
        <View style={styles.profileSection}>
          <Image
            source={profileImage} // Use the imported image here
            style={styles.profileImage}
          />

          <TextDefault style={styles.profileName} H4>
            {'User Name'}
          </TextDefault>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsSection} H5>
          {[
            // { label: 'Your Profile', icon: 'person-outline', route: 'EditingProfile' },
            { label: 'Delete', icon: 'delete', route: 'DeleteButton' },
            // { label: 'Favourites', icon: 'star-outline', route: 'Favourite' },
            { label: 'My Scheme', icon: 'list', route: 'MyScheme' },

            { label: 'Help Center', icon: 'help', route: 'HelpCenter' },  // Changed icon name to 'help'
            { label: 'Privacy Policy', icon: 'security', route: 'PrivacyPolicy' },  // Changed icon name to 'lock'
            { label: 'Terms and Condition', icon: 'lock', route: 'TermsandCondition' },

            { label: 'Log Out ', icon: 'delete', route: 'logout' }
          ]
            .map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingsItem}
                onPress={() => navigation.navigate(item.route)}>
                <View style={styles.settingsItemIcon}>
                  <MaterialIcons
                    name={item.icon}
                    size={24}
                    color={colors.greenColor}
                  />
                </View>
                <TextDefault style={styles.settingsItemText} H5>
                  {item.label}
                </TextDefault>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={colors.greenColor} />
              </TouchableOpacity>
            ))}
        </View>
        <View style={{ height: 300 }}>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default ProfileContainer;      