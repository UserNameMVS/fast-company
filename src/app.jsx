import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/common/protectedRoute'
import NavBar from './components/UI/navBar'
import AuthProvider from './hooks/useAuth'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import LogOut from './layouts/logOut'
import AppLoader from './components/UI/hoc/appLoader'

function App() {
  return (
    <div>
      <AppLoader>
        <AuthProvider>
          <NavBar />
          <Switch>
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </AuthProvider>
        <ToastContainer />
      </AppLoader>
    </div>
  )
}

export default App
