export interface CurrencyData {
  name: string
  usdRate: number
  usdAsk: number
  usdBid: number
  usdDiff24h: number
}

export interface RawCurrencyData {
  [key: string]: {
    rate: number
    ask: number
    bid: number
    diff24h: number
  }
}
