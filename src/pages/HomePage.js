import React, { useState, useEffect, useReducer } from 'react'
import ExercisesList from '../components/exercises/ExercisesList'
import BaseFilter from '../components/exercises/BaseFilter'
import useFetchExercises from '../hooks/useFetchExercises'

const exerciseReducer = (state, action) => {
  switch (action.type) {
    case 'RETRIEVE':
      return action.payload
    case 'DELETE':
      return state.filter((exercise) => exercise.id !== action.payload)
    case 'CHANGE_STATUS':
      return state.map((exercise) => {
        if (exercise.id === action.payload)
          return { ...exercise, complete: !exercise.complete }
        return exercise
      })
    default:
      throw new Error('no matching action type')
  }
}

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

  const handleDeleteExercise = (id) => {
    dispatchExercise({ type: 'DELETE', payload: id })
  }

  const handleToggleExerciseCompletion = (id) => {
    dispatchExercise({ type: 'CHANGE_STATUS', payload: id })
  }

  const filterExercises = exercises.filter((exercise) => {
    let result = false
    if (currentFilter === 'all') result = true
    if (currentFilter === 'completed' && exercise.complete) result = true
    if (currentFilter === 'pending' && !exercise.complete) result = true
    return result
  })

  return (
    <>
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
            <ExercisesList
              exercises={filterExercises}
              onDeleteExercise={handleDeleteExercise}
              onToggleExerciseCompletion={handleToggleExerciseCompletion}
            />
          </>
        )}
      </div>
    </>
  )
}

export default HomePage
