import { NavigationProp } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Pages } from '../../pages'
import { CurrencyData } from '../../shared'
import { useStyles } from './Application.styles'

export type RouteList = {
  CurrencyPage: CurrencyData
  HomePage: undefined
}
export type StackNavigation = NavigationProp<RouteList>

const Stack = createStackNavigator<RouteList>()

export const Application: React.FC = () => {
  const { styles } = useStyles()
  return (
    <SafeAreaView style={styles.box}>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="HomePage" component={Pages.HomePage} />
        <Stack.Screen name="CurrencyPage" component={Pages.CurrencyPage} />
      </Stack.Navigator>
    </SafeAreaView>
  )
}
