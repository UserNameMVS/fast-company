import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Users from './layouts/users'
import Login from './layouts/login'
import Main from './layouts/main'
import NavBar from './components/UI/navBar'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'
import QualityProvider from './hooks/useQuality'

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <QualityProvider>
          <ProfessionProvider>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
          </ProfessionProvider>
        </QualityProvider>
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </div>
  )
}

export default App
