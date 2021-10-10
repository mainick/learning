import React from 'react'
import PropTypes from 'prop-types'

const ExerciseItem = ({ exercise, onDeleteExercise }) => {
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
  return (
    <div className="exercise">
      <div className="actions">
        <h4>{exercise.title}</h4>
        <div className="buttons">
          <button type="button" onClick={performExerciseDeletion}>
            Delete
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
}

export default ExerciseItem
