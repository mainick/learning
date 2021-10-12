import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateExercise from './pages/CreateExercise'
import NavBar from './components/layout/NavBar'
import EditExercise from './pages/EditExercise'

const App = () => (
  <div className="App">
    <NavBar />
    <Switch>
      <Route path="/home" exact>
        <HomePage />
      </Route>
      <Route path="/create-exercise" exact>
        <CreateExercise />
      </Route>
      <Route path="/exercises/:id/edit" exact>
        <EditExercise />
      </Route>
    </Switch>
  </div>
)

export default App
