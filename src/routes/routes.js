import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import navigationService from './navigationService';

import * as Screen from '../screens';

const NavigationStack = createStackNavigator();
const MainStack = createStackNavigator();


// Navigation Stack for screens without Drawer
function Drawer() {
  return (
    <NavigationStack.Navigator screenOptions={{ headerShown: false }}>
      <NavigationStack.Screen name="MainLanding" component={Screen.MainLanding} />
      <NavigationStack.Screen name="DeleteButton" component={Screen.DeleteButton} />
      <NavigationStack.Screen name="ProductDescription" component={Screen.ProductDescription} />
      <NavigationStack.Screen name="ProfileDashboard" component={Screen.ProfileDashboard} />
      <NavigationStack.Screen name="MyScheme" component={Screen.MyScheme} />
      <NavigationStack.Screen name="HelpCenter" component={Screen.HelpCenterPage} />
      <NavigationStack.Screen name="PrivacyPolicy" component={Screen.PrivacyPolicyPage} />
      <NavigationStack.Screen name="TermsandCondition" component={Screen.TermsConditionsPage} />
    </NavigationStack.Navigator>
  );
}

// Main App Container
function AppContainer() {
 

  return (
    <NavigationContainer
      ref={ref => {
        navigationService.setGlobalRef(ref);
      }}>
      <MainStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ "Drawer"}>
        <MainStack.Screen name="Drawer" component={Drawer} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
