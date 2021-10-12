import React from 'react'
import PropTypes from 'prop-types'

const ExerciseItem = ({
  exercise,
  onDeleteExercise,
  onToggleExerciseCompletion,
}) => {
  const performExerciseDeletion = () => {
    fetch(`http://localhost:3111/exercises/${exercise.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        onDeleteExercise(exercise.id)
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
        onToggleExerciseCompletion(exercise.id)
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
  onDeleteExercise: PropTypes.func.isRequired,
  onToggleExerciseCompletion: PropTypes.func.isRequired,
}

export default ExerciseItem
