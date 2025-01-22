import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, Text } from 'react-native'

import { StackNavigation } from '../../app/ui/Application'
import { useStyles } from './HomePage.styles'

export interface CurrencyData {
  name: string
  usdRate: number
  usdAsk: number
  usdBid: number
  usdDiff24h: number
}

interface RawCurrencyData {
  [key: string]: {
    rate: number
    ask: number
    bid: number
    diff24h: number
  }
}

export const HomePage: React.FC = () => {
  const navigation = useNavigation<StackNavigation>()
  const { styles } = useStyles()

  const CurrencyCard: React.FC<{ data: CurrencyData }> = ({ data }) => (
    <Pressable style={styles.buttonWrapper} onPress={() => navigation.navigate('CurrencyPage', data)}>
      <Text>{data.name}</Text>
      <Text>{data.usdRate}</Text>
    </Pressable>
  )

  const [products, setProducts] = useState<CurrencyData[]>([])

  useEffect(() => {
    fetch('https://app.youhodler.com/api/v3/rates/extended')
      .then((response) => response.text())
      .then((data) => JSON.parse(data))
      .then((data) =>
        Object.entries(data).flatMap(([currencyKey, items]) =>
          Object.entries(items as RawCurrencyData)
            .filter(([name]) => name.toLowerCase() === 'usd')
            .map(([, details]) => ({
              name: currencyKey,
              usdRate: details.rate,
              usdAsk: details.ask,
              usdBid: details.bid,
              usdDiff24h: details.diff24h
            }))
        )
      )
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  const renderItem = ({ item }: { item: CurrencyData }) => <CurrencyCard data={item} />
  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      numColumns={1}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  )
}
