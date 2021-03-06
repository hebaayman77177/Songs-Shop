import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import ChooseSongs from './pages/ChooseSongs'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={ChooseSongs} exact />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
