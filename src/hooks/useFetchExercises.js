import { useQuery } from 'react-query'
import { getExercises } from '../services/ExerciseApi'

const UseFetchExercises = () => {
  const { isLoading, isError, data, error, isFetching } = useQuery(
    'exercisesList',
    async ({ signal }) => getExercises(signal),
    {
      retry: 3,
    }
  )

  return { isLoading, isError, data, error, isFetching }
}

export default UseFetchExercises
