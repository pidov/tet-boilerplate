import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import createStore from '~store/createStore'

import Index from '~pages/Index'

const store = createStore()

const App = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={Index} />
    </Router>
  </Provider>
)

export default App;
