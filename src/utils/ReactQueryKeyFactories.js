const exerciseKeys = {
  all: ['exercises'],
  lists: () => [...exerciseKeys.all, 'list'],
  list: (stateFilter) => [...exerciseKeys.lists(), stateFilter],
  details: () => [...exerciseKeys.all, 'detail'],
  detail: (exerciseId) => [...exerciseKeys.details(), exerciseId],
}

export default exerciseKeys
