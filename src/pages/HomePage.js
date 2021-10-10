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

  return (
    <div>
      <ExercisesList
        exercises={exercises}
        onDeleteExercise={handleDeleteExercise}
      />
    </div>
  )
}

export default HomePage
