import { NavigationProp } from '@react-navigation/native'

import { CurrencyData } from './currency.types'

export type RouteList = {
  CurrencyPage: CurrencyData
  HomePage: undefined
}
export type StackNavigation = NavigationProp<RouteList>
