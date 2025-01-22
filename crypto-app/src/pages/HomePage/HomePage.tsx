import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View, Text } from 'react-native'

import { toJS } from 'mobx'

import { SearchBar, Icon } from '@rneui/themed'

import { CurrencyData, currencyStore, StackNavigation, CurrencyCard } from '../../shared'
import { useStyles } from './HomePage.styles'

export const HomePage: React.FC = observer(() => {
  const navigation = useNavigation<StackNavigation>()

  const { styles } = useStyles()

  const onCurrencyPress = useCallback(
    (data: CurrencyData) => {
      navigation.navigate('CurrencyPage', toJS(data))
    },
    [navigation]
  )

  useEffect(() => {
    currencyStore.fetchCurrencies()
  }, [])

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
        <>
          {currencyStore.error ? (
            <View style={styles.loaderBox}>
              <Icon name="error" size={48} color="red" />
              <Text style={styles.errorText}>{currencyStore.error}</Text>
            </View>
          ) : (
            <FlatList
              data={currencyStore.filteredAndSortedProducts}
              renderItem={({ item }) => <CurrencyCard data={item} onPress={onCurrencyPress} />}
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
        </>
      )}
    </View>
  )
})
