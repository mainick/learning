import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => (
  <nav className="main-nav">
    <NavLink to="/home" activeClassName="active">
      Home
    </NavLink>
    <NavLink to="/create-exercise" activeClassName="active">
      Create Exercise
    </NavLink>
  </nav>
)

export default NavBar
