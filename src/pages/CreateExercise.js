import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'

const initialExercise = {
  title: '',
  detail: '',
  complete: false,
}

const CreateExercise = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [exercise, setExercise] = useState(initialExercise)
  const handleError = useErrorHandler()
  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target
    setExercise({ ...exercise, [name]: value })
  }

  const handleExerciseCreation = (e) => {
    e.preventDefault()
    setIsError(false)
    setIsLoading(true)

    const newExercise = {
      id: Math.floor(Math.random() * 10000),
      title: exercise.title,
      detail: exercise.detail,
      complete: false,
    }
    fetch(`http://localhost:3111/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExercise),
    })
      .then((resp) => {
        setIsLoading(false)
        if (resp.ok) history.push('/home')
        else setIsError(true)
      })
      .catch((error) => {
        setIsLoading(false)
        setIsError(true)
        handleError(error)
      })
  }

  return (
    <>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleExerciseCreation}>
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

          <button type="submit">Add Exercise</button>
        </form>
      )}
    </>
  )
}

export default CreateExercise
