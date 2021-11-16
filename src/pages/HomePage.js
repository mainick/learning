import React from 'react'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import ExercisesList from '../components/exercises/ExercisesList'
import BaseFilter from '../components/exercises/BaseFilter'
import {
  exerciseTypeFilterState,
  filteredExercisesList,
  exercisesListState,
} from '../store/ExerciseStore'

const HomePage = () => {
  const [currentFilter, setCurrentFilter] = useRecoilState(
    exerciseTypeFilterState
  )
  const dataExercises = useRecoilValueLoadable(exercisesListState)
  const filteredExercises = useRecoilValue(
    filteredExercisesList(dataExercises.contents)
  )

  const handleUpdateFilter = (filter) => {
    setCurrentFilter(filter)
  }

  return (
    <>
      {dataExercises.state === 'hasError' && <div>Something went wrong...</div>}
      <div>
        {dataExercises.state === 'loading' ? (
          <div>loading data ...</div>
        ) : (
          <>
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
