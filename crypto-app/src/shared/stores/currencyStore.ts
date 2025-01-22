import { makeAutoObservable } from 'mobx'

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

class CurrencyStore {
  loading = true
  products: CurrencyData[] = []
  search = ''
  sort = false
  sortAscending = false

  constructor() {
    makeAutoObservable(this)
  }

  fetchCurrencies = async () => {
    this.loading = true
    try {
      const response = await fetch('https://app.youhodler.com/api/v3/rates/extended')
      const data = await response.json()
      this.products = Object.entries(data).flatMap(([currencyKey, items]) =>
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
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      this.loading = false
    }
  }

  updateSearch(search: string) {
    this.search = search
  }

  toggleSort() {
    if (!this.sort) {
      this.sort = true
      this.sortAscending = false
      return
    }
    this.sortAscending = !this.sortAscending
  }

  resetSort() {
    this.sort = false
    this.sortAscending = false
  }

  get filteredAndSortedProducts() {
    return this.products
      .filter((product) => product.name.toLowerCase().includes(this.search.toLowerCase()))
      .sort((a, b) => {
        if (!this.sort) return 0
        const diffA = (a.usdDiff24h / a.usdRate) * 100
        const diffB = (b.usdDiff24h / b.usdRate) * 100
        return this.sortAscending ? diffA - diffB : diffB - diffA
      })
  }
}

export const currencyStore = new CurrencyStore()
