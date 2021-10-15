import React, { useState, useEffect, useReducer } from 'react'
import ExercisesList from '../components/exercises/ExercisesList'
import BaseFilter from '../components/exercises/BaseFilter'
import useFetchExercises from '../hooks/useFetchExercises'
import exerciseReducer from '../reducers/ExerciseReducer'
import ExerciseContext from '../contexts/ExerciseContext'

const HomePage = () => {
  const [exercises, dispatchExercise] = useReducer(exerciseReducer, [])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [isLoading, isError, dataExercises] = useFetchExercises()

  useEffect(() => {
    if (dataExercises.length > 0)
      dispatchExercise({ type: 'RETRIEVE', payload: dataExercises })
  }, [dataExercises])

  const handleUpdateFilter = (filter) => {
    setCurrentFilter(filter)
  }

  const filterExercises = exercises.filter((exercise) => {
    let result = false
    if (currentFilter === 'all') result = true
    if (currentFilter === 'completed' && exercise.complete) result = true
    if (currentFilter === 'pending' && !exercise.complete) result = true
    return result
  })

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
            <ExercisesList exercises={filterExercises} />
          </>
        )}
      </div>
    </ExerciseContext.Provider>
  )
}

export default HomePage
