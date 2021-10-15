import { useState, useEffect } from 'react'

const UseFetchExercises = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState([])

  const url = 'http://localhost:3111/exercises'

  const fetchExercises = async () => {
    setIsError(false)
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const json = await response.json()
      setData((prev) => [...prev, ...json])
    } catch (error) {
      setIsError(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (!url) return
    fetchExercises()
  }, [url])

  return [isLoading, isError, data]
}

export default UseFetchExercises
