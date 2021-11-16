export default async function getExercises() {
  const url = 'http://localhost:3111/exercises'
  try {
    const response = await fetch(url)
    return (await response.json()) || []
  } catch (e) {
    throw new Error(`Error retrieve exercises (${url}): ${e.message}`)
  }
}
