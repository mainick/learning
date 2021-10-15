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

  let jsxExercisesList = <div>loading data ...</div>
  if (!isLoading) {
    jsxExercisesList = (
      <ExercisesList
        exercises={exercises}
        onDeleteExercise={handleDeleteExercise}
        onToggleExerciseCompletion={handleToggleExerciseCompletion}
      />
    )

    if (currentFilter === 'completed')
      jsxExercisesList = (
        <ExercisesList
          exercises={exercises.filter((exercise) => exercise.complete)}
          onDeleteExercise={handleDeleteExercise}
          onToggleExerciseCompletion={handleToggleExerciseCompletion}
        />
      )
    else if (currentFilter === 'pending')
      jsxExercisesList = (
        <ExercisesList
          exercises={exercises.filter((exercise) => !exercise.complete)}
          onDeleteExercise={handleDeleteExercise}
          onToggleExerciseCompletion={handleToggleExerciseCompletion}
        />
      )
  }

  return (
    <>
      {isError && <div>Something went wrong...</div>}
      <div>
        <BaseFilter
          onUpdateFilterExercises={handleUpdateFilter}
          current={currentFilter}
        />
        {jsxExercisesList}
      </div>
    </>
  )
}

export default HomePage
