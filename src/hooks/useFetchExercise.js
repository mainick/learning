import { useQuery } from 'react-query'
import { getExerciseById } from '../services/ExerciseApi'

const useFetchExercise = (exerciseId) => {
  const { isLoading, isError, data, error, isFetching } = useQuery(
    ['exercise', exerciseId],
    async ({ signal }) => getExerciseById(signal, exerciseId),
    {
      useErrorBoundary: (errorResp) => errorResp.response?.status >= 500,
    }
  )

  return { isLoading, isError, data, error, isFetching }
}

export default useFetchExercise
