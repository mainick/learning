import { ErrorBoundary } from 'react-error-boundary'
import PropTypes from 'prop-types'
import ExerciseItem from './ExerciseItem'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>There was an error:</p>
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  )
}

ErrorFallback.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
}

const ExercisesList = ({ exercises }) => {
  const handleReset = () => {
    console.log('RESET ERROR')
  }
  if (exercises && exercises.length === 0) return null
  return (
    <div className="exercises-list">
      {exercises.map((exercise) => (
        <ErrorBoundary
          key={exercise.id}
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
        >
          <ExerciseItem key={exercise.id} exercise={exercise} />
        </ErrorBoundary>
      ))}
    </div>
  )
}

ExercisesList.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ExercisesList
