import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <CartProvider>
        <SafeAreaProvider
          initialMetrics={{
            insets: { top: 0, bottom: 0, left: 0, right: 0 },
            frame: { x: 0, y: 0, width: 0, height: 0 },
          }}
        >
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppNavigator />
          <Toast />
        </SafeAreaProvider>
      </CartProvider>
    </Provider>
  );
}

export default App;