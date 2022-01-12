class LocalCache {
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  get(key: string) {
    const data = window.localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    }
  }
  remove(key: string) {
    window.localStorage.removeItem(key)
  }
  clearAll() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
