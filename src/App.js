import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Index from './pages/Index'

const App = () => (
  <Router>
    <Route path="/" component={Index} />
  </Router>
)

export default App;
