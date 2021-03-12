export let saveStorage = (storageToSave: any) => {
  localStorage.ReduxStore = JSON.stringify(storageToSave)
}

export let deleteStorage = () => {
  localStorage.clear()
}

export let getStorage = () => {
  let ReduxStore = localStorage.getItem('ReduxStore')?.toString()
  if (typeof ReduxStore === 'string') {
    return JSON.parse(ReduxStore)
  }
}
