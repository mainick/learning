import React from 'react'
import PropTypes from 'prop-types'

const BaseFilter = ({ onUpdateFilterExercises, current }) => (
  <nav className="filter-nav">
    <button
      type="button"
      onClick={() => onUpdateFilterExercises('all')}
      className={current === 'all' ? 'active' : ''}
    >
      View All
    </button>
    <button
      type="button"
      onClick={() => onUpdateFilterExercises('completed')}
      className={current === 'completed' ? 'active' : ''}
    >
      Completed
    </button>
    <button
      type="button"
      onClick={() => onUpdateFilterExercises('pending')}
      className={current === 'pending' ? 'active' : ''}
    >
      Pending
    </button>
  </nav>
)

BaseFilter.propTypes = {
  onUpdateFilterExercises: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
}

export default BaseFilter
