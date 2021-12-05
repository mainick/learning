export async function getExercises(signal) {
  const url = 'http://localhost:3111/exercises'
  try {
    const response = await fetch(url, { signal })
    if (!response.ok) throw new Error(`Network response was not ok`)
    return (await response.json()) || []
  } catch (e) {
    throw new Error(`Error retrieve exercises (${url}): ${e.message}`)
  }
}

export async function getExerciseById(signal, id) {
  const url = `http://localhost:3111/exercises/${id}`
  try {
    const response = await fetch(url, {
      signal,
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) throw new Error('Network response was not ok')
    return (await response.json()) || {}
  } catch (e) {
    throw new Error(`Error retrieve exercise (${url}): ${e.message}`)
  }
}

export async function createExercise(exercise) {
  const url = 'http://localhost:3111/exercises/'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise),
    })
    return response.ok
  } catch (e) {
    throw new Error(`Error create exercise (${url}: ${e.message}`)
  }
}

export async function editExercise(id, exercise) {
  const url = `http://localhost:3111/exercises/${id}`
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise),
    })
    return response.ok
  } catch (e) {
    throw new Error(`Error update exercise (${url}: ${e.message}`)
  }
}

export async function toggleExercise(exercise) {
  const url = `http://localhost:3111/exercises/${exercise.id}`
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...exercise, complete: !exercise.complete }),
    })
    return response.ok
  } catch (e) {
    throw new Error(`Error toggle exercise (${url}): ${e.message}`)
  }
}

export async function deleteExercise(exerciseId) {
  const url = `http://localhost:3111/exercises/${exerciseId}`
  try {
    const response = await fetch(url, { method: 'DELETE' })
    return response.ok
  } catch (e) {
    throw new Error(`Error delete exercise (${url}): ${e.message}`)
  }
}
