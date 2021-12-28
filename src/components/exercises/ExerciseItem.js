import React from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toggleExercise, deleteExercise } from '../../services/ExerciseApi'
import exerciseKeys from '../../utils/ReactQueryKeyFactories'

const SwalDeleteExercise = withReactContent(Swal)

const ExerciseItem = ({ exercise }) => {
  const handleError = useErrorHandler()
  const history = useHistory()
  const queryClient = useQueryClient()

  const mutationExerciseDeletion = useMutation(
    (exerciseId) => deleteExercise(exerciseId),
    {
      onSuccess: (status, deletedId) => {
        if (status) {
          /*
          toast(`Exercise deleted correctly`, {
            position: toast.POSITION.TOP_RIGHT,
            theme: 'colored',
            pauseOnFocusLoss: true,
            type: toast.TYPE.SUCCESS,
            toastId: `exercise_${deletedId}`,
          })
          */
          SwalDeleteExercise.fire(
            'Deleted!',
            'Exercise deleted correctly',
            'success'
          )
          queryClient.invalidateQueries(exerciseKeys.lists())
          queryClient.invalidateQueries(exerciseKeys.detail(deletedId), {
            exact: true,
          })
        }
      },
      onError: (exc) => {
        toast(exc, {
          position: toast.POSITION.TOP_RIGHT,
          theme: 'colored',
          pauseOnFocusLoss: true,
          type: toast.TYPE.ERROR,
        })
        handleError(exc)
      },
    }
  )

  const performExerciseDeletion = () => {
    SwalDeleteExercise.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-error',
        cancelButton: 'btn btn-ghost',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        mutationExerciseDeletion.mutate(exercise.id, {
          onSuccess: () => {
            history.push('/home')
          },
        })
      }
    })
  }

  const mutationExerciseToggle = useMutation(() => toggleExercise(exercise), {
    onSuccess: (status, data) => {
      if (status) {
        toast(`Exercise ${data.id}  toggled correctly`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: 'colored',
          pauseOnFocusLoss: true,
          type: toast.TYPE.SUCCESS,
          toastId: `exercise_${data.id}`,
        })
        queryClient.invalidateQueries(exerciseKeys.lists())
        queryClient.invalidateQueries(exerciseKeys.detail(data.id), {
          exact: true,
        })
      }
    },
    onError: (exc) => {
      handleError(exc)
    },
  })

  return (
    <div className="card lg:card-side bordered bg-gray-200 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">{exercise.title}</h2>
        <p className="break-all">{exercise.detail}</p>
        <div className="card-actions">
          <Link
            to={`/exercises/${exercise.id}/edit`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>
          <button
            type="button"
            className={`btn btn-error btn-sm ${
              mutationExerciseDeletion.isLoading && 'loading'
            }`}
            onClick={performExerciseDeletion}
          >
            Delete
          </button>
          <button
            type="button"
            className={`btn btn-secondary btn-sm ${
              mutationExerciseToggle.isLoading && 'loading'
            }`}
            onClick={() => mutationExerciseToggle.mutate(exercise)}
          >
            Toggle
          </button>
        </div>
      </div>
    </div>
  )
}

ExerciseItem.propTypes = {
  exercise: PropTypes.exact({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ExerciseItem
