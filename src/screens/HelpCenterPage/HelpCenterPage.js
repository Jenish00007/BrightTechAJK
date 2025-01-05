// HelpCenterPage.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const HelpCenterPage = () => {
  const handleContactSupport = () => {
    // Logic to open contact/support page
    alert('Contacting support...');
  };

  return (
    <View>
      <Text>Help Center</Text>
      <Text>If you have any questions, feel free to reach out to us.</Text>
      <Button title="Contact Support" onPress={handleContactSupport} />
    </View>
  );
};

export default HelpCenterPage;
