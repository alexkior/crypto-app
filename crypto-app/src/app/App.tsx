import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Application } from './ui'

export const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Application />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
