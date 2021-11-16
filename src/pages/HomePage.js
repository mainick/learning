import React, { useEffect, useReducer, useRef } from 'react'
import { atom, selectorFamily, useRecoilState, useRecoilValue } from 'recoil'
import ExercisesList from '../components/exercises/ExercisesList'
import BaseFilter from '../components/exercises/BaseFilter'
import useFetchExercises from '../hooks/useFetchExercises'
import exerciseReducer from '../reducers/ExerciseReducer'
import ExerciseContext from '../contexts/ExerciseContext'

const exerciseTypeFilterAtom = atom({
  key: 'currentFilter',
  default: 'all',
})

const filteredExercisesList = selectorFamily({
  key: 'filteredExercisesListState',
  get: (exerciseList) => ({ get }) => {
    const currentFilter = get(exerciseTypeFilterAtom)
    switch (currentFilter) {
      case 'completed':
        return exerciseList.filter((exercise) => exercise.complete)
      case 'pending':
        return exerciseList.filter((exercise) => !exercise.complete)
      default:
        return exerciseList
    }
  },
})

const HomePage = () => {
  const isComponentMounted = useRef(true)
  const [currentFilter, setCurrentFilter] = useRecoilState(
    exerciseTypeFilterAtom
  )
  const [exercises, dispatchExercise] = useReducer(exerciseReducer, [])
  const [isLoading, isError, dataExercises] = useFetchExercises(
    isComponentMounted
  )
  const filteredExercises = useRecoilValue(filteredExercisesList(exercises))

  useEffect(() => {
    if (dataExercises.length > 0)
      dispatchExercise({ type: 'RETRIEVE', payload: dataExercises })
  }, [dataExercises])

  const handleUpdateFilter = (filter) => {
    setCurrentFilter(filter)
  }

  return (
    <ExerciseContext.Provider value={dispatchExercise}>
      {isError && <div>Something went wrong...</div>}
      <div>
        {isLoading ? (
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
    </ExerciseContext.Provider>
  )
}

export default HomePage
