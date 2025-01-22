import { makeAutoObservable, runInAction } from 'mobx'

import { CurrencyData, RawCurrencyData } from '../types'
import { validateApiResponse } from '../utils'

class CurrencyStore {
  loading = true
  products: CurrencyData[] = []
  search = ''
  sort = false
  sortAscending = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async fetchCurrencies() {
    runInAction(() => {
      this.loading = true
      this.error = null
    })
    try {
      const response = await fetch('https://app.youhodler.com/api/v3/rates/extended')

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data: unknown = await response.json()
      if (!validateApiResponse(data)) {
        throw new Error('Invalid API response structure')
      }

      const products = Object.entries(data).flatMap(([currencyKey, items]) =>
        Object.entries(items as unknown as RawCurrencyData)
          .filter(([name]) => name.toLowerCase() === 'usd')
          .map(([, details]) => ({
            name: currencyKey,
            usdRate: details.rate,
            usdAsk: details.ask,
            usdBid: details.bid,
            usdDiff24h: details.diff24h
          }))
      )

      runInAction(() => {
        this.products = products
      })
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An unknown error occurred'
      })
    } finally {
      runInAction(() => {
        this.loading = false
      })
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