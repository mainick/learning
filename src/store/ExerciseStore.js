import { atom, selector, selectorFamily } from 'recoil'
import getExercises from '../services/ExerciseApi'

export const exerciseTypeFilterState = atom({
  key: 'currentFilter',
  default: 'all',
})

export const filteredExercisesList = selectorFamily({
  key: 'filteredExercisesListState',
  get: (exerciseList) => ({ get }) => {
    if (!!exerciseList && typeof exerciseList.then === 'function') return []
    const currentFilter = get(exerciseTypeFilterState)
    switch (currentFilter) {
      case 'completed':
        return exerciseList.filter((exercise) => exercise.complete)
      case 'pending':
        return exerciseList.filter((exercise) => !exercise.complete)
      default:
        return exerciseList
    }
  },
})

const allExercisesState = selector({
  key: 'allExercisesState',
  get: async () => {
    try {
      const response = await getExercises()
      return response || []
    } catch (e) {
      console.error(
        `Error allExercisesState -> getExercises() ERROR: ${e.message}`
      )
      return []
    }
  },
})

export const exercisesListState = atom({
  key: 'exercisesListState',
  default: allExercisesState,
})
