import { useEffect, useState } from 'react'

const TORRE_BIO = 'https://torre.bio/api'
const TORRE_CO = 'https://torre.co/api'
const TORRE_SEARCH = 'https://search.torre.co/'

function useFetchData(
  endpoint: typeof TORRE_BIO | typeof TORRE_CO | typeof TORRE_SEARCH,
  route: string,
  requestData: object,
  method: string,
  afterFunction?: Function,
) {
  const [data, setData] = useState<any>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function init() {
    setData(undefined)
    setLoading(true)
    setLoading(false)
  }

  useEffect(() => {
    if (typeof data != 'undefined' && loading === false) {
      // console.log('🛫🛫 END USEFETCH', route)
      if (typeof afterFunction == 'function') {
        afterFunction()
      }
    }
  }, [loading])

  async function load() {
    // console.log('🛫🛫 START USEFETCH', route)
    init()
    setLoading(true)
    try {
      const response = await fetch(`${endpoint}${route}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
      const info = await response.json()
      if (response.status === 500) {
        throw info.errorMessage
      }
      setError('')
      setData(info)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }

  return [{ data, loading, error }, load] as const
}

export default useFetchData
