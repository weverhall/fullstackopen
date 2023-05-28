import React from 'react';
import ReactDOM from 'react-dom'
import Stats from './components/Stats'
import Button from './components/Button'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const reset = () => {
    store.dispatch({
      type: 'RESET'
    })
  }

    return (
      <div>
        <Button
          handleClick={good}
          text="good" />
        <Button
          handleClick={ok}
          text="ok" />
        <Button
          handleClick={bad}
          text="bad" />
        <Button
          handleClick={reset}
          text="reset stats" />    

        <Stats
          goodReviews={store.getState().good}
          neutralReviews={store.getState().ok} 
          badReviews={store.getState().bad} />
      </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
