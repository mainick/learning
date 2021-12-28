import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'
import { useMutation, useQueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { toast } from 'react-toastify'
import useFetchExercise from '../hooks/useFetchExercise'
import { editExercise } from '../services/ExerciseApi'
import exerciseKeys from '../utils/ReactQueryKeyFactories'

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

  const { mutate: mutateEditedExercise } = useMutation(
    (newExercise) => editExercise(exerciseId, newExercise),
    {
      onSuccess: (dataNew) => {
        if (dataNew) {
          // update query data into cache
          queryClient.setQueriesData(exerciseKeys.lists(), (previous) =>
            previous.map((item) => (item.id === dataNew.id ? dataNew : item))
          )
          queryClient.setQueryData(exerciseKeys.detail(dataNew.id), dataNew)
        }
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
    mutateEditedExercise(exercise, {
      onSuccess: (dataNew) => {
        toast(`Exercise updated correctly`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: 'colored',
          pauseOnFocusLoss: true,
          type: toast.TYPE.SUCCESS,
          toastId: `exercise_${dataNew.id}`,
        })
        history.push('/home')
      },
      onError: (exc) => {
        toast(exc.message, {
          position: toast.POSITION.TOP_RIGHT,
          theme: 'colored',
          pauseOnFocusLoss: true,
          type: toast.TYPE.ERROR,
        })
        handleError(exc)
      },
    })
  }

  if (isError) {
    return <div>Something went wrong......${error}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isFetching) {
    return <div>Refreshing...</div>
  }

  return (
    <>
      <div className="card p-10 my-10 bg-gray-200 shadow-lg">
        <form onSubmit={handleExerciseUpdation}>
          <div className="form-control">
            <label className="label" htmlFor="title">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              defaultValue={exercise.title}
              required
              maxLength="15"
              placeholder="Title"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="detail2">
              <span className="label-text">Detail</span>
            </label>
            <textarea
              cols="30"
              rows="10"
              name="detail"
              onChange={handleChange}
              defaultValue={exercise.detail}
              required
              placeholder="Detail"
              className="textarea h-24 textarea-bordered"
            />
          </div>

          <div className="my-5 grid grid-flow-row">
            <button type="submit" className="btn btn-primary">
              Update Exercise
            </button>
          </div>
        </form>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </>
  )
}

export default EditExercise
