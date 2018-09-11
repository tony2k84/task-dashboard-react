import React from 'react'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './pages/home';

const App = () => (
  <Router>
    <div style={{ minHeight: 600, height: '100vh' }}>
      <Route path="/home" component={Home} />
    </div>
  </Router>
)
export default App;
