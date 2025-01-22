import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Pressable, Text, View } from 'react-native'

import { Icon } from '@rneui/themed'

import { RouteList, StackNavigation } from '../../app/ui/Application'
import { currencyStore } from '../../shared'
import { useStyles } from './CurrencyPage.styles'

export const CurrencyPage: React.FC = () => {
  const navigation = useNavigation<StackNavigation>()

  const route = useRoute<RouteProp<RouteList, 'CurrencyPage'>>()
  const { name, usdRate, usdAsk, usdBid, usdDiff24h } = route.params
  const { styles } = useStyles()
  const percentDiff24h = ((usdDiff24h / usdRate) * 100).toFixed(2) + '%'

  const onGoBack = () => {
    currencyStore.fetchCurrencies()
    navigation.goBack()
  }

  return (
    <View style={styles.box}>
      <View>
        <View style={styles.headingWrapper}>
          <Icon onPress={onGoBack} name="close" size={32} color={'white'} />
        </View>
        <View style={styles.headerWrapper}>
          <Text style={styles.currencyText}>{name.toUpperCase()}</Text>
          <View style={styles.currencyDetailsBox}>
            <Text style={usdDiff24h >= 0 ? styles.diffTextPositive : styles.diffTextNegative}>{percentDiff24h}</Text>
            <Text style={styles.rateText}>{usdRate}</Text>
          </View>
        </View>
        <View style={styles.detailsWrapper}>
          <View style={styles.detailsRow}>
            <Text style={styles.titleText}>Medium price</Text>
            <Text style={styles.descriptionText}>{usdRate}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.titleText}>Ask price</Text>
            <Text style={styles.descriptionText}>{usdAsk}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.titleText}>Bid price</Text>
            <Text style={styles.descriptionText}>{usdBid}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.titleText}>24 hours movement{'\n'}of the price</Text>
            <Text style={styles.descriptionText}>{usdDiff24h}</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.buttonWrapper} onPress={onGoBack}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  )
}
