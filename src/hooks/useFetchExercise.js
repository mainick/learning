import { useQuery, useQueryClient } from 'react-query'
import { getExerciseById } from '../services/ExerciseApi'
import exerciseKeys from '../utils/ReactQueryKeyFactories'

const useFetchExercise = (exerciseId) => {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error, isFetching } = useQuery(
    exerciseKeys.detail(exerciseId),
    async () => getExerciseById(exerciseId),
    {
      staleTime: 60 * 1000, // 1 minute in cache
      retry: 3,
      useErrorBoundary: (errorResp) => errorResp.response?.status >= 500,
      placeholderData: () => {
        // data not real and not valid, used before will get the real data
        const stateQueryExercisesAll = queryClient.getQueryState(
          exerciseKeys.list('all')
        )
        if (
          stateQueryExercisesAll &&
          Date.now() - stateQueryExercisesAll.dataUpdatedAt <= 30 * 1000
        ) {
          // cached for half a minute
          const found = stateQueryExercisesAll.data.find(
            (item) => item.id.toString() === exerciseId
          )
          return found ?? undefined
        }
        return undefined
      },
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(exerciseKeys.list('all'), { exact: true })
          ?.dataUpdatedAt,
    }
  )

  return { isLoading, isError, data, error, isFetching }
}

export default useFetchExercise
