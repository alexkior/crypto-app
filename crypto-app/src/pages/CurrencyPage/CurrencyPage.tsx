import { RouteProp, useRoute } from '@react-navigation/native'
import { Text, View } from 'react-native'

import { RouteList } from '../../app/ui/Application'
import { useStyles } from './CurrencyPage.styles'

export const CurrencyPage: React.FC = () => {
  const route = useRoute<RouteProp<RouteList, 'CurrencyPage'>>()
  const { name, usdRate, usdAsk, usdBid, usdDiff24h } = route.params
  const { styles } = useStyles()
  const percentDiff24h = ((usdDiff24h / usdRate) * 100).toFixed(2) + '%'

  return (
    <View style={styles.box}>
      <View style={styles.detailsWrapper}>
        <Text style={styles.currencyText}>{name}</Text>
        <Text style={styles.currencyText}>{usdRate}</Text>
        <Text style={styles.currencyText}>{usdAsk}</Text>
        <Text style={styles.currencyText}>{usdBid}</Text>
        <Text style={styles.currencyText}>{usdDiff24h}</Text>
        <Text style={usdDiff24h >= 0 ? styles.diffTextPositive : styles.diffTextNegative}>{percentDiff24h}</Text>
      </View>
    </View>
  )
}
