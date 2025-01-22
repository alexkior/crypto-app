import { Pressable, Text, View } from 'react-native'

import { useStyles } from './CurrencyCard.styles'
import { CurrencyCardProps } from './CurrencyCard.types'

export const CurrencyCard: React.FC<CurrencyCardProps> = (props) => {
  const { data, onPress } = props
  const { styles } = useStyles()
  return (
    <Pressable style={styles.buttonWrapper} onPress={() => onPress(data)}>
      <Text style={styles.currencyText}>{data.name.toUpperCase()}</Text>
      <View style={styles.currencyDetailsBox}>
        <Text style={data.usdDiff24h >= 0 ? styles.diffTextPositive : styles.diffTextNegative}>
          {((data.usdDiff24h / data.usdRate) * 100).toFixed(2)}%
        </Text>
        <Text style={styles.rateText}>{data.usdRate}</Text>
      </View>
    </Pressable>
  )
}
