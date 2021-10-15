import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ExerciseContext from '../../contexts/ExerciseContext'

const ExerciseItem = ({ exercise }) => {
  const dispatchExercise = useContext(ExerciseContext)

  const performExerciseDeletion = () => {
    fetch(`http://localhost:3111/exercises/${exercise.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatchExercise({ type: 'DELETE', payload: exercise.id })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const performExerciseToggle = () => {
    fetch(`http://localhost:3111/exercises/${exercise.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ complete: !exercise.complete }),
    })
      .then(() => {
        dispatchExercise({ type: 'CHANGE_STATUS', payload: exercise.id })
      })
      .catch((error) => {
        console.log(error)
      })
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
