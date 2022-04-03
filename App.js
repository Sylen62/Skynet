import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import theme from './src/styles/theme';

import ImagePage from './src/pages/image-page';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar animated={true} backgroundColor={theme.background} />
      <View style={{ height: '100%', backgroundColor: theme.background }}>
        <ImagePage />
      </View>
    </PaperProvider>
  );
}
