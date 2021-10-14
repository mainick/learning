import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const EditExercise = () => {
  const [exercise, setExercise] = useState({})
  const history = useHistory()
  const params = useParams()
  const exerciseId = params.id

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3111/exercises/${exerciseId}`,
          {
            method: 'GET',
            headers: { Accept: 'application/json' },
          }
        )
        if (!resp.ok) throw new Error('Exercise not found')
        const json = await resp.json()
        setExercise(json)
      } catch (error) {
        console.error('error', error)
      }
    }
    fetchExercise()
  }, [exerciseId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setExercise({ ...exercise, [name]: value })
  }

  const handleExerciseUpdation = (e) => {
    e.preventDefault()
    console.log('edit exercise', exercise)
    fetch(`http://localhost:3111/exercises/${exercise.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise),
    })
      .then((resp) => {
        console.log(resp.status)
        history.push('/home')
      })
      .catch((error) => console.log(error))
  }

  return (
    <form onSubmit={handleExerciseUpdation}>
      <label htmlFor="title">
        Title
        <input
          type="text"
          name="title"
          onChange={handleChange}
          defaultValue={exercise.title}
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
          defaultValue={exercise.detail}
          required
        />
      </label>

      <button type="submit">Update Exercise</button>
    </form>
  )
}

export default EditExercise
