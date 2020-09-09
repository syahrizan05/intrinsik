import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Platform, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './src/store/reducers/Reducer';
import * as actionCreator from './src/store/actions/action'
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { useFonts, Montserrat_400Regular, Montserrat_400Regular_Italic, } from '@expo-google-fonts/montserrat';


const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
  });
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    store.dispatch(actionCreator.checkSignIn())
  }, [])


  if (!isLoadingComplete && !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>)
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App