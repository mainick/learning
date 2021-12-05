import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'
import { useMutation, useQueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import useFetchExercise from '../hooks/useFetchExercise'
import { editExercise } from '../services/ExerciseApi'

const EditExercise = () => {
  const [exercise, setExercise] = useState({})
  const handleError = useErrorHandler()
  const history = useHistory()
  const queryClient = useQueryClient()
  const params = useParams()
  const exerciseId = params.id
  const {
    isLoading,
    isError,
    data: dataExercise,
    error,
    isFetching,
  } = useFetchExercise(exerciseId)

  const mutationExerciseUpdate = useMutation(
    (newExercise) => editExercise(exerciseId, newExercise),
    {
      onSuccess: (status, data) => {
        queryClient.invalidateQueries('exercisesList', { exact: true })
        queryClient.invalidateQueries(['exercise', data.id], { exact: true })
      },
      onError: (exc) => {
        handleError(exc)
      },
    }
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
    mutationExerciseUpdate.mutate(exercise, {
      onSuccess: () => {
        history.push('/home')
      },
    })
  }

  return (
    <>
      {isError && <div>Something went wrong......${error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {isFetching && <div>Refreshing...</div>}
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
        </>
      )}
      <ReactQueryDevtools initialIsOpen />
    </>
  )
}

export default EditExercise
