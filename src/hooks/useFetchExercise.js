import { useState, useEffect } from 'react'

const UseFetchExercise = (componentRef, exerciseId) => {
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
      const jsonData = await resp.json()
      setData((prev) => ({ ...prev, ...jsonData }))
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!url) return undefined
    if (componentRef) fetchExercise()
    return () => {
      // eslint-disable-next-line no-param-reassign
      componentRef.current = false
    }
  }, [url, componentRef])

  return [isLoading, isError, data]
}

export default UseFetchExercise
