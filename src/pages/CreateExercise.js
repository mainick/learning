import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'
import { useMutation, useQueryClient } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { createExercise } from '../services/ExerciseApi'
import exerciseKeys from '../utils/ReactQueryKeyFactories'
import 'react-toastify/dist/ReactToastify.min.css'

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
      onSuccess: (status, data) => {
        if (status) {
          toast(`Exercise ${data.id} created correctly`, {
            position: toast.POSITION.TOP_RIGHT,
            theme: 'colored',
            pauseOnFocusLoss: true,
            type: toast.TYPE.SUCCESS,
            toastId: `exercise_${data.id}`,
          })
          queryClient.invalidateQueries(exerciseKeys.lists())
        }
      },
      onError: (error) => {
        toast(error, {
          position: toast.POSITION.TOP_RIGHT,
          theme: 'colored',
          pauseOnFocusLoss: true,
          type: toast.TYPE.ERROR,
        })
        handleError(error)
      },
    }
  )

  const handleExerciseCreation = (e) => {
    e.preventDefault()

    const newExercise = {
      ...exercise,
      id: uuidv4(),
      complete: false,
    }
    mutationExerciseCreation.mutate(newExercise, {
      onSuccess: () => history.push('/home'),
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
        <div className="card p-10 my-10 bg-gray-200 shadow-lg">
          <form onSubmit={handleExerciseCreation}>
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
                className="textarea h-36 textarea-bordered resize-y"
              />
            </div>

            <div className="my-5 grid grid-flow-row">
              <button type="submit" className="btn btn-primary">
                Add Exercise
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default CreateExercise
