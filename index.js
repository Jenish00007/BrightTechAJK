import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';

// Register the app
registerRootComponent(App);

// Also register with AppRegistry for compatibility
AppRegistry.registerComponent('main', () => App);
