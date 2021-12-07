import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => (
  <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
    <div className="px-2 mx-2 navbar-start">
      <span className="text-lg font-bold">learning</span>
    </div>
    <div className="hidden px-2 mx-2 navbar-end lg:flex">
      <div className="flex items-stretch">
        <NavLink
          to="/home"
          activeClassName="active"
          className="btn btn-ghost btn-sm rounded-btn"
        >
          Home
        </NavLink>
        <NavLink
          to="/create-exercise"
          activeClassName="active"
          className="btn btn-ghost btn-sm rounded-btn"
        >
          Create Exercise
        </NavLink>
      </div>
    </div>
  </div>
)

export default NavBar
