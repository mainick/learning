import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'
import HomePage from './pages/HomePage'
import CreateExercise from './pages/CreateExercise'
import NavBar from './components/layout/NavBar'
import EditExercise from './pages/EditExercise'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // eslint-disable-next-line no-alert
    onError: (error, query) => {
      // 🎉 only show error if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast(`Something went wrong: ${error.message}`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: 'colored',
          pauseOnFocusLoss: true,
          type: toast.TYPE.WARNING,
          toastId: `err_query_cache`,
        })
      }
    },
  }),
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
    },
  },
})

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <div className="w-full text-white bg-yellow-400">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="flex">
            <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
              <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
            </svg>
            <p className="mx-3">There was an error!</p>
          </div>

          <button
            type="button"
            className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none"
            onClick={resetErrorBoundary}
          >
            Try again
          </button>
        </div>
      </div>
      <div className="flex-none">
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    </>
  )
}

ErrorFallback.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
}

const SkeletonListExercises = () => (
  <div className="w-60 h-24 border-2 rounded-md mx-auto">
    <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
      <div className="w-12 bg-gray-300 h-12 rounded-full " />
      <div className="flex flex-col space-y-3">
        <div className="w-36 bg-gray-300 h-6 rounded-md " />
        <div className="w-24 bg-gray-300 h-6 rounded-md " />
      </div>
    </div>
  </div>
)

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container mx-auto">
      <NavBar />
      <Switch>
        <Route path="/home" exact>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
                <Suspense fallback={<SkeletonListExercises />}>
                  <HomePage />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Route>
        <Route path="/create-exercise" exact>
          <CreateExercise />
        </Route>
        <Route path="/exercises/:id/edit" exact>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
                <Suspense fallback={<SkeletonListExercises />}>
                  <EditExercise />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Route>
      </Switch>
    </div>
    <ToastContainer closeOnClick={false} closeButton />
  </QueryClientProvider>
)

export default App
