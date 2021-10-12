import PropTypes from 'prop-types'
import ExerciseItem from './ExerciseItem'

const ExercisesList = ({
  exercises,
  onDeleteExercise,
  onToggleExerciseCompletion,
}) => {
  if (exercises.length === 0) return null
  return (
    <div className="exercises-list">
      {exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          onDeleteExercise={onDeleteExercise}
          onToggleExerciseCompletion={onToggleExerciseCompletion}
        />
      ))}
    </div>
  )
}

ExercisesList.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteExercise: PropTypes.func.isRequired,
  onToggleExerciseCompletion: PropTypes.func.isRequired,
}

export default ExercisesList
