import { useQuery } from 'react-query'
import { getExercises } from '../services/ExerciseApi'

const useFetchExercises = () => {
  const { isLoading, isError, data, error, isFetching } = useQuery(
    'exercisesList',
    async ({ signal }) => getExercises(signal),
    {
      retry: 0,
      useErrorBoundary: true,
    }
  )

  return { isLoading, isError, data, error, isFetching }
}

export default useFetchExercises
