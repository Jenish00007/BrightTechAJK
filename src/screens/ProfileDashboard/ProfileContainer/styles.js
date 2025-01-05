import { StyleSheet } from 'react-native';
import { verticalScale, scale } from '../../../utils/scaling';

import { colors } from '../../../utils';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: scale(20),
  },
  backgroundImage: {
    flex: 1,  // Take up the full screen
    resizeMode: 'cover',  // Ensures the image covers the screen
    justifyContent: 'flex-start',  // You can adjust this based on where you want content to align
  },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: verticalScale(20),
  // },
  // backButton: {
  //   marginRight: scale(10),
  // },
  // headerTitle: {

  //   fontSize: verticalScale(18),
  //   color: colors.fontMainColor,
  //   marginLeft: 115,
  // },
  profileSection: {
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  profileImage: {
    width: verticalScale(100),
    height: verticalScale(100),
    borderRadius: verticalScale(50),
    borderWidth: 5,
    borderColor: colors.greenColor,
  },
  editIcon: {
    position: 'absolute', // Keep it absolute for overlay
    bottom: verticalScale(40), // Align it with the bottom of the profile image
    right: verticalScale(100), // Align it to the right of the profile image
    backgroundColor: colors.greenColor,
    borderRadius: verticalScale(20), // Circular shape
    padding: scale(5),
  },
  profileName: {
 
    fontSize: verticalScale(20),
    marginTop: verticalScale(10),
    color: colors.greenColor
  },
  settingsSection: {
    marginTop: verticalScale(-2),
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLinesColor,
  },
  settingsItemIcon: {
    marginRight: scale(15),
  },
  settingsItemText: {
    flex: 1,

    // fontSize: verticalScale(16),
    color: colors.greenColor
  },
 
});

export default styles;
