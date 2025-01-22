import { RouteProp, useRoute } from '@react-navigation/native'
import { Text, View } from 'react-native'

import { RouteList } from '../../app/ui/Application'

export const CurrencyPage: React.FC = () => {
  const route = useRoute<RouteProp<RouteList, 'CurrencyPage'>>()
  const { name, usdRate, usdAsk, usdBid, usdDiff24h } = route.params

  return (
    <View>
      <Text>{name}</Text>
      <Text>{usdRate}</Text>
      <Text>{usdAsk}</Text>
      <Text>{usdBid}</Text>
      <Text>{usdDiff24h}</Text>
    </View>
  )
}
