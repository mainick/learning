import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'
import { useMutation, useQueryClient } from 'react-query'
import { createExercise } from '../services/ExerciseApi'

const initialExercise = {
  title: '',
  detail: '',
  complete: false,
}

const CreateExercise = () => {
  const [exercise, setExercise] = useState(initialExercise)
  const handleError = useErrorHandler()
  const history = useHistory()
  const queryClient = useQueryClient()

  const handleChange = (e) => {
    const { name, value } = e.target
    setExercise({ ...exercise, [name]: value })
  }

  const mutationExerciseCreation = useMutation(
    (newExercise) => createExercise(newExercise),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('exercisesList', { exact: true })
      },
      onError: (error) => {
        handleError(error)
      },
    }
  )

  const handleExerciseCreation = (e) => {
    e.preventDefault()

    const newExercise = {
      ...exercise,
      id: Math.floor(Math.random() * 10000),
      complete: false,
    }
    mutationExerciseCreation.mutate(newExercise, {
      onSuccess: () => {
        history.push('/home')
      },
    })
  }

  return (
    <>
      {mutationExerciseCreation.isError && (
        <div>Something went wrong...${mutationExerciseCreation.error}</div>
      )}
      {mutationExerciseCreation.isSuccess && <div>Exercise added!</div>}
      {mutationExerciseCreation.isLoading ? (
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
