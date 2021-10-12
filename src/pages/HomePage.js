import { useState, useEffect } from 'react'
import ExercisesList from '../components/exercises/ExercisesList'

const HomePage = () => {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await fetch('http://localhost:3111/exercises')
        const json = await response.json()
        console.log('exercises', json)
        setExercises(json)
      } catch (error) {
        console.error(error)
      }
    }
    fetchExercises()
  }, [])

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

  return (
    <div>
      <ExercisesList
        exercises={exercises}
        onDeleteExercise={handleDeleteExercise}
        onToggleExerciseCompletion={handleToggleExerciseCompletion}
      />
    </div>
  )
}

export default HomePage
