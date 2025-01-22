import { CurrencyData } from '../../../types'

export interface CurrencyCardProps {
  data: CurrencyData
  onPress: (data: CurrencyData) => void
}
