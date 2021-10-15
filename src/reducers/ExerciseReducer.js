const exerciseReducer = (state, action) => {
  switch (action.type) {
    case 'RETRIEVE':
      return action.payload
    case 'DELETE':
      return state.filter((exercise) => exercise.id !== action.payload)
    case 'CHANGE_STATUS':
      return state.map((exercise) => {
        if (exercise.id === action.payload)
          return { ...exercise, complete: !exercise.complete }
        return exercise
      })
    default:
      throw new Error('no matching action type')
  }
}

export default exerciseReducer
