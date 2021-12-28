import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, useHistory } from 'react-router-dom'
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

  const {
    mutate: mutateDeletedExercise,
    isLoading: isLoadingDelete,
  } = useMutation((exerciseId) => deleteExercise(exerciseId), {
    onSuccess: (isDeleted, deletedId) => {
      if (isDeleted) {
        // invalid query data into cache
        queryClient.invalidateQueries(exerciseKeys.detail(deletedId), {
          exact: true,
        })
        return queryClient.invalidateQueries(exerciseKeys.lists())
      }
      return null
    },
  })

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
        mutateDeletedExercise(exercise.id, {
          onSuccess: () => {
            SwalDeleteExercise.fire(
              'Deleted!',
              'Exercise deleted correctly',
              'success'
            )
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
    })
  }

  const {
    mutate: mutateToggledExercise,
    isLoading: isLoadingToggleExercise,
  } = useMutation(() => toggleExercise(exercise), {
    onSuccess: (dataNew) => {
      if (dataNew) {
        toast(`Exercise ${dataNew.id}  toggled correctly`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: 'colored',
          pauseOnFocusLoss: true,
          type: toast.TYPE.SUCCESS,
          toastId: `exercise_${dataNew.id}`,
        })

        // update query data into cache detail
        queryClient.setQueryData(exerciseKeys.detail(dataNew.id), dataNew)

        // update query data into cache list all
        queryClient.setQueryData(exerciseKeys.list('all'), (previous) =>
          previous.map((item) => (item.id === dataNew.id ? dataNew : item))
        )

        // invalid query data into cache list filtered
        queryClient.invalidateQueries(exerciseKeys.list('completed'), {
          exact: true,
        })
        return queryClient.invalidateQueries(exerciseKeys.list('pending'), {
          exact: true,
        })
      }
      return null
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
          <NavLink
            to={`/exercises/${exercise.id}/edit`}
            className="btn btn-primary btn-sm"
            title="Edit Exercise"
          >
            Edit
          </NavLink>
          <button
            type="button"
            className={`btn btn-error btn-sm ${isLoadingDelete && 'loading'}`}
            onClick={performExerciseDeletion}
          >
            Delete
          </button>
          <button
            type="button"
            className={`btn btn-secondary btn-sm ${
              isLoadingToggleExercise && 'loading'
            }`}
            onClick={() => mutateToggledExercise(exercise)}
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
