import { useQuery, useQueryClient } from 'react-query'
import { getExercises } from '../services/ExerciseApi'
import exerciseKeys from '../utils/ReactQueryKeyFactories'

const useFetchExercises = (stateFilter) => {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error, isFetching } = useQuery(
    exerciseKeys.list(stateFilter),
    async () => getExercises(stateFilter),
    {
      staleTime: 60 * 1000, // 1 minute in cache
      retry: false,
      useErrorBoundary: true,
      initialData: () => {
        // data valid and put into cache
        const stateQueryExercisesAll = queryClient.getQueryState(
          exerciseKeys.list('all')
        )
        if (stateQueryExercisesAll) {
          if (stateFilter !== 'all') {
            const isComplete = stateFilter === 'completed'
            const filteredExercises =
              stateQueryExercisesAll.data.filter(
                (item) => item.complete === isComplete
              ) ?? []
            return filteredExercises.length > 0 ? filteredExercises : undefined
          }
          return stateQueryExercisesAll.data ?? undefined
        }
        return undefined
      },
      initialDataUpdatedAt: Date.now(),
    }
  )

  return { isLoading, isError, data, error, isFetching }
}

export default useFetchExercises
