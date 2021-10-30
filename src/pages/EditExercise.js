import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'
import useFetchExercise from '../hooks/useFetchExercise'

const EditExercise = () => {
  const isComponentMounted = useRef(true)
  const [exercise, setExercise] = useState({})
  const handleError = useErrorHandler()
  const history = useHistory()
  const params = useParams()
  const exerciseId = params.id
  const [isLoading, isError, dataExercise] = useFetchExercise(
    isComponentMounted,
    exerciseId
  )

  useEffect(() => {
    if (dataExercise) setExercise(dataExercise)
  }, [dataExercise])

  const handleChange = (e) => {
    const { name, value } = e.target
    setExercise({ ...exercise, [name]: value })
  }

  const handleExerciseUpdation = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3111/exercises/${exercise.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise),
    })
      .then((resp) => {
        console.log(resp.status)
        history.push('/home')
      })
      .catch((error) => handleError(error))
  }

  return (
    <>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleExerciseUpdation}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              name="title"
              onChange={handleChange}
              defaultValue={exercise.title}
              required
              maxLength="15"
            />
          </label>

          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="detail2">
            Detail
            <textarea
              cols="30"
              rows="10"
              name="detail"
              onChange={handleChange}
              defaultValue={exercise.detail}
              required
            />
          </label>

          <button type="submit">Update Exercise</button>
        </form>
      )}
    </>
  )
}

export default EditExercise
