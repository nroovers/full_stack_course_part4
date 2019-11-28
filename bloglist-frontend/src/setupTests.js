
let savedItems = {}

console.log('localStorageMock loaded')

const localStorageMock = {
  setItem: (key, item) => {
    console.log('localStorageMock.setItem', key, item)
    savedItems[key] = item
  },
  getItem: (key) => {
    console.log('localStorageMock.getItem', key, savedItems[key])
    return savedItems[key]
  },
  clear: () => {
    savedItems = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })