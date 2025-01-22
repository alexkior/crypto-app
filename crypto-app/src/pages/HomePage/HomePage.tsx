import { useNavigation } from '@react-navigation/native'
import { SetStateAction, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'

import { SearchBar, Icon } from '@rneui/themed'

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
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState(false)
  const [sortAscending, setSortAscending] = useState(false)

  const [search, setSearch] = useState('')

  const updateSearch = (search: SetStateAction<string>) => {
    setSearch(search)
  }

  const onSortPress = () => {
    if (!sort) {
      setSort(true)
      setSortAscending(false)
      return
    }
    setSortAscending((prevSortAscending) => !prevSortAscending)
  }

  const CurrencyCard: React.FC<{ data: CurrencyData }> = ({ data }) => (
    <Pressable style={styles.buttonWrapper} onPress={() => navigation.navigate('CurrencyPage', data)}>
      <Text style={styles.currencyText}>{data.name.toUpperCase()}</Text>
      <View style={styles.currencyDetailsBox}>
        <Text style={data.usdDiff24h >= 0 ? styles.diffTextPositive : styles.diffTextNegative}>
          {((data.usdDiff24h / data.usdRate) * 100).toFixed(2)}%
        </Text>
        <Text style={styles.rateText}>{data.usdRate}</Text>
      </View>
    </Pressable>
  )

  const [products, setProducts] = useState<CurrencyData[]>([])

  useEffect(() => {
    setLoading(true)
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
      .finally(() => setLoading(false))
  }, [])

  const renderItem = ({ item }: { item: CurrencyData }) => <CurrencyCard data={item} />
  return (
    <View style={styles.box}>
      <View style={styles.headerWrapper}>
        <SearchBar
          inputContainerStyle={styles.searchBarInputContainerStyle}
          containerStyle={styles.searchBarContainerStyle}
          style={styles.searchBar}
          placeholder="Currency name"
          onChangeText={updateSearch}
          value={search}
          searchIcon={<Icon name="search" size={32} color={search.length ? '#72EC89' : 'white'} />}
          // clearIcon={<Icon name="close" size={20} color={'white'} />}
        />
        <View style={styles.sortWrapper}>
          <Icon
            onPress={onSortPress}
            name="sort"
            size={32}
            color={sort ? (sortAscending ? 'red' : '#72EC89') : 'white'}
            style={{ transform: [{ scaleY: sortAscending ? -1 : 1 }], marginRight: sort ? 16 : 0 }}
          />
          {sort && <Icon name="close" size={32} color="white" onPress={() => setSort(false)} />}
        </View>
      </View>
      {loading ? (
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#72EC89" />
        </View>
      ) : (
        <FlatList
          data={products
            .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
              if (!sort) return 0
              return sortAscending
                ? (a.usdDiff24h / a.usdRate) * 100 - (b.usdDiff24h / b.usdRate) * 100
                : (b.usdDiff24h / b.usdRate) * 100 - (a.usdDiff24h / a.usdRate) * 100
            })}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          numColumns={1}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </View>
  )
}
