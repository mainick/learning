import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const CreateExercise = () => {
  const [exercise, setExercise] = useState({
    title: '',
    detail: '',
    complete: false,
  })
  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target
    setExercise({ ...exercise, [name]: value })
  }

  const handleExerciseCreation = (e) => {
    e.preventDefault()
    const newExercise = {
      title: exercise.title,
      detail: exercise.detail,
      complete: false,
      id: Math.floor(Math.random() * 10000),
    }
    console.log('new exercise', newExercise)
    fetch(`http://localhost:3111/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExercise),
    })
      .then((resp) => {
        console.log(resp.status)
        history.push('/home')
      })
      .catch((error) => console.log(error))
  }

  return (
    <form onSubmit={handleExerciseCreation}>
      <label htmlFor="title">
        Title
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={exercise.title}
          required
          maxLength="15"
        />
      </label>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="detail2">
        Detail
        <textarea
          cols="30"
          rows="10"
          name="detail"
          onChange={handleChange}
          required
        >
          {exercise.detail}
        </textarea>
      </label>

      <button type="submit">Add Exercise</button>
    </form>
  )
}

export default CreateExercise
