import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import ExercisesList from '../components/exercises/ExercisesList'
import BaseFilter from '../components/exercises/BaseFilter'
import {
  exerciseTypeFilterState,
  filteredExercisesList,
} from '../store/ExerciseStore'
import UseFetchExercises from '../hooks/useFetchExercises'

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
  } = UseFetchExercises()
  const filteredExercises = useRecoilValue(filteredExercisesList(dataExercises))

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
            <ExercisesList exercises={filteredExercises} />
          </>
        )}
      </div>
    </>
  )
}

export default HomePage
