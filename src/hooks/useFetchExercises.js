import { useQuery } from 'react-query'
import { getExercises } from '../services/ExerciseApi'
import exerciseKeys from '../utils/ReactQueryKeyFactories'

const useFetchExercises = (stateFilter) => {
  const { isLoading, isError, data, error, isFetching } = useQuery(
    exerciseKeys.list(stateFilter),
    async () => getExercises(stateFilter),
    {
      retry: false,
      useErrorBoundary: true,
    }
  )

  return { isLoading, isError, data, error, isFetching }
}

export default useFetchExercises
