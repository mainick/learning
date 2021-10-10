import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/home" exact>
        <HomePage />
      </Route>
    </Switch>
  </div>
)

export default App
