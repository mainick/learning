import PropTypes from 'prop-types'
import ExerciseItem from './ExerciseItem'

const ExercisesList = ({ exercises }) => {
  if (exercises && exercises.length === 0) return null
  return (
    <div className="grid grid-cols-1 gap-6">
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
