import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import createStore from '~store/createStore'

import Index from '~pages/Index'
import NotFound from '~pages/NotFound'

const store = createStore()

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
)

export default App
