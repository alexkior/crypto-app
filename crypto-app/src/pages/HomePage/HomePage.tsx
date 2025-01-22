import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Button, FlatList, View } from 'react-native'

import { StackNavigation } from '../../app/ui/Application'
import { useStyles } from './HomePage.styles'

export const HomePage: React.FC = () => {
  const navigation = useNavigation<StackNavigation>()
  const { styles } = useStyles()

  const ProductCard = ({ product }: { product: string }) => (
    <View style={styles.buttonWrapper}>
      <Button title={product} onPress={() => navigation.navigate('CurrencyPage')} />
    </View>
  )

  const [products, setProducts] = useState<string[]>([])

  useEffect(() => {
    fetch('https://app.youhodler.com/api/v3/rates/extended')
      .then((response) => response.text())
      .then((data) => JSON.parse(data))
      .then((data) => Object.keys(data))
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  const renderItem = ({ item }: { item: string }) => <ProductCard product={item} />
  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
      numColumns={1}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  )
}
