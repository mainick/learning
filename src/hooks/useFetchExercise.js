import { useState, useEffect } from 'react'

const UseFetchExercise = (exerciseId) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({})

  const url = `http://localhost:3111/exercises/${exerciseId}`
  const fetchExercise = async () => {
    setIsError(false)
    setIsLoading(true)
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      })
      if (!resp.ok) throw new Error('Exercise not found')
      const json = await resp.json()
      setData((prev) => ({ ...prev, ...json }))
    } catch (error) {
      setIsError(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchExercise()
  }, [url])

  return [isLoading, isError, data]
}

export default UseFetchExercise
