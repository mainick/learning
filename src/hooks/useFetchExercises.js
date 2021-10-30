import { useState, useEffect } from 'react'

const UseFetchExercises = (componentRef) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState([])

  const url = 'http://localhost:3111/exercises'

  const fetchExercises = async () => {
    setIsError(false)
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const jsonData = await response.json()
      setData((prev) => [...prev, ...jsonData])
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!url) return undefined
    if (componentRef.current) fetchExercises()
    return () => {
      // eslint-disable-next-line no-param-reassign
      componentRef.current = false
    }
  }, [url, componentRef])

  return [isLoading, isError, data]
}

export default UseFetchExercises
