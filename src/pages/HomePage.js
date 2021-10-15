import React, { useState, useEffect } from 'react'
import ExercisesList from '../components/exercises/ExercisesList'
import BaseFilter from '../components/exercises/BaseFilter'
import useFetchExercises from '../hooks/useFetchExercises'

const HomePage = () => {
  const [exercises, setExercises] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [isLoading, isError, dataExercises] = useFetchExercises()

  useEffect(() => {
    if (dataExercises.length > 0) setExercises(dataExercises)
  }, [dataExercises])

  const handleUpdateFilter = (filter) => {
    setCurrentFilter(filter)
  }

  const handleDeleteExercise = (id) => {
    const patchedExercises = exercises.filter((exercise) => exercise.id !== id)
    setExercises(patchedExercises)
  }

  const handleToggleExerciseCompletion = (id) => {
    const patchedExercises = exercises.map((exercise) => {
      // eslint-disable-next-line no-param-reassign
      if (exercise.id === id) exercise.complete = !exercise.complete
      return exercise
    })
    setExercises(patchedExercises)
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
