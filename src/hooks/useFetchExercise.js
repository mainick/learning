import { useQuery } from 'react-query'
import { getExerciseById } from '../services/ExerciseApi'
import exerciseKeys from '../utils/ReactQueryKeyFactories'

const useFetchExercise = (exerciseId) => {
  const { isLoading, isError, data, error, isFetching } = useQuery(
    exerciseKeys.detail(exerciseId),
    async () => getExerciseById(exerciseId),
    {
      retry: 3,
      useErrorBoundary: (errorResp) => errorResp.response?.status >= 500,
    }
  )

  return { isLoading, isError, data, error, isFetching }
}

export default useFetchExercise
