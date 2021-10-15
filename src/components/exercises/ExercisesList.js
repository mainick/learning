import PropTypes from 'prop-types'
import ExerciseItem from './ExerciseItem'

const ExercisesList = ({ exercises }) => {
  if (exercises.length === 0) return null
  return (
    <div className="exercises-list">
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}

ExercisesList.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ExercisesList
