import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from 'react-native'

import { toJS } from 'mobx'

import { SearchBar, Icon } from '@rneui/themed'

import { StackNavigation } from '../../app/ui/Application'
import { CurrencyData, currencyStore } from '../../shared'
import { useStyles } from './HomePage.styles'

export const HomePage: React.FC = observer(() => {
  const navigation = useNavigation<StackNavigation>()

  const { styles } = useStyles()

  useEffect(() => {
    currencyStore.fetchCurrencies()
  }, [])

  const CurrencyCard: React.FC<{ data: CurrencyData }> = ({ data }) => (
    <Pressable style={styles.buttonWrapper} onPress={() => navigation.navigate('CurrencyPage', toJS(data))}>
      <Text style={styles.currencyText}>{data.name.toUpperCase()}</Text>
      <View style={styles.currencyDetailsBox}>
        <Text style={data.usdDiff24h >= 0 ? styles.diffTextPositive : styles.diffTextNegative}>
          {((data.usdDiff24h / data.usdRate) * 100).toFixed(2)}%
        </Text>
        <Text style={styles.rateText}>{data.usdRate}</Text>
      </View>
    </Pressable>
  )

  return (
    <View style={styles.box}>
      <View style={styles.headerWrapper}>
        <SearchBar
          inputContainerStyle={styles.searchBarInputContainerStyle}
          containerStyle={styles.searchBarContainerStyle}
          style={styles.searchBar}
          placeholder="Enter currency name"
          onChangeText={(text) => currencyStore.updateSearch(text)}
          value={currencyStore.search}
          searchIcon={<Icon name="search" size={32} color={currencyStore.search.length ? '#72EC89' : 'white'} />}
        />
        <View style={styles.sortWrapper}>
          <Icon
            onPress={() => currencyStore.toggleSort()}
            name="sort"
            size={32}
            color={currencyStore.sort ? (currencyStore.sortAscending ? 'red' : '#72EC89') : 'white'}
            style={{
              transform: [{ scaleY: currencyStore.sortAscending ? -1 : 1 }],
              marginRight: currencyStore.sort ? 16 : 0
            }}
          />
          {currencyStore.sort && (
            <Icon name="close" size={32} color="white" onPress={() => currencyStore.resetSort()} />
          )}
        </View>
      </View>
      {currencyStore.loading ? (
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#72EC89" />
        </View>
      ) : (
        <FlatList
          data={currencyStore.filteredAndSortedProducts}
          renderItem={({ item }) => <CurrencyCard data={item} />}
          keyExtractor={(item) => item.name}
          numColumns={1}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={currencyStore.loading}
              onRefresh={() => currencyStore.fetchCurrencies()}
              colors={['grey']}
              progressBackgroundColor={'black'}
            />
          }
        />
      )}
    </View>
  )
})
