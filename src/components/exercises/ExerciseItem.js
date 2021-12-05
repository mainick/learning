import React from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'
import { useQueryClient } from 'react-query'
import { toggleExercise, deleteExercise } from '../../services/ExerciseApi'

const ExerciseItem = ({ exercise }) => {
  const handleError = useErrorHandler()
  const history = useHistory()
  const queryClient = useQueryClient()

  const performExerciseDeletion = () => {
    deleteExercise(exercise.id)
      .then(() => {
        queryClient.invalidateQueries('exercisesList', { exact: true })
        history.push('/home')
      })
      .catch((error) => handleError(error))
  }

  const performExerciseToggle = () => {
    toggleExercise(exercise)
      .then(() => {
        queryClient.invalidateQueries('exercisesList', { exact: true })
      })
      .catch((error) => handleError(error))
  }

  const classesExercise = ['exercise']
  if (exercise.complete) classesExercise.push('complete')
  return (
    <div className={classesExercise.join(' ')}>
      <div className="actions">
        <h4>{exercise.title}</h4>
        <div className="buttons">
          <Link to={`/exercises/${exercise.id}/edit`}>Edit</Link>
          <button type="button" onClick={performExerciseDeletion}>
            Delete
          </button>
          <button type="button" onClick={performExerciseToggle}>
            Toggle
          </button>
        </div>
      </div>
      <div className="details">
        <p>{exercise.detail}</p>
      </div>
    </div>
  )
}

ExerciseItem.propTypes = {
  exercise: PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ExerciseItem
