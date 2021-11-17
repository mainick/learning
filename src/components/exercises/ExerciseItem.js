import React from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilStateLoadable } from 'recoil'
import { useErrorHandler } from 'react-error-boundary'
import { toggleExercise, deleteExercise } from '../../services/ExerciseApi'
import { exercisesListState } from '../../store/ExerciseStore'

const ExerciseItem = ({ exercise }) => {
  const handleError = useErrorHandler()
  const history = useHistory()
  const [dataExercises, setExercisesList] = useRecoilStateLoadable(
    exercisesListState
  )

  const performExerciseDeletion = () => {
    deleteExercise(exercise.id)
      .then(() => {
        const newExercisesList = dataExercises.contents.filter(
          (item) => item.id !== exercise.id
        )
        setExercisesList(newExercisesList)
        history.push('/home')
      })
      .catch((error) => handleError(error))
  }

  const performExerciseToggle = () => {
    toggleExercise(exercise)
      .then(() => {
        const newExercisesList = dataExercises.contents.map((item) => {
          if (item.id === exercise.id)
            return { ...item, complete: !item.complete }
          return item
        })
        setExercisesList(newExercisesList)
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
