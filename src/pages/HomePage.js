import React from 'react'
import { useRecoilState } from 'recoil'
import { ReactQueryDevtools } from 'react-query/devtools'
import ExercisesList from '../components/exercises/ExercisesList'
import BaseFilter from '../components/exercises/BaseFilter'
import { exerciseTypeFilterState } from '../store/ExerciseStore'
import useFetchExercises from '../hooks/useFetchExercises'

const HomePage = () => {
  const [currentFilter, setCurrentFilter] = useRecoilState(
    exerciseTypeFilterState
  )
  const {
    isLoading,
    isError,
    data: dataExercises,
    error,
    isFetching,
  } = useFetchExercises(currentFilter)

  const handleUpdateFilter = (filter) => {
    setCurrentFilter(filter)
  }

  return (
    <>
      {isError && <div>Something went wrong...${error}</div>}
      <div>
        {isLoading ? (
          <div>loading data ...</div>
        ) : (
          <>
            {isFetching && <div>Refreshing...</div>}
            <BaseFilter
              onUpdateFilterExercises={handleUpdateFilter}
              current={currentFilter}
            />
            <ExercisesList exercises={dataExercises} />
          </>
        )}
      </div>
      <ReactQueryDevtools initialIsOpen />
    </>
  )
}

export default HomePage
