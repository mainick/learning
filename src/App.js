import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import HomePage from './pages/HomePage'
import CreateExercise from './pages/CreateExercise'
import NavBar from './components/layout/NavBar'
import EditExercise from './pages/EditExercise'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
)

export default App
