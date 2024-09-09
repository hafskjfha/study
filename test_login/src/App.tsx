import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Protected from './components/Protected';
import { AuthProvider, useAuth } from './AuthContext';

const PrivateRoute: React.FC<{ component: React.FC, path: string }> = ({ component: Component, path }) => {
  const { auth } = useAuth();
  return (
    <Route
      path={path}
      render={(props) => auth ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/protected" component={Protected} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
