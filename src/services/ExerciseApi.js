import axiosClient from './AxiosService'

const responseOK = (response) =>
  response.status >= 200 && response.status <= 299

export async function getExercises() {
  const url = '/exercises'
  try {
    const response = await axiosClient.get(url)
    if (!responseOK(response)) throw new Error(`Network response was not ok`)
    return response.data || []
  } catch (e) {
    throw new Error(
      `Error retrieve exercises (${axiosClient.defaults.baseURL + url}): ${
        e.message
      }`
    )
  }
}

export async function getExerciseById(signal, id) {
  const url = `/exercises/${id}`
  try {
    const response = await axiosClient.get(url)
    if (!responseOK(response)) throw new Error(`Network response was not ok`)
    return response.data || {}
  } catch (e) {
    throw new Error(
      `Error retrieve exercise (${axiosClient.defaults.baseURL + url}): ${
        e.message
      }`
    )
  }
}

export async function createExercise(exercise) {
  const url = '/exercises/'
  try {
    const response = await axiosClient.post(url, JSON.stringify(exercise))
    return responseOK(response)
  } catch (e) {
    throw new Error(
      `Error create exercise (${axiosClient.defaults.baseURL + url}: ${
        e.message
      }`
    )
  }
}

export async function editExercise(id, exercise) {
  const url = `/exercises/${id}`
  try {
    const response = await axiosClient.patch(url, JSON.stringify(exercise))
    return responseOK(response)
  } catch (e) {
    throw new Error(
      `Error update exercise (${axiosClient.defaults.baseURL + url}: ${
        e.message
      }`
    )
  }
}

export async function toggleExercise(exercise) {
  const url = `/exercises/${exercise.id}`
  try {
    const response = await axiosClient.put(
      url,
      JSON.stringify({ ...exercise, complete: !exercise.complete })
    )
    return responseOK(response)
  } catch (e) {
    throw new Error(
      `Error toggle exercise (${axiosClient.defaults.baseURL + url}): ${
        e.message
      }`
    )
  }
}

export async function deleteExercise(exerciseId) {
  const url = `/exercises/${exerciseId}`
  try {
    const response = await axiosClient.delete(url)
    return responseOK(response)
  } catch (e) {
    throw new Error(
      `Error delete exercise (${axiosClient.defaults.baseURL + url}): ${
        e.message
      }`
    )
  }
}
