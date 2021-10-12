import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateExercise from './pages/CreateExercise'

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/home" exact>
        <HomePage />
      </Route>
      <Route path="/create-exercise" exact>
        <CreateExercise />
      </Route>
    </Switch>
  </div>
)

export default App
