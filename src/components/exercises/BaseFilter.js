import React from 'react'
import PropTypes from 'prop-types'

const BaseFilter = ({ onUpdateFilterExercises, current }) => (
  <div className="btn-group flex justify-center my-5">
    <div
      className={`btn btn-outline btn-sm ${
        current === 'all' ? 'btn-active' : ''
      }`}
      onClick={() => onUpdateFilterExercises('all')}
      aria-hidden="true"
    >
      View All
    </div>
    <div
      className={`btn btn-outline btn-sm ${
        current === 'completed' ? 'btn-active' : ''
      }`}
      onClick={() => onUpdateFilterExercises('completed')}
      aria-hidden="true"
    >
      Completed
    </div>
    <div
      className={`btn btn-outline btn-sm ${
        current === 'pending' ? 'btn-active' : ''
      }`}
      onClick={() => onUpdateFilterExercises('pending')}
      aria-hidden="true"
    >
      Pending
    </div>
  </div>
)

BaseFilter.propTypes = {
  onUpdateFilterExercises: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
}

export default BaseFilter
